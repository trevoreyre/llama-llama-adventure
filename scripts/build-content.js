require('dotenv').config()
const cloudinary = require('cloudinary').v2
const camelCase = require('just-camel-case')
const fs = require('fs/promises')
const slugify = require('slugify')
const YAML = require('yaml')
const {
  defaultRenderers,
  getPages,
  renderNotionBlocks,
  renderNotionPageProperties,
} = require('@trevoreyre/notion')

const log = (...params) => {
  // console.log(...params)
}

const writeBuildFiles = process.env.WRITE_BUILD_FILES

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

function src(cloudinaryUrl, size) {
  const url = cloudinaryUrl.replace(/\/v\d+\//i, `/q_auto,f_auto,w_${size}/`)
  console.log('src', { size, cloudinaryUrl, url })
  return url
}

// Upload image to Cloudinary
async function uploadImage({ id, url }) {
  log('uploadImage', id, url)
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      url,
      {
        public_id: id,
        folder: process.env.CLOUDINARY_FOLDER_NAME,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          return reject(error)
        }
        return resolve(result)
      },
    )
  })
}

const renderers = {
  ...defaultRenderers,
  async image(block, content, children, id) {
    const { type } = block
    const { url } = block[type]

    let renderedImage = `<img src="${url}" alt="${content}" />\n`

    if (type === 'external') {
      return renderedImage
    }

    try {
      const image = await cloudinary.uploader.upload(url, {
        public_id: id,
        folder: process.env.CLOUDINARY_FOLDER_NAME,
        overwrite: false,
      })
      const imageUrl = image.secure_url

      return `<img alt="${content}" width="${image.width}" height="${
        image.height
      }" sizes="(min-width: 600px) 600px, 100vw" srcset="${src(
        imageUrl,
        200,
      )} 200w, ${src(imageUrl, 400)} 400w, ${src(imageUrl, 600)} 600w, ${src(
        imageUrl,
        800,
      )} 800w, ${src(imageUrl, 1200)} 1200w," />\n`
    } catch (error) {
      console.error(`Unable to upload image - ${error.message}`)
      return renderedImage
    }
  },
}

const propertyRenderers = {
  ...renderers,
  bold: content => `<strong>${content}</strong>`,
  italic: content => `<em>${content}</em>`,
  strikethrough: content => `<s>${content}</s>`,
  underline: content => `<u>${content}</u>`,
  inlineCode: content => `<code>${content}</code>`,
  select: block => {
    log('select', block)
    return block?.name
  },
  multiSelect: blocks => {
    log('multiSelect', blocks)
    return blocks.map(block => block.name).filter(Boolean)
  },
  createdTime: block => {
    log('createdTime', block)
    return block
  },
  lastEditedTime: block => {
    log('lastEditedTime', block)
    return block
  },
  title: blocks => {
    log('title', blocks)
    return blocks.map(block => block.plain_text).join('')
  },
  async icon(block) {
    return block
  },
  emoji: block => {
    return block
  },
  async cover(block, id) {
    return this.file(block, id)
  },
  async file(block, id) {
    log('file', block, id)
    if (!block) {
      return null
    }
    const { url } = block

    let renderedImage = `<img src="${url}" alt="Cover image" />\n`

    try {
      const image = await cloudinary.uploader.upload(url, {
        public_id: id,
        folder: process.env.CLOUDINARY_FOLDER_NAME,
        overwrite: false,
      })
      return `<img src="${image.secure_url}" width="${image.width}" height="${image.height}" />\n`
    } catch (error) {
      console.error(`Unable to upload image - ${error.message}`)
      return renderedImage
    }
  },
}

async function notion() {
  await fs.mkdir('posts', { recursive: true })
  let pages = []

  try {
    throw new Error('Skipping cache')
    // pages = require('./content.json')
  } catch {
    log('No cached content. Fetching from Notion...')
    pages = await getPages({
      authToken: process.env.NOTION_AUTH_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
    })
  }

  if (process.env.WRITE_BUILD_FILES) {
    await fs.writeFile('./scripts/content.json', JSON.stringify(pages, null, 2))
  }

  for (const page of pages) {
    const pageProperties = await renderNotionPageProperties(
      page,
      propertyRenderers,
    )
    log({ pageProperties })
    const blocks = await renderNotionBlocks(page.children, renderers)
    log({ blocks })

    let { name, type, tags } = pageProperties
    const slug = slugify(name).toLowerCase()
    pageProperties.title = name
    pageProperties.permalink = `/${slug}/`
    pageProperties.layout = 'post'
    pageProperties.type = type ?? 'note'
    pageProperties.tags = (tags || []).concat(pageProperties.type)

    const markdown = '---\n'
      .concat(YAML.stringify(pageProperties))
      .concat('\n---\n\n')
      .concat(blocks.join('\n'))

    await fs.writeFile(`./posts/${slug}.md`, markdown)
  }
}

;(async () => {
  await notion()
})()

const { Client: NotionClient } = require('@notionhq/client')
const camelCase = require('just-camel-case')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const kebabCase = require('just-kebab-case')
const merge = require('just-merge')
const typeOf = require('just-typeof')
const util = require('util')

const notionClient = new NotionClient({ auth: process.env.NOTION_AUTH_TOKEN })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

function camelCaseDeep(value) {
  if (typeOf(value) === 'array') {
    return value.map(item => camelCaseDeep(item))
  } else if (typeOf(value) === 'object') {
    return Object.entries(value).reduce((result, [key, _value]) => {
      result[camelCase(key)] =
        key === 'type' && typeOf(_value) === 'string'
          ? camelCase(_value)
          : camelCaseDeep(_value)
      return result
    }, {})
  }
  return value
}

async function uploadImage({ id, url }) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      url,
      {
        public_id: id,
        folder: 'llama-llama-adventure',
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

module.exports = function(api) {
  api.loadSource(async ({ addCollection }) => {
    const postCollection = addCollection('Post')

    const blocksResponse = await notionClient.blocks.children.list({
      block_id: process.env.NOTION_PAGE_ID,
      page_size: 100,
    })
    const postBlocks = blocksResponse.results.filter(
      block => block.type === 'child_page' && block.child_page?.title,
    )

    const posts = await Promise.all(
      postBlocks.map(async postBlock => {
        const { results } = await notionClient.blocks.children.list({
          block_id: postBlock.id,
        })

        const post = camelCaseDeep(
          merge({}, postBlock, {
            id: postBlock.id,
            title: postBlock.child_page.title,
            content: results,
          }),
        )

        // Loop through paragraph blocks to construct excerpt
        let textContent = ''
        const paragraphBlocks = post.content.filter(
          block => block.type === 'paragraph',
        )
        for (const paragraphBlock of paragraphBlocks) {
          textContent += ' '
          for (const textBlock of paragraphBlock.paragraph.text) {
            textContent += textBlock.plainText
          }
        }
        const excerpt = textContent
          .split(' ')
          .slice(0, 50)
          .join(' ')
          .trim()

        // Loop through image blocks and upload to cloudinary
        const imageBlocks = post.content.filter(
          block => block.image?.type === 'file',
        )
        for (const imageBlock of imageBlocks) {
          try {
            const uploadedImage = await uploadImage({
              id: imageBlock.id,
              url: imageBlock.image.file.url,
            })
            imageBlock.image.file.url = uploadedImage.secure_url
            imageBlock.image.file.width = uploadedImage.width
            imageBlock.image.file.height = uploadedImage.height
          } catch (error) {
            console.error('Image upload failed', error)
          }
        }

        post.excerpt = excerpt
        return post
      }),
    )

    if (process.env.NOTION_WRITE_FILES) {
      fs.rmSync('posts', { force: true, recursive: true })
      fs.mkdirSync('posts')
    }

    const postIdsToEditedTime = {}
    for (const post of posts) {
      postIdsToEditedTime[post.id] = post.lastEditedTime

      postCollection.addNode(post)
      if (process.env.NOTION_WRITE_FILES) {
        const fileName = `${post.createdTime.split('T')[0]}-${post.title}`
        fs.writeFileSync(
          `./posts/${kebabCase(fileName)}.json`,
          JSON.stringify(post, null, 2),
        )
      }
    }

    if (process.env.NOTION_WRITE_FILES) {
      fs.writeFileSync(
        './posts/posts.json',
        JSON.stringify(postIdsToEditedTime, null, 2),
      )
    }
  })

  api.createManagedPages(({ removePageByPath }) => {
    removePageByPath('/posts/test')
  })
}

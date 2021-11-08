const { Client: NotionClient } = require('@notionhq/client')
const { DateTime } = require('luxon')
const camelCase = require('just-camel-case')
const cloudinary = require('cloudinary').v2
const flatten = require('just-flatten-it')
const fs = require('fs/promises')
const kebabCase = require('just-kebab-case')
const merge = require('just-merge')
const path = require('path')
const typeOf = require('just-typeof')
const util = require('util')
const xlsx = require('xlsx')

const writeBuildFiles = process.env.WRITE_BUILD_FILES
const notionClient = new NotionClient({ auth: process.env.NOTION_AUTH_TOKEN })
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

module.exports = api => {
  api.loadSource(async ({ addCollection }) => {
    // Posts
    const postCollection = addCollection('Post')
    const posts = await getPosts()

    for (const post of posts) {
      postCollection.addNode(post)
      if (writeBuildFiles) {
        await writePostToFiles(posts)
      }
    }

    // Places
    const placeCollection = addCollection('Place')
    const places = await getPlaces()

    for (const place of places) {
      placeCollection.addNode(place)
    }
    if (writeBuildFiles) {
      await writeFile('./places/places.json', places)
    }
  })

  api.createManagedPages(({ removePageByPath }) => {
    removePageByPath('/posts/test')
  })
}

/**
 * Gets all posts from Notion to add to collection
 */
async function getPosts() {
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
          imageBlock.image.file = {
            url: uploadedImage.secure_url,
            width: uploadedImage.width,
            height: uploadedImage.height,
          }
        } catch (error) {
          console.error('Image upload failed', error)
        }
      }

      return post
    }),
  )

  return posts
}

/**
 * Uploads an image to Cloudinary
 */
async function uploadImage({ id, url }) {
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

/**
 * Reads all files from `places` folder, and converts Excel exports from
 * RV Trip Wizard to JavaScript data objects
 */
async function getPlaces() {
  const placesFileNames = await fs.readdir('./places')

  const trips = await Promise.all(
    placesFileNames
      .filter(fileName => path.extname(fileName) === '.xlsx')
      .map(async fileName => {
        const workBook = xlsx.readFile(`./places/${fileName}`)
        const tripSummarySheet = workBook.Sheets[workBook.SheetNames[0]]
        const tripData = camelCaseDeep(
          xlsx.utils.sheet_to_json(tripSummarySheet, { range: 3 }),
        )

        const trip = tripData
          .filter(place => place.latitude && place.longitude && place.nights)
          .map(place => ({
            name: place.stopName.split(/\r?\n/)[0],
            arrivalDate: DateTime.fromFormat(
              place.arrival,
              'EEEE, MMMM dd, yyyy',
            ).toISODate(),
            departureDate: DateTime.fromFormat(
              place.depart,
              'EEEE, MMMM dd, yyyy',
            ).toISODate(),
            latitude: place.latitude,
            longitude: place.longitude,
            miles: place.miles,
            location: place.location,
            url: place.url,
          }))

        return trip
      }),
  )

  const places = flatten(trips)
  return places
}

/**
 * Converts all keys in an object to camelCase recursively
 */
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

/**
 * Writes all posts to disk, as well as a summary of all posts
 */
async function writePostToFiles(posts) {
  await fs.mkdir('posts', { recursive: true })

  const postSummary = {}
  for (const post of posts) {
    postSummary[post.id] = {
      id: post.id,
      title: post.title,
      createdTime: post.createdTime,
      lastEditedTime: post.lastEditedTime,
    }

    const fileName = `${post.createdTime.split('T')[0]}_${kebabCase(
      post.title,
    )}_${post.id}`
    await writeFile(`./posts/${fileName}.json`, post)
  }

  await writeFile('./posts/posts.json', postSummary)
}

async function writeFile(fileName, data) {
  await fs.writeFile(fileName, JSON.stringify(data, null, 2))
}

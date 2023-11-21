require('dotenv').config()
const { DateTime } = require('luxon')
const camelCase = require('just-camel-case')
const flatten = require('just-flatten-it')
const fs = require('fs/promises')
const path = require('path')
const typeOf = require('just-typeof')
const xlsx = require('xlsx')

let idCounter = 0
/**
 * Generates a unique ID, with optional prefix. Adapted from
 * https://github.com/lodash/lodash/blob/61acdd0c295e4447c9c10da04e287b1ebffe452c/uniqueId.js
 */
function uniqueId(prefix = '') {
  return `${prefix}${++idCounter}`
}

/**
 * Reads all files from `places` folder, and converts Excel exports from
 * RV Trip Wizard to JavaScript data objects
 */
async function getPlaces() {
  const placesFileNames = await fs.readdir(path.join(__dirname, '..', 'places'))

  const trips = await Promise.all(
    placesFileNames
      .filter((fileName) => path.extname(fileName) === '.xlsx')
      .map(async (fileName) => {
        const workBook = xlsx.readFile(`./places/${fileName}`)
        const tripSummarySheet = workBook.Sheets[workBook.SheetNames[0]]
        const tripData = camelCaseDeep(xlsx.utils.sheet_to_json(tripSummarySheet, { range: 3 }))

        const places = tripData
          .filter((place) => place.latitude && place.longitude && place.nights)
          .map((_place) => {
            const place = {
              id: uniqueId('place-'),
              name: _place.stopName.split(/\r?\n/)[0],
              arrivalDate: DateTime.fromFormat(_place.arrival, 'EEEE, MMMM dd, yyyy').toISODate(),
              departureDate: DateTime.fromFormat(_place.depart, 'EEEE, MMMM dd, yyyy').toISODate(),
              latitude: _place.latitude,
              longitude: _place.longitude,
              miles: _place.miles,
              location: _place.location,
              url: _place.url,
            }

            if (place.location) {
              /**
               * Extract the city and state by finding the city, state, and 5-digit ZIP code
               * after an address.
               *
               * ```js
               * const location = '7234 E State Rd 46, Batesville, IN 47006'
               * location.match(cityStateRegex)
               * // -> [', Batesville, IN 47006', 'Batesville, IN']
               * ```
               */
              const cityStateRegex = /, ([^,]+, ..) \d\d\d\d\d/
              const cityStateMatch = place.location.match(cityStateRegex)
              if (cityStateMatch) {
                const [address] = place.location.split(cityStateMatch[0])
                const [city, state] = cityStateMatch[1].split(', ')
                place.address = address
                place.city = city
                place.state = state
              }
            }

            return place
          })

        return places
      }),
  )

  const places = flatten(trips).sort((place1, place2) =>
    place2.arrivalDate > place1.arrivalDate ? 1 : -1,
  )
  return places
}

/**
 * Converts all keys in an object to camelCase recursively
 */
function camelCaseDeep(value) {
  if (typeOf(value) === 'array') {
    return value.map((item) => camelCaseDeep(item))
  } else if (typeOf(value) === 'object') {
    return Object.entries(value).reduce((result, [key, _value]) => {
      result[camelCase(key)] =
        key === 'type' && typeOf(_value) === 'string' ? camelCase(_value) : camelCaseDeep(_value)
      return result
    }, {})
  }
  return value
}

async function buildPlaces() {
  await fs.mkdir(path.join(__dirname, '..', 'src', 'content', 'places'), { recursive: true })

  const places = await getPlaces()
  await fs.writeFile(
    path.join(__dirname, '..', 'src', 'content', 'places', 'places.json'),
    JSON.stringify({ places }, null, 2),
  )
}

;(async () => {
  await buildPlaces()
})()

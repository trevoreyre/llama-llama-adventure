<static-query>
query {
  places: allPlace(sortBy: "arrivalDate", order: DESC) {
    edges {
      node {
        id
        name
        arrivalDate
        departureDate
        url
        location
        latitude
        longitude
      }
    }
  }
}
</static-query>

<script>
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader'
import { DateTime } from 'luxon'

export default {
  name: 'LlamaMap',
  async mounted() {
    const googleMapsLoader = new GoogleMapsLoader({
      apiKey: process.env.GRIDSOME_GOOGLE_MAPS_API_KEY,
      id: 'google-maps',
    })
    const google = await googleMapsLoader.load()

    const markerIcons = ['llama-lia', 'llama-trevor']
    const now = DateTime.now()
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

    const map = new google.maps.Map(this.$refs.map, {
      zoom: 4.5,
      center: {
        lat: this.currentPlace.latitude,
        lng: this.currentPlace.longitude,
      },
      mapId: process.env.GRIDSOME_GOOGLE_MAPS_MAP_ID,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
      },
    })

    const infoWindows = []
    this.places.forEach((place, index) => {
      const position = { lat: place.latitude, lng: place.longitude }
      const icon = markerIcons[index % 2]
      const isCurrent = place.id === this.currentPlace.id
      const cityStateMatch = place.location.match(cityStateRegex)
      const arrivalDate = DateTime.fromISO(place.arrivalDate)
      const departureDate = DateTime.fromISO(place.departureDate)
      const dateFormat = arrivalDate.hasSame(now, 'year')
        ? { month: 'short', day: 'numeric' }
        : { month: 'short', day: 'numeric', year: 'numeric' }

      const marker = new google.maps.Marker({
        position,
        map,
        icon: `/images/${icon}-${isCurrent ? 'md' : 'sm'}.png`,
      })

      const infoTitle = `
        <h2 class="map-info-title">
          ${cityStateMatch ? cityStateMatch[1] : place.name}
        </h2>
        ${cityStateMatch ? `<p class="map-info-place">${place.name}</p>` : ''}
      `

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="map-info">
            ${
              place.url
                ? `
                  <a
                    class="map-info-link"
                    href="${place.url}"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ${infoTitle}
                  </a>
                `
                : infoTitle
            }
            <p class="map-info-dates">
              ${arrivalDate.toLocaleString(
                dateFormat,
              )} &#8212 ${departureDate.toLocaleString(dateFormat)}
            </p>
          </div>
        `,
      })
      infoWindows.push(infoWindow)

      marker.addListener('click', () => {
        infoWindows.forEach(infoWindow => infoWindow.close())
        infoWindow.open({ anchor: marker, map, shouldFocus: false })
      })
      if (isCurrent) {
        infoWindow.open({ anchor: marker, map, shouldFocus: false })
      }
    })
  },
  computed: {
    places() {
      return this.$static.places.edges.map(edge => edge.node)
    },
    currentPlace() {
      const now = DateTime.now()
      return this.places.find(
        place =>
          DateTime.fromISO(place.arrivalDate) <= now &&
          DateTime.fromISO(place.departureDate) > now,
      )
    },
  },
}
</script>

<template>
  <div class="map-container">
    <div ref="map" class="map"></div>
  </div>
</template>

<style scoped>
.map-container {
  padding-top: 56.25%;
}

@media screen and (max-width: 960px) {
  .container {
    padding-top: 100%;
  }
}

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<style>
.gm-style {
  font-family: var(--font-family) !important;
  font-size: var(--font-size-default) !important;
  color: var(--color-text-primary) !important;
}

/** Zoom controls */
.gm-bundled-control > div > div {
  border-radius: var(--border-radius-sm) !important;
  background: var(--color-background-light) !important;
  box-shadow: var(--border-sm), var(--shadow-lg) !important;
}

.gm-bundled-control button + div {
  width: var(--spacing-sm) !important;
  margin: 0 auto !important;
  background-color: var(--color-border) !important;
}

.gm-bundled-control button img {
  opacity: 0.6;
}

/** Info window */
.gm-style-iw-c {
  padding: var(--spacing-md) !important;
  max-width: 400px !important;
  border-radius: var(--border-radius-xl) !important;
  box-shadow: var(--shadow-xl) !important;
}

.gm-style-iw-d {
  overflow: auto !important;
}

.gm-style-iw-c button {
  top: var(--spacing-4xs) !important;
  right: var(--spacing-4xs) !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.gm-style-iw-c button img {
  margin: 0 !important;
  width: var(--spacing-sm) !important;
  height: var(--spacing-sm) !important;
  opacity: 0.6;
}

.map-info {
  text-align: center;
}

.map-info-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  --line-height: var(--line-height-none);
}

.map-info-place,
.map-info-dates {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  --line-height: var(--line-height-md);
}

.map-info-place {
  margin-top: var(--spacing-4xs);
}

.map-info-dates {
  margin-top: var(--spacing-3xs);
}

.map-info-link:hover .map-info-title,
.map-info-link:hover .map-info-place {
  color: var(--color-brand-700);
}
</style>

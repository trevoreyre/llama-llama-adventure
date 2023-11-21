<script>
  import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader'
  import { DateTime } from 'luxon'
  import { env } from '../env.js'

  export default {
    name: 'LlaPlacesMap',
    async mounted() {
      const googleMapsLoader = new GoogleMapsLoader({
        apiKey: env.googleMapsApiKey,
        id: 'google-maps',
      })
      const google = await googleMapsLoader.load()

      const markerIcons = ['llama-lia', 'llama-trevor']
      const now = DateTime.now()

      const map = new google.maps.Map(this.$refs.map, {
        zoom: 4.5,
        center: {
          lat: this.currentPlace.latitude,
          lng: this.currentPlace.longitude,
        },
        mapId: env.googleMapsMapId,
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
          ${place.city ? `${place.city}, ${place.state}` : place.name}
        </h2>
        ${place.city ? `<p class="map-info-place">${place.name}</p>` : ''}
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
              ${arrivalDate.toLocaleString(dateFormat)} &#8212 ${departureDate.toLocaleString(
            dateFormat,
          )}
            </p>
          </div>
        `,
        })
        infoWindows.push(infoWindow)

        marker.addListener('click', () => {
          infoWindows.forEach((infoWindow) => infoWindow.close())
          infoWindow.open({ anchor: marker, map, shouldFocus: false })
        })
        if (isCurrent) {
          infoWindow.open({ anchor: marker, map, shouldFocus: false })
        }
      })
    },
    props: {
      allPlaces: Array,
    },
    computed: {
      places() {
        return this.allPlaces.sort((place1, place2) => {
          return place1.arrivalDate < place2.arrivalDate ? -1 : 1
        })
      },
      currentPlace() {
        const now = DateTime.now()
        const currentPlace = this.places.find(
          (place) =>
            DateTime.fromISO(place.arrivalDate) <= now &&
            DateTime.fromISO(place.departureDate) > now,
        )
        return currentPlace ?? this.places[this.places.length - 1]
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
    position: relative;
    padding-top: 100%;
  }

  @media screen and (min-width: 840px) {
    .map-container {
      padding-top: 56.25%;
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
  /** Customize Google Maps styles */
  .gm-style {
    font-family: var(--font-family) !important;
    /* font-size: var(--text-md-font-size) !important;
    line-height: var(--text-md-line-height) !important; */
    color: hsl(var(--color-text-primary)) !important;
  }

  /** Zoom controls */
  .gm-bundled-control > div > div {
    border-radius: var(--border-radius-sm) !important;
    background: hsl(var(--color-background-primary)) !important;
    border: var(--border-size-sm) solid hsl(var(--color-border)) !important;
    box-shadow: var(--shadow-md) !important;
  }

  .gm-bundled-control button + div {
    width: var(--spacing-sm) !important;
    margin: 0 auto !important;
    background-color: hsl(var(--color-border)) !important;
  }

  .gm-bundled-control button img {
    opacity: 0.6;
  }

  /** Info window */
  .gm-style-iw-c {
    padding: var(--spacing-sm) !important;
    max-width: 400px !important;
    border-radius: var(--border-radius-xl) !important;
    box-shadow: var(--shadow-md) !important;
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
    margin: 0;
    font-size: var(--text-lg-font-size);
    line-height: 1.2;
    font-weight: var(--font-weight-bold);
  }

  .map-info-place,
  .map-info-dates {
    font-size: var(--text-md-font-size);
    line-height: 1.4;
    color: hsl(var(--color-text-secondary));
  }

  .map-info-place {
    margin-block-start: var(--spacing-3xs);
    margin-block-end: 0;
  }

  .map-info-dates {
    margin-block-start: var(--spacing-xs);
    margin-block-end: 0;
  }

  .map-info-link {
    color: inherit;
    text-decoration: inherit;
  }

  .map-info-link:hover .map-info-title,
  .map-info-link:hover .map-info-place {
    color: var(--color-brand-700);
  }
</style>

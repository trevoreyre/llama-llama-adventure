<static-query>
query {
  places: allPlace {
    edges {
      node {
        id
        name
        arrivalDate
        state
        miles
      }
    }
  }
}
</static-query>

<script>
import { DateTime } from 'luxon'
import { Container, Txt } from '@slate-ui/core'
import { Heading } from '~/components'

const now = DateTime.now()

export default {
  name: 'LlamaPlacesStats',
  components: { Heading, Txt },
  computed: {
    places() {
      const places = this.$static.places.edges.map(edge => edge.node)
      return places.filter(place => DateTime.fromISO(place.arrivalDate) <= now)
    },
    miles() {
      const miles = this.places.reduce((miles, place) => {
        miles += place.miles ?? 0
        return miles
      }, 0)
      return Math.round(miles).toLocaleString()
    },
    states() {
      const states = new Set()
      for (const place of this.places) {
        states.add(place.state)
      }
      return states.size
    },
    travelTime() {
      const startDate = DateTime.fromISO('2020-06-13')
      const days = now.diff(startDate, 'days').as('days')
      const months = now.diff(startDate, 'months').as('months')
      const years = now.diff(startDate, 'years').as('years')

      const travelTime = {
        days: Math.floor(days),
        months: Math.floor(months),
        years: Math.floor(years),
      }
      return travelTime
    },
  },
}
</script>

<template>
  <div class="places-stats">
    <div class="stat">
      <Heading as="p" size="2xl">{{ travelTime.days }}</Heading>
      <Txt font-size="lg" weight="bold" theme="secondary">Days on the road</Txt>
    </div>
    <div class="stat">
      <Heading as="p" size="2xl">{{ states }}</Heading>
      <Txt font-size="lg" weight="bold" theme="secondary">States visited</Txt>
    </div>
    <div class="stat">
      <Heading as="p" size="2xl">{{ miles }}</Heading>
      <Txt font-size="lg" weight="bold" theme="secondary">Miles driven</Txt>
    </div>
  </div>
</template>

<style scoped>
.places-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--spacing-md);
}
</style>

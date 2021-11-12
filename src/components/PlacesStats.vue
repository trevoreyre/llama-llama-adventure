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
    <AppStack class="stat" direction="row" gap="sm">
      <div class="stat-icon">☀️</div>
      <div class="stat-text">
        <AppStack gap="4xs">
          <Heading as="p" size="2xl" weight="bold" line-height="none">
            {{ travelTime.days }}
          </Heading>
          <Txt
            font-size="lg"
            weight="bold"
            theme="secondary"
            line-height="none"
          >
            Days on the road
          </Txt>
        </AppStack>
      </div>
    </AppStack>
    <AppStack class="stat" direction="row" gap="sm">
      <div class="stat-icon">🗺</div>
      <div class="stat-text">
        <AppStack gap="4xs">
          <Heading as="p" size="2xl" weight="bold" line-height="none">
            {{ states }}
          </Heading>
          <Txt
            font-size="lg"
            weight="bold"
            theme="secondary"
            line-height="none"
          >
            States visited
          </Txt>
        </AppStack>
      </div>
    </AppStack>
    <AppStack class="stat" direction="row" gap="sm">
      <div class="stat-icon">🛻</div>
      <div class="stat-text">
        <AppStack gap="4xs">
          <Heading as="p" size="2xl" weight="bold" line-height="none">
            {{ miles }}
          </Heading>
          <Txt
            font-size="lg"
            weight="bold"
            theme="secondary"
            line-height="none"
          >
            Miles towed
          </Txt>
        </AppStack>
      </div>
    </AppStack>
  </div>
</template>

<style scoped>
.places-stats {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: var(--spacing-xl);
}

@media (min-width: 600px) {
  .places-stats {
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: start;
    gap: var(--spacing-md);
  }
}

@media (max-width: 840px) {
  .stat {
    align-items: center;
    flex-direction: column;
  }

  .stat-text {
    margin-left: 0;
    margin-top: var(--spacing-2xs);
    text-align: center;
  }
}

.stat-icon {
  font-size: 4rem;
  line-height: 4rem;
}
</style>

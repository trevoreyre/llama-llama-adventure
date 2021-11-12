<script>
import { Container, Txt } from '@slate-ui/core'
import { Heading, Link, Logo, PlacesMap, PlacesStats } from '~/components'

export default {
  components: { Container, Heading, Link, Logo, PlacesMap, PlacesStats, Txt },
}
</script>

<template>
  <Layout>
    <Container :class="$style.tagLine" size="lg" mb="2xl">
      <AppStack gap="sm">
        <Heading as="h1" size="2xl">
          Hello! We are the <strong>Eyres</strong> 👋🏼
        </Heading>
        <Heading as="p" size="sm" line-height="lg">
          <Link href="https://trevoreyre.com">Trevor</Link> is a software
          engineer, and <Link href="https://liaeyre.com">Lia</Link> is a stay at
          home mom to baby girl Lennon, and our two pups, Banana Pig and Mango
          Salsa.
        </Heading>
        <Heading as="p" size="sm" line-height="lg">
          We moved into an RV in July 2019, and started travelling full time in
          the summer of 2020.
        </Heading>
      </AppStack>
      <Logo />
    </Container>
    <Container size="lg" mb="2xl">
      <Container size="sm" style="margin-left: 0">
        <AppStack gap="sm">
          <Heading size="lg" weight="bold" line-height="sm">
            Follow along
          </Heading>
          <Txt as="p" font-size="lg">
            Follow our adventure on the map below. See where we've been and
            where we're headed next. If you happen to be in the area, hit us up.
            We'd love to meet and have a beer!
          </Txt>
        </AppStack>
      </Container>
    </Container>
    <Container size="lg">
      <AppStack gap="2xl">
        <PlacesStats />
        <PlacesMap />
      </AppStack>
    </Container>
  </Layout>
</template>

<style module>
.tag-line {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-lg);
  align-items: center;
}
</style>

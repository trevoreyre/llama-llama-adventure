<page-query>
query {
  posts: allPost(
    filter: { id: { ne: "abe30549-8d9f-4b07-8703-60c712bc1f2c" } }
    sort: [{ by: "createdAt", order: DESC }, { by: "title", order: ASC }]
  ) {
    edges {
      node {
        id
        title
        path
        content
        excerpt
      }
    }
  }
}
</page-query>

<script>
import { Container, Txt } from '@slate-ui/core'
import { Heading, PostSummary } from '~/components'

export default {
  components: { Container, Heading, PostSummary, Txt },
  computed: {
    posts() {
      return this.$page.posts.edges.map(edge => edge.node)
    },
  },
}
</script>

<template>
  <Layout>
    <Container size="sm">
      <AppStack gap="3xl">
        <AppStack gap="xs">
          <Heading as="h1" size="2xl" line-height="sm">Notes</Heading>
          <Txt as="p" font-size="lg">
            This is where we keep some of our (terribly organized) notes on
            different topics we're researching or thinking about. Some day we
            might turn some of these into proper blog posts.
          </Txt>
          <Txt as="p" font-size="lg">
            Maybe...
          </Txt>
        </AppStack>
        <template v-for="post of posts">
          <PostSummary :key="post.id" :post="post" />
        </template>
      </AppStack>
    </Container>
  </Layout>
</template>

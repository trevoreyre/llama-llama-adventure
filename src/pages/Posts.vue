<page-query>
query {
  posts: allPost(
    filter: { id: { ne: "abe30549-8d9f-4b07-8703-60c712bc1f2c" } }
    sortBy: "createdTime"
    order: DESC
  ) {
    edges {
      node {
        id
        title
        path
        content {
          id
          type
          hasChildren
          paragraph {
            text {
              type
              text {
                content
              }
              plainText
              annotations {
                bold
                italic
                strikethrough
                underline
                code
              }
            }
          }
        }
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
      <AppStack gap="2xl">
        <AppStack gap="xs">
          <Heading as="h1" size="2xl">Notes</Heading>
          <Txt as="p" font-size="lg">
            This is where we keep some of our (terribly organized) notes on
            different topics we're researching or thinking about. Some day we
            might turn some of these into proper blog posts.
          </Txt>
          <Txt as="p" font-size="lg">
            Maybe...
          </Txt>
        </AppStack>
        <AppStack gap="lg">
          <template v-for="post of posts">
            <PostSummary :key="post.id" :post="post" />
          </template>
        </AppStack>
      </AppStack>
    </Container>
  </Layout>
</template>

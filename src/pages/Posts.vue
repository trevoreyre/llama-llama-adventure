// Filter out test post from being listed
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
        excerpt
      }
    }
  }
}
</page-query>

<script>
import { Container, Txt } from '@slate-ui/core'
import { Heading, Link, Stack } from '~/components'

export default {
  components: { Container, Heading, Link, Stack, Txt },
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
      <Stack gap="2xl">
        <Heading as="h1" size="2xl">Notes</Heading>
        <Stack gap="lg">
          <article v-for="post in posts" :key="post.id" class="post">
            <Link class="post-link" :to="post.path" display="block">
              <Stack gap="xs">
                <Heading
                  class="post-heading"
                  size="lg"
                  weight="bold"
                  line-height="sm"
                >
                  {{ post.title }}
                </Heading>
                <Txt theme="secondary" font-size="lg">{{ post.excerpt }}</Txt>
                <Txt class="read-more" font-size="lg">
                  Read more <IconArrowRight class="read-more-arrow" />
                </Txt>
              </Stack>
            </Link>
          </article>
        </Stack>
      </Stack>
    </Container>
  </Layout>
</template>

<style scoped>
.post {
  background: var(--color-brand-100);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-xl);
  --shadow: var(--shadow-lg);
}

.post-link {
  display: block;
}

.post:hover .post-heading {
  color: var(--color-brand-700);
}

.read-more-arrow {
  opacity: 0;
  transition: opacity 100ms ease, transform 300ms ease;
  --color-icon-primary: var(--color-brand-700);
}

.post:hover .read-more-arrow {
  opacity: 1;
  transform: translate3d(var(--spacing-4xs), 0, 0);
}
</style>

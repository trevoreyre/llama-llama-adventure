<script>
import { Txt } from '@slate-ui/core'
import { Heading, Link } from '~/components'

export default {
  name: 'LlamaPostSummary',
  components: { Heading, Link, Txt },
  props: {
    post: Object,
  },
  computed: {
    // excerpt() {
    //   // Loop through paragraph blocks to construct excerpt
    //   let textContent = ''
    //   const paragraphBlocks = this.post.content.filter(
    //     block => block.type === 'paragraph',
    //   )
    //   for (const paragraphBlock of paragraphBlocks) {
    //     textContent += ' '
    //     for (const textBlock of paragraphBlock.paragraph.text) {
    //       textContent += textBlock.plainText
    //     }
    //   }
    //   const words = textContent.split(' ')
    //   let excerpt = words
    //     .slice(0, 50)
    //     .join(' ')
    //     .trim()
    //   if (words.length > 50) {
    //     excerpt += '...'
    //   }
    //   return excerpt
    // },
  },
}
</script>

<template>
  <article class="post">
    <Link class="post-link" :to="post.path" display="block">
      <AppStack gap="xs">
        <Heading class="post-heading" size="lg" weight="bold" line-height="sm">
          {{ post.title }}
        </Heading>
        <Txt theme="secondary" font-size="lg">{{ post.excerpt }}</Txt>
        <Txt class="read-more" font-size="lg">
          Read more <IconArrowRight class="read-more-arrow" />
        </Txt>
      </AppStack>
    </Link>
  </article>
</template>

<style scoped>
.post {
  width: 100%;
  /* background: var(--color-brand-100);
  border-radius: var(--border-radius-lg);
  --shadow: var(--shadow-lg); */
}

.post:hover .read-more {
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

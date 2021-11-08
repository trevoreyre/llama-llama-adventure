<page-query>
query ($id: ID!) {
  post(id: $id) {
    title
    createdTime(format: "MMM D, yyyy")
    lastEditedTime(format: "MMM D, yyyy")
    path
    content {
      id
      type
      hasChildren
      heading1 {
        text {
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
      heading2 {
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
      heading3 {
        text {
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
      bulletedListItem {
        text {
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
      numberedListItem {
        text {
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
      toDo {
        checked
        text {
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
      bookmark {
        url
      }
      image {
        type
        external {
          url
        }
        file {
          url
          width
          height
        }
        caption {
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
</page-query>

<script>
import { Container, Txt } from '@slate-ui/core'
import { Heading } from '~/components'

export default {
  components: { Container, Heading, Txt },
  computed: {
    post() {
      return this.$page.post
    },
  },
  metaInfo() {
    return {
      title: this.post.title,
    }
  },
}
</script>

<template>
  <Layout>
    <Container size="sm">
      <AppStack gap="sm">
        <Heading as="h1" size="lg" weight="bold" line-height="sm">
          {{ post.title }}
        </Heading>
        <template v-if="post.content.length">
          <template v-for="block in post.content">
            <Txt
              as="p"
              v-if="block.type === 'paragraph'"
              :key="block.id"
              font-size="lg"
            >
              <template v-for="t in block.paragraph.text">
                <Txt
                  v-if="!t.annotations.code"
                  :key="t.text.plainText"
                  as="span"
                  font-size="lg"
                  line-height="lg"
                  :font-weight="t.annotations.bold ? 'bold' : 'normal'"
                >
                  {{ t.text.content }}
                </Txt>
                <Txt
                  v-if="t.annotations.code"
                  :key="t.text.plainText"
                  as="pre"
                  class="code"
                  font-size="lg"
                  line-height="lg"
                >
                  <code>{{ t.text.content }}</code>
                </Txt>
              </template>
            </Txt>
            <Heading
              v-if="block.type === 'heading1'"
              :key="block.id"
              as="h2"
              size="md"
              weight="bold"
            >
              <template v-for="t in block.heading2.text">
                {{ t.text.content }}
              </template>
            </Heading>
            <Heading
              v-if="block.type === 'heading2'"
              :key="block.id"
              as="h2"
              size="md"
              weight="bold"
              mt="2xl"
            >
              <template v-for="t in block.heading2.text">
                {{ t.text.content }}
              </template>
            </Heading>
            <a
              v-if="block.type === 'bookmark'"
              :key="block.id"
              :href="block.bookmark.url"
            >
              {{ block.bookmark.url }}
            </a>
            <img
              v-if="block.type === 'image' && block.image.type === 'external'"
              :key="block.id"
              :src="block.image.external.url"
              class="image"
            />
            <img
              v-if="block.type === 'image' && block.image.type === 'file'"
              :key="block.id"
              :width="block.image.file.width"
              :height="block.image.file.height"
              sizes="(min-width: 600px) 600px, 100vw"
              :srcset="
                `
                  https://res.cloudinary.com/trevoreyre/image/upload/q_auto,f_auto,w_200/llama-llama-adventure/${block.id} 200w,
                  https://res.cloudinary.com/trevoreyre/image/upload/q_auto,f_auto,w_400/llama-llama-adventure/${block.id} 400w,
                  https://res.cloudinary.com/trevoreyre/image/upload/q_auto,f_auto,w_600/llama-llama-adventure/${block.id} 600w,
                  https://res.cloudinary.com/trevoreyre/image/upload/q_auto,f_auto,w_800/llama-llama-adventure/${block.id} 800w,
                  https://res.cloudinary.com/trevoreyre/image/upload/q_auto,f_auto,w_1200/llama-llama-adventure/${block.id} 1200w,
                `
              "
              class="image"
            />
          </template>
        </template>
      </AppStack>
    </Container>
  </Layout>
</template>

<style scoped>
.image {
  border-radius: var(--border-radius-lg);
  --shadow: var(--shadow-md);
}

.code {
  padding: var(--spacing-2xs);
  border-radius: var(--border-radius-md);
  background: var(--color-background-dark);
}

.inherit {
  font-size: inherit;
  font-weight: inherit;
}
</style>

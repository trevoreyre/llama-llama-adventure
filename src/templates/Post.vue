<page-query>
query ($id: ID!) {
  post(id: $id) {
    title
    createdAt(format: "MMM D, yyyy")
    updatedAt(format: "MMM D, yyyy")
    path
    content
    # content {
    #   id
    #   type
    #   hasChildren
    #   heading1 {
    #     text {
    #       text {
    #         content
    #       }
    #       plainText
    #       annotations {
    #         bold
    #         italic
    #         strikethrough
    #         underline
    #         code
    #       }
    #     }
    #   }
    #   heading2 {
    #     text {
    #       type
    #       text {
    #         content
    #       }
    #       plainText
    #       annotations {
    #         bold
    #         italic
    #         strikethrough
    #         underline
    #         code
    #       }
    #     }
    #   }
    #   heading3 {
    #     text {
    #       type
    #       text {
    #         content
    #       }
    #       plainText
    #       annotations {
    #         bold
    #         italic
    #         strikethrough
    #         underline
    #         code
    #       }
    #     }
    #   }
    #   paragraph {
    #     text {
    #       type
    #       text {
    #         content
    #       }
    #       plainText
    #       href
    #       annotations {
    #         bold
    #         italic
    #         strikethrough
    #         underline
    #         code
    #       }
    #     }
    #   }
    #   bulletedListItem {
    #     text {
    #       text {
    #         content
    #       }
    #       plainText
    #       annotations {
    #         bold
    #         italic
    #         strikethrough
    #         underline
    #         code
    #       }
    #     }
    #   }
    #   numberedListItem {
    #     text {
    #       text {
    #         content
    #       }
    #       plainText
    #       annotations {
    #         bold
    #         italic
    #         strikethrough
    #         underline
    #         code
    #       }
    #     }
    #   }
    #   toDo {
    #     checked
    #     text {
    #       text {
    #         content
    #       }
    #       plainText
    #       annotations {
    #         bold
    #         italic
    #         strikethrough
    #         underline
    #         code
    #       }
    #     }
    #   }
    #   bookmark {
    #     url
    #     caption {
    #       text {
    #         content
    #       }
    #     }
    #   }
    #   image {
    #     type
    #     external {
    #       url
    #     }
    #     file {
    #       url
    #       width
    #       height
    #     }
    #     caption {
    #       text {
    #         content
    #       }
    #       plainText
    #       annotations {
    #         bold
    #         italic
    #         strikethrough
    #         underline
    #         code
    #       }
    #     }
    #   }
    # }
  }
}
</page-query>

<script>
import { Container, Txt } from '@slate-ui/core'
import { Heading, Link } from '~/components'

export default {
  components: { Container, Heading, Link, Txt },
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
      <AppStack gap="3xl">
        <Heading as="h1" size="2xl" line-height="sm">
          {{ post.title }}
        </Heading>
        <AppTypography
          :class="$style.image"
          v-html="post.content"
        ></AppTypography>
        <!-- <template v-if="post.content.length">
          <template v-for="block in post.content">
            <Txt
              as="p"
              v-if="block.type === 'paragraph'"
              :key="block.id"
              font-size="lg"
            >
              <template v-for="t in block.paragraph.text">
                <Txt
                  v-if="!t.annotations.code && !t.href"
                  :key="t.plainText"
                  as="span"
                  font-size="lg"
                  line-height="lg"
                  :font-weight="t.annotations.bold ? 'bold' : 'normal'"
                >
                  {{ t.text.content }}
                </Txt>
                <Txt
                  v-if="t.annotations.code"
                  :key="t.plainText"
                  as="pre"
                  class="code"
                  font-size="lg"
                  line-height="lg"
                >
                  <code>{{ t.text.content }}</code>
                </Txt>
                <Link v-if="t.href" :key="t.plainText" :href="t.href">
                  {{ t.text.content }}
                </Link>
              </template>
            </Txt>
            <Heading
              v-if="block.type === 'heading1'"
              :key="block.id"
              as="h2"
              size="md"
              weight="bold"
            >
              <template v-for="t in block.heading1.text">
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
            <Heading
              v-if="block.type === 'heading3'"
              :key="block.id"
              as="h2"
              size="sm"
              weight="bold"
              mt="2xl"
            >
              <template v-for="t in block.heading3.text">
                {{ t.text.content }}
              </template>
            </Heading>
            <Txt
              v-if="block.type === 'bookmark'"
              :key="block.id"
              as="span"
              font-size="lg"
              line-height="lg"
            >
              <Link :href="block.bookmark.url">
                <template v-for="t in block.bookmark.caption">
                  {{ t.text.content }}
                </template>
              </Link>
            </Txt>
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
        </template> -->
      </AppStack>
    </Container>
  </Layout>
</template>

<style module>
.image img {
  width: 100%;
  border-radius: var(--border-radius-lg);
  --shadow: var(--shadow-md);
}
</style>

import { defineConfig } from 'astro/config'
import lit from '@astrojs/lit'
import vue from '@astrojs/vue'
import rehypeExternalLinks from 'rehype-external-links'

export default defineConfig({
  site: 'https://llamallamaadventure.com',
  integrations: [lit(), vue()],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noreferrer noopener'] }]],
  },
})

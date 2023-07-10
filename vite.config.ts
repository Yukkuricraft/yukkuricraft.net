import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItHtml5Embed from 'markdown-it-html5-embed'

const markdownItObj = markdownIt({ linkify: true, typographer: true })
  .use(markdownItAnchor, {
    slugify(s) {
      return String(s).trim().toLowerCase().replace(/\s+/g, '-')
    },
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'before',
      symbol: '<i class="fas fa-link" style="font-size: 0.5em"></i>',
    }),
  })
  .use(markdownItHtml5Embed, {
    html5embed: {
      useImageSyntax: true,
    },
  })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ViteYaml(), mdPlugin({ mode: [Mode.VUE], markdownIt: markdownItObj })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

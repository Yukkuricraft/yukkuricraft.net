import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
// @ts-expect-error No types
import markdownItHtml5Embed from 'markdown-it-html5-embed'
import { visualizer } from 'rollup-plugin-visualizer'

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
  plugins: [
    vue(),
    ViteYaml(),
    mdPlugin({ mode: [Mode.VUE], markdownIt: markdownItObj }),
    visualizer({ template: 'treemap', open: true, gzipSize: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@gen': fileURLToPath(new URL('./generated', import.meta.url)),
      '@cont': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  build: {
    outDir: './dist/client',
    target: 'es2021',
    assetsInlineLimit: 1024,
    rolldownOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extension = assetInfo.names[0].split('.').at(-1) ?? ''
          if (/png|jpe?g|webp/i.test(extension)) {
            return `assets/images/[name]-[hash][extname]`
          } else if (/wav|mp3/i.test(extension)) {
            return `assets/sound/[name]-[hash][extname]`
          } else {
            return `assets/${extension}/[name]-[hash][extname]`
          }
        },
        chunkFileNames: (assetInfo) => {
          if (assetInfo.facadeModuleId && assetInfo.facadeModuleId.includes('/content/announcements/')) {
            const [year, month] = assetInfo.facadeModuleId.split('/content/announcements/')[1].split('/')
            return `assets/announcements/${year}/${month}/[name]-[hash].js`
          } else {
            return `assets/[name]-[hash].js`
          }
        },
        codeSplitting: {
          groups: [
            { name: 'vendor_egjs', test: /node_modules\/@egjs/, priority: 20 },
            { name: 'vendor_tippy', test: /node_modules\/.*tippy/, priority: 20 },
            { name: 'vendor', test: /node_modules/, priority: 10 },
            { name: 'avatar_image_data', test: /generated\/avatars\/data\.js/, priority: 10 },
            { name: 'backgrounds_image_data', test: /generated\/backgrounds\/data\.js/, priority: 10 },
            { name: 'builds_image_data', test: /generated\/builds\/data\.js/, priority: 10 },
          ],
        },
      },
    },
  },
})

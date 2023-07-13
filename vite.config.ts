import { fileURLToPath, URL } from 'node:url'

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItHtml5Embed from 'markdown-it-html5-embed'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import visualizer from 'rollup-plugin-visualizer'

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
    vitePluginFaviconsInject('./src/favicon_upscaled.png', {
      appName: 'YukkuriCraft Info',
      appDescription: 'YukkuriCraft Info page',
      developerName: 'Katrix',
      developerURL: null,
      background: '#fff',
      theme_color: '#e56a00',
      icons: {
        coast: false,
        firefox: false,
        yandex: false,
      },
    }, {
      failGraciously: Boolean(process.env.FAVICONS_OK_NO_FILES)
    }),
    splitVendorChunkPlugin(),
    // visualizer({ template: 'treemap', open: true, gzipSize: true }),
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
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extension = assetInfo.name.split('.').at(-1)
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
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('markdown-it')) {
              return 'vendor_markdown-it'
            }
          } else if (id.includes('generated/avatars/data.js')) {
            return 'avatar_image_data'
          } else if (id.includes('generated/backgrounds/data.js')) {
            return 'backgrounds_image_data'
          } else if (id.includes('generated/builds/data.js')) {
            return 'builds_image_data'
          }
        },
      },
    },
  },
})

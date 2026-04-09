import autoprefixer from 'autoprefixer'
import purgecss from '@fullhuman/postcss-purgecss'

export default {
  plugins: [
    autoprefixer,
    purgecss({
      content: ['./index.html', './src/**/*.vue'],
      variables: true,
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
      },
      safelist: {
        standard: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
          /is-size-.*$/,
          /is-\d+x\d+/,
          /splide.*$/,
          /is-.*$/,
          /tippy-.*$/,
        ],
        greedy: [/tippy-box/],
      },
    }),
  ],
}

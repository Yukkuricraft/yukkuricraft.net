const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

module.exports = (env, options) => {
  return {
    plugins: [new VueLoaderPlugin()],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(scss)$/,
          use: [
            options.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(css)$/,
          use: [
            options.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif|webp)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name]-[contenthash][ext]',
          },
        },
        {
          test: /\.(mp3)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/sound/[name]-[contenthash][ext]',
          },
        },
        {
          test: /\.ya?ml$/,
          type: 'json', // Required by Webpack v4
          use: 'yaml-loader',
        },
        {
          test: /\.md$/i,
          loader: 'frontmatter-markdown-loader',
          options: {
            mode: ['vue-component'],
            markdownIt: markdownIt({ linkify: true, typographer: true })
              .use(markdownItAnchor, {
                slugify(s) {
                  return String(s).trim().toLowerCase().replace(/\s+/g, '-')
                },
                permalink: markdownItAnchor.permalink.ariaHidden({
                  placement: 'before',
                  symbol: '<i class="fas fa-link" style="font-size: 0.5em"></i>',
                }),
              })
              .use(require('markdown-it-html5-embed'), {
                html5embed: {
                  useImageSyntax: true,
                },
              }),
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@intlify/vue-i18n-loader',
        },
      ],
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
      },
      extensions: ['*', '.js', '.vue', '.json'],
    },
  }
}

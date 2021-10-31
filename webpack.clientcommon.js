const merge = require('webpack-merge').merge

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const common = require('./webpack.common.js')

module.exports = (env, options) => {
  return merge(common(env, options), {
    entry: {
      app: './src/client-app.js',
    },
    output: {
      chunkFilename: '[name].js',
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Yukkuricraft Info',
        filename: 'index.html',
        template: 'src/index.html',
        links: ['modernizr-custom.js'],
        meta: {
          description: 'Everything you want to know about YukkuriCraft, from Gensokyo builds to commands.',
        },
      }),
      new FaviconsWebpackPlugin({
        logo: './src/favicon_upscaled.png',
        cache: true,
        prefix: 'assets/favicon',
        favicons: {
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
        },
      }),
      new VueSSRClientPlugin(),
    ],
    devServer: {
      compress: true,
      historyApiFallback: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'js-vendors',
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            enforce: true,
          },
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
          backdrops: {
            name: 'backdrops',
            test: /[\\/]generated[\\/]backgrounds[\\/]/,
            chunks: 'async',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  })
}

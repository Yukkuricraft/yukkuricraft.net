const path = require('path')
const merge = require('webpack-merge').merge
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./webpack.common.js')

module.exports = (env, options) => {
  return merge(common(env, options), {
    entry: {
      app: './src/ssr-app.js',
    },
    target: 'node',
    devtool: 'source-map',
    output: {
      chunkFilename: '[name].js',
      publicPath: '/',
      path: path.join(__dirname, 'serverdist'),
      libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({ allowlist: /\.(s?css|png|svg|jpe?g|gif|webp|mp3|md)$/ }),
    plugins: [new VueSSRServerPlugin(), new MiniCssExtractPlugin()],
  })
}

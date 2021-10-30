const merge = require('webpack-merge').merge

const CopyPlugin = require('copy-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const common = require('./webpack.common.js')

module.exports = (env, options) => {
  return merge(common(env, options), {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'content/images/commands', to: 'assets/images/commands' },
          { from: 'src/modernizr-custom.js', to: 'modernizr-custom.js' },
        ],
      }),
      // new BundleAnalyzerPlugin()
    ],
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
  })
}

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

let isCI = typeof process.env.CI !== 'undefined' && process.env.CI;

module.exports = (env, options) => {
	return merge(common(env, options), {
		mode: 'production',
		devtool: 'source-map',
		plugins: [
			new PrerenderSPAPlugin({
				staticDir: path.join(__dirname, 'dist'),
				indexPath: path.join(__dirname, 'dist', 'index.html'),
				routes: [
					'/',
					'/rules',
					'/ranks_staff',
					'/commands',
					'/downloads/gensokyo',
					'/downloads/survival',
					'/gensokyo',
					'/gensokyo/help',
				],
				renderer: new Renderer({
					headless: true,
					renderAfterDocumentEvent: 'render-event',
					executablePath: isCI ? 'google-chrome-stable' : undefined
				}),
			}),
			new MiniCssExtractPlugin(),
			new CopyPlugin([{from: 'src/pages/commands/images', to: 'assets/images/commands'}]),
			new CopyPlugin([{from: 'src/modernizr-custom.js', to: 'modernizr-custom.js'}]),
			//new BundleAnalyzerPlugin()
		],
		optimization: {
			minimizer: [
				new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})
			]
		}
	})
};

const merge = require('webpack-merge').merge;
const common = require('./webpack.common.js');
const path = require('path');
const JSDOM = require("jsdom").JSDOM;

const CopyPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let pages = require('./pages')

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

function processRendered(content) {
	let htmlContent = content;
	htmlContent = htmlContent.replace('http://localhost:8000', 'https://yukkuricraft.net');

	let dom = new JSDOM(htmlContent);
	dom.window.document.children[0].classList.remove('webp', 'webp-alpha', 'webp-animation', 'webp-lossless');

	let scripts = dom.window.document.head.querySelectorAll('script');
	for(let script of scripts) {
		script.defer = true;
		dom.window.document.body.appendChild(script);
	}

	return dom.serialize();
}

module.exports = (env, options) => {
	return merge(common(env, options), {
		mode: 'production',
		devtool: 'source-map',
		plugins: [
			new PrerenderSPAPlugin({
				staticDir: path.join(__dirname, 'dist'),
				indexPath: path.join(__dirname, 'dist', 'index.html'),
				routes: pages.map(p => p.url),
				renderer: new Renderer({
					headless: true,
					renderAfterDocumentEvent: 'render-event',
					injectProperty: '__PRERENDER_INJECTED',
					inject: {
						prerendered: true
					}
				}),
				postProcess(context) {
					if (context.route === '/404') {
						context.outputPath = 'dist/404.html'
					}

					context.html = processRendered(context.html);

					return context
				}
			}),
			new MiniCssExtractPlugin(),
			new CopyPlugin({
				patterns: [
					{from: 'content/images/commands', to: 'assets/images/commands'},
					{from: 'src/modernizr-custom.js', to: 'modernizr-custom.js'}
				]
			}),
			//new BundleAnalyzerPlugin()
		],
		optimization: {
			minimizer: [
				new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})
			]
		}
	})
};

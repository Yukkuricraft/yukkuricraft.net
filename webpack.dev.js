const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {
	return merge(common(env, options), {
		mode: 'development',
		devtool: 'inline-source-map',
		plugins: [
			new CopyPlugin([{from: 'src/pages/commands/images', to: 'assets/images/commands'}]),
			new CopyPlugin([{from: 'src/modernizr-custom.js', to: 'modernizr-custom.js'}]),
			//new BundleAnalyzerPlugin()
		]
	})
};

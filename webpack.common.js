const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = (env, options) => {

	return {
		entry: {
			'app': './src/app.js'
		},
		output: {
			filename: '[name].js',
			chunkFilename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		},
		plugins: [
			new VueLoaderPlugin(),
			new HtmlWebpackPlugin({
				title: 'Yukkuricraft Info',
				filename: 'index.html',
				template: 'src/index.html',
				links: [
					'modernizr-custom.js'
				],
				meta: {
					description: 'Everything you want to know about YukkuriCraft, from Gensokyo builds to commands.'
				}
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
						yandex: false
					}
				}
			})
		],
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},
				{
					test: /\.(scss)$/,
					use: [
						options.mode !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								config: {
									ctx: {
										mode: options.mode
									}
								}
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									functions: require('chromatic-sass')
								}
							}
						}
					]
				},
				{
					test: /\.(css)$/,
					use: [
						options.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								config: {
									ctx: {
										mode: options.mode
									}
								}
							}
						},
					]
				},
				{
					test: /\.(png|svg|jpe?g|gif|webp)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								esModule: false, //https://github.com/peerigon/extract-loader/issues/67
								outputPath: 'assets/images',
								name: '[name]-[contenthash].[ext]'
							}
						}
					]
				},
				{
					test: /\.ya?ml$/,
					type: 'json', // Required by Webpack v4
					use: 'yaml-loader'
				},
				{
					test: /\.md$/i,
					loader: 'frontmatter-markdown-loader',
					options: {
						mode: [
							'vue-component',
						],
						markdownIt: markdownIt({linkify: true, typographer: true})
							.use(markdownItAnchor, {
								slugify(s) {
									return String(s).trim().toLowerCase().replace(/\s+/g, '-')
								},
								permalink: true,
								permalinkBefore: true,
								permalinkSymbol: '<i class="fas fa-link" style="font-size: 0.5em"></i>'
							})
					}
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					resourceQuery: /blockType=i18n/,
					type: 'javascript/auto',
					loader: '@intlify/vue-i18n-loader'
				}
			]
		},
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.runtime.esm.js'
			},
			extensions: ['*', '.js', '.vue', '.json']
		},
		devServer: {
			compress: true,
			historyApiFallback: true
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						name: "js-vendors",
						chunks: "initial",
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						enforce: true
					},
					commons: {
						name: "commons",
						chunks: "initial",
						minChunks: 2,
					},
					backdrops: {
						name: 'backdrops',
						test: /[\\/]generated[\\/]backgrounds[\\/]/,
						chunks: "async",
						priority: 10,
						enforce: true
					}
				}
			}
		}
	};
}

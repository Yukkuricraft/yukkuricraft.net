module.exports = (ctx) => {
	return {
		plugins: [
			require('autoprefixer'),
			ctx.options.mode === 'production' && require('@fullhuman/postcss-purgecss')({
				//https://github.com/FullHuman/purgecss/blob/master/packages/vue-cli-plugin-purgecss/generator/templates/postcss.config.js
				content: [`./src/**/*.vue`],
				whitelist: [
					//FontAwesome
					'fas',
					'far',
					'fab',
					'svg-inline--fa',
					//Bootstrap,
					'show',
					'collapse',
					'collapsing'
				],
				whitelistPatterns: [
					/-(leave|enter|appear)(|-(to|from|active))$/,
					/^(?!(|.*?:)cursor-move).+-move$/,
					/^router-link(|-exact)-active$/,
					/data-v-.*/,
					/^fa-.*/
				],
			})
		]
	};
}

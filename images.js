let backgroundOptions = {
	dir: './content/images/backgrounds/',
	outDir: './generated/backgrounds/',
	sizes: {
		'': {size: 1920, quality: 60},
		'lg': {size: 1200, quality: 65},
		'md': {size: 992, quality: 70},
		'sm': {size: 768, quality: 75},
		'xs': {size: 576, quality: 80},
		'data': {
			size: 1920 / 8,
			quality: {
				webp: 1,
				jpeg: 7
			}
		}
	}
}

let buildOptions = {
	dir: './content/images/locations/',
	outDir: './generated/builds/',
	sizes: {
		'': {size: 1920, quality: 60},
		'thumbnail': {size: 1920 / 3, quality: 50}
	}
}

let avatarOptions = {
	dir: './content/images/avatars/',
	outDir: './generated/avatars/',
	sizes: {'': 192, 'author': 64, 'icon': 32},
	quality: true
}

module.exports = [
	backgroundOptions,
	buildOptions,
	avatarOptions
]
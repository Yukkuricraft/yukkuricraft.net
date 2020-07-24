const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const imageOptions = require('./images')

let work = [];

function processImage(image, globalOptions) {
	let file = path.parse(path.relative(globalOptions.dir, image));
	let outputFile = globalOptions.outDir + file.dir + '/' + file.name;
	fs.mkdirSync(globalOptions.outDir + file.dir, {recursive: true});

	function callIfFunction(val) {
		return typeof val === 'function' ? val(image) : val;
	}

	function getQuality(options) {
		return callIfFunction(options.quality || globalOptions.quality);
	}

	function types(options) {
		let quality = getQuality(options);

		return typeof quality === 'object' ? Object.keys(quality) : [
			quality === true ? 'png' : 'jpeg',
			'webp'
		];
	}

	function base(type, options) {
		let base = sharp(image)
		let quality = getQuality(options);

		if (quality === true) {
			return type === 'webp' ? base.webp({lossless: true}) : base.png();
		} else {
			let imgQuality = callIfFunction(quality[type]) || quality;
			return type === 'webp' ? base.webp({quality: imgQuality}) : base.jpeg({quality: imgQuality});
		}
	}

	if (globalOptions.sizes) {
		return Object
			.entries(globalOptions.sizes)
			.flatMap(([name, options]) => types(options).map(type =>
				base(type, options)
					.resize(callIfFunction(options.size) || options)
					.toFile(outputFile + (name !== '' ? '_' : '') + name + '.' + type)));
	} else {
		return types({}).map(type => base(type, {}).toFile(outputFile + '.' + type))
	}
}

function processFiles(options) {
	fs.mkdirSync(options.outDir, {recursive: true});
	let files = glob.sync(options.pattern || (options.dir + '**/*.png'));

	work.push(...files.flatMap(image => processImage(image, options)));
}

module.exports = function () {
	imageOptions.forEach(processFiles)

	Promise.all(work)
		.then(() => console.log('Image processing done'))
		.catch(err => console.error('Image processing failed: ', err))
}
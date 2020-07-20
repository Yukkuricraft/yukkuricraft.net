const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

let work = [];
let backgroundDir = './content/images/backgrounds/';
let backgroundOutDir = './generated/backgrounds/';

let buildsDir = './content/images/locations/';
let buildsOutDir = './generated/builds/';

let avatarsDir = './content/images/avatars/';
let avatarsOutDir = './generated/avatars/';

function processBackground(image) {
	let file = path.parse(path.relative(backgroundDir, image));
	let outputFile = backgroundOutDir + file.dir + '/' + file.name;
	fs.mkdirSync(buildsOutDir + file.dir, {recursive: true});

	return [
		sharp(image).jpeg({quality: 60}).resize(1920).toFile(outputFile + '.jpeg'),
		sharp(image).webp({quality: 60}).resize(1920).toFile(outputFile + '.webp'),
		sharp(image).jpeg({quality: 65}).resize(1200).toFile(outputFile + '_lg.jpeg'),
		sharp(image).webp({quality: 65}).resize(1200).toFile(outputFile + '_lg.webp'),
		sharp(image).jpeg({quality: 70}).resize(992).toFile(outputFile + '_md.jpeg'),
		sharp(image).webp({quality: 70}).resize(992).toFile(outputFile + '_md.webp'),
		sharp(image).jpeg({quality: 75}).resize(768).toFile(outputFile + '_sm.jpeg'),
		sharp(image).webp({quality: 75}).resize(768).toFile(outputFile + '_sm.webp'),
		sharp(image).jpeg({quality: 80}).resize(576).toFile(outputFile + '_xs.jpeg'),
		sharp(image).webp({quality: 80}).resize(576).toFile(outputFile + '_xs.webp'),
		sharp(image).jpeg({quality: 7}).resize(1920 / 4).blur(2).toFile(outputFile + '_data.jpeg'),
		sharp(image).webp({quality: 1}).resize(1920 / 4).blur(1).toFile(outputFile + '_data.webp'),
	];
}

function processBuild(image) {
	let file = path.parse(path.relative(buildsDir, image));
	let outputFile = buildsOutDir + file.dir + '/' + file.name;
	fs.mkdirSync(buildsOutDir + file.dir, {recursive: true});

	return [
		sharp(image).jpeg({quality: 60}).resize(1920).toFile(outputFile + '.jpeg'),
		sharp(image).webp({quality: 60}).resize(1920).toFile(outputFile + '.webp'),
		sharp(image).jpeg({quality: 50}).resize(1920 / 3).toFile(outputFile + '_thumbnail.jpeg'),
		sharp(image).webp({quality: 50}).resize(1920 / 3).toFile(outputFile + '_thumbnail.webp'),
	];
}

function processAvatar(image) {
	let file = path.parse(path.relative(backgroundDir, image));
	let outputFile = backgroundOutDir + file.dir + '/' + file.name;
	fs.mkdirSync(buildsOutDir + file.dir, {recursive: true});

	return [
		sharp(image).png().resize(192).toFile(outputFile + '.png'),
		sharp(image).webp({lossless: true}).resize(192).toFile(outputFile + '.webp'),
		sharp(image).png().resize(64).toFile(outputFile + '_author.png'),
		sharp(image).webp({lossless: true}).resize(64).toFile(outputFile + '_author.webp'),
		sharp(image).png().resize(32).toFile(outputFile + '_icon.png'),
		sharp(image).webp({lossless: true}).resize(32).toFile(outputFile + '_icon.webp'),
	];
}

function processFiles(processor, outDir, pattern) {
	fs.mkdirSync(outDir, {recursive: true});
	let files = glob.sync(pattern);

	work.push(...files.flatMap(processor));
}

module.exports = function() {
	processFiles(processBackground, backgroundOutDir, backgroundDir + '**/*.png')
	processFiles(processBuild, buildsOutDir, buildsDir + '**/*.png')
	processFiles(processAvatar, avatarsOutDir, avatarsDir + '**/*.png')

	Promise.all(work).then(() => console.log('Image processing done')).catch(err => console.error('Image processing failed: ', err))
}
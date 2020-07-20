const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

let work = [];
let backgroundDir = './content/images/backgrounds/';
let buildsDir = './content/images/locations/';
let backgroundOutDir = './generated/backgrounds/';
let buildsOutDir = './generated/builds/';

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

function processBackgrounds() {
	fs.mkdirSync(backgroundOutDir, {recursive: true});
	let files = glob.sync(backgroundDir + '**/*.png');

	work.push(...files.flatMap(processBackground));
}

function processBuilds() {
	fs.mkdirSync(buildsOutDir, {recursive: true});
	let files = glob.sync(buildsDir + '**/*!(_small).png');

	work.push(...files.flatMap(processBuild));
}

module.exports = function() {
	processBackgrounds();
	processBuilds();

	Promise.all(work).then(() => console.log('Image processing done')).catch(err => console.error('Image processing failed: ', err))
}
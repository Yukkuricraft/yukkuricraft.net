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
		sharp(image).jpeg({quality: 10}).resize(1920 / 4).blur(2).toFile(outputFile + '_small.jpeg'),
		sharp(image).webp({quality: 10}).resize(1920 / 4).blur(1).toFile(outputFile + '_small.webp'),
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
import {isPrerender} from "./prerender";

let addedPreload = [];

let extraLargeSize = window.matchMedia('(min-width: 1200px)');
let largeSize = window.matchMedia('(min-width: 992px)');
let mediumSize = window.matchMedia('(min-width: 768px)');
let smallSize = window.matchMedia('(min-width: 576px)');

function addPreload(href, mimeType, onLoad) {
	if(addedPreload.includes(href)) {
		return;
	}
	addedPreload.push(href);

	let preload = document.createElement('link');
	preload.href = href;
	preload.rel = 'preload';
	preload.as = 'image';
	preload.type = mimeType;
	preload.onload = onLoad;
	document.head.appendChild(preload);
}

export function makeImage(big, bigWebp, small, smallWebp, preload) {
	let res = {
		highRes: big,
		highResWebp: bigWebp,
		lowRes: small,
		lowResWebp: smallWebp,
		loaded: false
	}

	if(preload) {
		//Check explicitly for undefined in case info isn't around yet
		if(typeof Modernizr.webp === 'undefined' || isPrerender) {
			addPreload(bigWebp, 'image/webp');
			addPreload(big, 'image/jpeg');
		}
		else if(Modernizr.webp) {
			addPreload(bigWebp, 'image/webp', () => res.loaded = true);
		}
		else if(!Modernizr.webp) {
			addPreload(big, 'image/jpeg', () => res.loaded = true);
		}
	}

	return res;
}

function getSizeName(name) {
	if(extraLargeSize.matches) {
		return name;
	}
	else if(largeSize.matches) {
		return name + '_lg'
	}
	else if(mediumSize.matches) {
		return name + '_md'
	}
	else if(smallSize.matches) {
		return name + '_sm'
	}
	else {
		return name + '_xs'
	}
}

export function autoImage(name) {
	let sizeName = getSizeName(name);

	return Promise.all([
		import(/* webpackMode: "eager" */ `../generated/backgrounds/${sizeName}.jpeg`),
		import(/* webpackPreload: true */ `!url-loader!../generated/backgrounds/${name}_data.jpeg`),
		import(/* webpackMode: "eager" */ `../generated/backgrounds/${sizeName}.webp`),
		import(/* webpackPreload: true */ `!url-loader!../generated/backgrounds/${name}_data.webp`),
	]).then(([big, small, bigWebp, smallWebp]) => makeImage(big.default, bigWebp.default, small.default, smallWebp.default, true))
}
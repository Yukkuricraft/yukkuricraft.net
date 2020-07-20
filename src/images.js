let addedPreload = [];

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
		if(typeof Modernizr.webp === 'undefined') {
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

export function autoImage(name) {

	return Promise.all([
		import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}.jpeg`),
		import(/* webpackPreload: true */ `!url-loader!../generated/backgrounds/${name}_small.jpeg`),
		import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}.webp`),
		import(/* webpackPreload: true */ `!url-loader!../generated/backgrounds/${name}_small.webp`),
	]).then(([big, small, bigWebp, smallWebp]) => makeImage(big.default, bigWebp.default, small.default, smallWebp.default, true))
}
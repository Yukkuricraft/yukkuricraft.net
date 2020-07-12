export function makeImage(big, bigWebp, small, smallWebp) {
	return {
		highRes: big,
		highResWebp: bigWebp,
		lowRes: small,
		lowResWebp: smallWebp
	}
}

export function autoImage(name) {

	return Promise.all([
		import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}.jpeg`),
		import(/* webpackMode: "eager" */ `!url-loader!../generated/backgrounds/${name}_small.jpeg`),
		import(/* webpackMode: "eager" */ `../generated/backgrounds/${name}.webp`),
		import(/* webpackMode: "eager" */ `!url-loader!../generated/backgrounds/${name}_small.webp`),
	]).then(([big, small, bigWebp, smallWebp]) => makeImage(big.default, bigWebp.default, small.default, smallWebp.default))
}
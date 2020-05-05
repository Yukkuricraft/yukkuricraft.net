export function makeImage(big, bigWebp, small, smallWebp) {
	let type = undefined;
	if (big.endsWith('png')) type = 'image/png';
	else if (big.endsWith('jpg') || big.endsWith('jpeg')) type = 'image/jpeg';

	return {
		highRes: big,
		highResWebp: bigWebp,
		lowRes: small,
		lowResWebp: smallWebp,
		type: type
	}
}
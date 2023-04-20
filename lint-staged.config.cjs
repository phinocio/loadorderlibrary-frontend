module.exports = {
	'src/**/*.{ts,tsx}': [
		() => 'tsc --noEmit',
		'npx eslint --fix',
		'npx prettier --write *.{ts,tsx}',
	],
};

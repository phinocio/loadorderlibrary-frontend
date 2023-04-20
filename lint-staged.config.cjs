module.exports = {
	'*.{ts,tsx}': [() => 'tsc', 'npx eslint .', 'npx prettier --check'],
};

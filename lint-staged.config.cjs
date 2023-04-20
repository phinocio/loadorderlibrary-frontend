module.exports = {
	'*.{ts,tsx}': [() => 'tsc', 'eslint --fix', 'prettier --write'],
};

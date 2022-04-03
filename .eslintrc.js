module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'react-hooks', 'jsx-a11y', '@typescript-eslint', 'prettier', 'effector'],
	rules: {
		'linebreak-style': 0,
		'no-plusplus': 0,
		'no-param-reassign': 2,
		'react/require-default-props': 0,
		'react-hooks/exhaustive-deps': 0,
		'prettier/prettier': 0,
		'arrow-body-style': 0,
		'prefer-arrow-callback': 0,
		camelcase: [1, { ignoreDestructuring: true, ignoreImports: true, ignoreGlobals: true }],
		'react-hooks/rules-of-hooks': 2,
		'react/react-in-jsx-scope': 0,
		'max-len': [1, { code: 100, ignoreUrls: true }],
	},
	ignorePatterns: ['src/**/*.test.ts'],
};

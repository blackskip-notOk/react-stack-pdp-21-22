module.exports = {
	env: {
		browser: true,
		es2021: true,
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
		'prettier',
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
	plugins: [
		'react',
		'react-hooks',
		'jsx-a11y',
		'@typescript-eslint',
		'prettier',
		"effector",
	],
	rules: {
		'prettier/prettier': 0,
		'arrow-body-style': 0,
		'prefer-arrow-callback': 0,
		camelcase: [
			1,
			{ ignoreDestructuring: true, ignoreImports: true, ignoreGlobals: true },
		],
		'react-hooks/rules-of-hooks': 2,
		'react-hooks/exhaustive-deps': 1,
		'react/react-in-jsx-scope': 0,
	},
	ignorePatterns: ['src/**/*.test.ts'],
};

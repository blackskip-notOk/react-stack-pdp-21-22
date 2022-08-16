module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:jest-dom/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['react', 'react-hooks', 'jsx-a11y', 'jest-dom', '@typescript-eslint', 'prettier'],
	rules: {
		'linebreak-style': 0,
		'no-plusplus': 0,
		'react/require-default-props': 0,
		'react-hooks/exhaustive-deps': 0,
		'prettier/prettier': 0,
		'arrow-body-style': 0,
		'prefer-arrow-callback': 0,
		camelcase: [1, {
			ignoreDestructuring: true,
			ignoreImports: true,
			ignoreGlobals: true
		}],
		'react-hooks/rules-of-hooks': 2,
		'react/react-in-jsx-scope': 0,
		'max-len': [1, {
			code: 120,
			ignoreUrls: true
		}],
		'react/prop-types': 0,
		'react/display-name': 0,
		'no-param-reassign': [0, {
			"props": true,
			"ignorePropertyModificationsFor": ['state']
		}],
		"jest-dom/prefer-checked": 2,
		"jest-dom/prefer-enabled-disabled": 2,
		"jest-dom/prefer-required": 2,
		"jest-dom/prefer-to-have-attribute": 2,
	},
	ignorePatterns: ['src/**/*.test.ts'],
};

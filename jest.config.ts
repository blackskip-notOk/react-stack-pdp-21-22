export default {
	displayName: {
		name: 'REACT_APP',
		color: 'magenta',
	},
	roots: ['<rootDir>/src'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{ts, tsx, js,jsx}',
		'!**/node_modules/**',
		'!**/*.config.{ts, js}',
		'!**/*.d.ts',
	],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	coverageDirectory: '<rootDir>/coverage',
	coveragePathIgnorePatterns: ['<rootDir>/.husky/', '<rootDir>/node_modules/'],
	errorOnDeprecated: true,
	moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json', 'node'],
	notify: true,
	notifyMode: 'failure-change',
	bail: true,
};

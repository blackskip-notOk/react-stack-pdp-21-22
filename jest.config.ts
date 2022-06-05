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
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	collectCoverage: false,
	collectCoverageFrom: [
		'!**/*.config.{ts, js}',
		'!**/*.d.ts',
		'!**/src/mocks/**',
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

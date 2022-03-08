export default {
	displayName: {
		name: 'REACT_APP',
		color: 'magenta',
	},
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	collectCoverage: true,
	collectCoverageFrom: ['**/*.{ts, tsx, js,jsx}', '!**/node_modules/**'],
	coverageDirectory: '<rootDir>/coverage',
	coveragePathIgnorePatterns: ['<rootDir>/.husky/', '<rootDir>/node_modules/'],
	errorOnDeprecated: true,
	moduleFileExtensions: ["tsx", "ts", "js", "jsx", "json", "node"],
	notify: true,
	notifyMode: 'failure-change',
};

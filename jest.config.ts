import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  automock: true,
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{test,spec}.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!src/**/*.d.ts',
    '!src/mocks/**',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
  coverageProvider: 'v8',
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover'
  ],
  displayName: {
		name: 'APP',
		color: 'magenta',
	},
  globals: {
    __DEV__: true
  },
  maxConcurrency: 3,
  maxWorkers: '40%',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs', 'cjs'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/mocks/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  modulePaths: ['<rootDir>/src'],
  notify: true,
  notifyMode: 'failure-change',
  reporters: ['default', 'github-actions'],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['./test/setupTests.ts'],
  slowTestThreshold: 5,
  testEnvironment: 'jsdom',
  testMatch: [ "**/?(*.)+(spec|test).[jt]s?(x)"],
  testTimeout: 5000,
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
    '^.+\\.css$': '<rootDir>/test/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/test/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  unmockedModulePathPatterns: [
    "lodash",
    "react",
    "react-dom",
    "react-addons-test-utils"
  ]
};

export default config;
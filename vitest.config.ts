import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/.husky/**',
			'**/.vscode/**',
			'**/coverage/**',
			'**/public/**',
			'**/.{git,cache,output,temp}/**',
		],
        globals: true,
        environment: 'jsdom',
        update: true,
        // root: './src',
        outputTruncateLength: 100,
        watchExclude: ['**/node_modules/**', '**/dist/**'],
        open: true,
        api: true,
        logHeapUsage: true,
        css: false,
		// setupFiles: './src/setupTests.ts',
		coverage: {
			reporter: ['text', 'html'],
			exclude: [
				'node_modules/',
				'src/setupTests.ts',
			  ],
		},
	},
});

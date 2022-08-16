/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [
		react(),
	],
	server: {
		port: 3000,
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
		preprocessorOptions: {
			less: {
				relativeUrls: true,
			},
		},
	},
	resolve: {
		alias: {
			'~': `${path.resolve(__dirname, 'src')}`,
		},
	},
	build: {
		sourcemap: false,
	},
	test: {
		include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
		exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
		css: false,
		globals: true,
		update: true,
		environment: 'jsdom',
		outputTruncateLength: 100,
		open: true,
		passWithNoTests: true,
		logHeapUsage: true,
		coverage: {
			provider: 'c8',
			reporter: ['text', 'json', 'html'],
		}
	},
});

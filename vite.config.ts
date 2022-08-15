
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
	// resolve: {
	// 	alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
	// },
	resolve: {
		alias: {
			'@': `${path.resolve(__dirname, 'src')}/`,
		},
	},
	build: {
		sourcemap: false,
	},
});

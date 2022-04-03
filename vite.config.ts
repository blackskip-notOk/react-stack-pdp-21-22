import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteAliases } from 'vite-aliases';
import * as path from 'path';

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ['effector/babel-plugin'],
				configFile: true,
			},
		}),
		ViteAliases({
			dir: 'src',
			prefix: '@',
			deep: true,
			depth: 1,
			createLog: true,
			logPath: 'src/logs',
			createGlobalAlias: true,
			adjustDuplicates: false,
			useAbsolute: false,
			useIndexes: false,
			useTypescript: true,
			useConfig: false,
			root: process.cwd(),
		}),
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
		alias: { '@': path.resolve(__dirname, 'src') },
	},
});

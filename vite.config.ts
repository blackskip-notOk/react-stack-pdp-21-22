import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteAliases } from 'vite-aliases';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteAliases({
    dir: 'src',
    prefix: '@',
    deep: true,
    depth: 1,
    allowLogging: false,
    allowGlobalAlias: true,
    useConfig: false,
    useRelativePaths: false,
    useTypescript: true,
    root: process.cwd()
  })
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
      }
    }
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  }
})

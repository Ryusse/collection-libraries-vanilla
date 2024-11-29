import path, { resolve } from 'path';

import Inspect from 'vite-plugin-inspect';
// import htmlPurge from 'vite-plugin-purgecss';

import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

import mdCustomPlugin from './vite-plugin-markdown';
import getHtmlEntries from './getHtmlEntries';

export default defineConfig({
  appType: 'mpa',
  plugins: [
    ViteMinifyPlugin({}),
    mdCustomPlugin(),
    Inspect(),
    // htmlPurge({ variables: false }),
  ],
  build: {
    ssr: false,
    modulePreload: true,
    minify: true,
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(),
      output: {
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId;
          if (!facadeModuleId) return 'chunks/[name]-[hash].js';

          const parsedPath = path.parse(facadeModuleId);
          const dirName = parsedPath.dir.split('/').pop();

          return `${dirName}/${parsedPath.name}.js`;
        },
        entryFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId;
          if (!facadeModuleId) return 'scripts/[name]-[hash].js';

          const parsedPath = path.parse(facadeModuleId);
          const originalName = parsedPath.name;
          const dirName = parsedPath.dir.split('/').pop();

          return `${dirName}/${originalName}.js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name ? assetInfo.name : assetInfo.source;
          if (!info) return 'assets/[name]-[hash][extname]';

          const parsedPath = path.parse(info);
          const ext = parsedPath.ext.toLowerCase();

          // Handle CSS files
          if (ext === '.css') {
            const originalName = parsedPath.name;
            const dirPath = assetInfo.originalFileNames?.[0] || '';
            const dirName = path.dirname(dirPath).split('/').pop();

            if (dirName && dirName !== '.') {
              return `${dirName}/${originalName}${ext}`;
            }
            return `styles/${originalName}${ext}`;
          }

          // Handle other assets
          if (/\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i.test(ext)) {
            return `assets/${parsedPath.name}-[hash]${ext}`;
          }

          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});

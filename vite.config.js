import path, { resolve } from "path";

import Inspect from "vite-plugin-inspect";
import htmlPurge from "vite-plugin-purgecss";

import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

import mdCustomPlugin from "./vite-plugin-markdown";
import getHtmlEntries from "./getHtmlEntries";

export default defineConfig({
  appType: "mpa",
  plugins: [ViteMinifyPlugin({}), mdCustomPlugin(), Inspect(), htmlPurge({})],
  build: {
    modulePreload: true,
    minify: true,
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});

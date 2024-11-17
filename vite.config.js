import { defineConfig } from "vite";
import { resolve } from "path";
import path from "path";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import mdCustomPlugin from "./vite-plugin-markdown";

export default defineConfig({
  appType: "mpa",
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
  plugins: [ViteMinifyPlugin({}), mdCustomPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: [
          "mixed-decls",
          "color-functions",
          "global-builtin",
          "import",
        ],
      },
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    modulePreload: false,
    minify: true,
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        //Html
        index: path.resolve(__dirname, "index.html"),
        blog: path.resolve(__dirname, "blog/index.html"),
      },
      output: {
        manualChunks: undefined,
        chunkFileNames: "scripts/[name].js",
        entryFileNames: "scripts/[name].js",
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/css$/.test(extType)) {
            extType = "styles";
          } else if (/png$|jpe?g$|svg$|gif$|tiff$|bmp$|ico$/.test(extType)) {
            extType = "images";
          } else if (/ttf$|woff$|woff2$/.test(extType)) {
            extType = "fonts";
          } else {
            extType = "misc";
          }
          return `${extType}/[name][extname]`;
        },
      },
    },
  },
});

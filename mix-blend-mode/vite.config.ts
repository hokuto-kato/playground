import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";

const root = resolve(__dirname, "src");

export default defineConfig(() => ({
  root,
  base: "./",
  server: {
    open: true,
    host: true,
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    alias: {
      "~": `${__dirname}/src/assets/style/`,
    },
  },
  build: {
    outDir: resolve(__dirname, "../docs/mix-blend-mode/"),
    rollupOptions: {
      output: {
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetsInfo) => {
          if (assetsInfo.name === "style.css") {
            return "assets/style/[name].[ext]";
          }
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetsInfo.name ?? "")) {
            return "images/global/[name].[ext]";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },
}));

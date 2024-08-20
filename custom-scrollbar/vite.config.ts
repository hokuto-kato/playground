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
    outDir: resolve(__dirname, "../docs/custom-scrollbar/"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "js/script.[hash].js",
        chunkFileNames: "js/script.[hash].js",
        assetFileNames: (assetsInfo) => {
          if (/\.css$/.test(assetsInfo.name ?? "")) {
            return "css/style.[hash].[ext]";
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

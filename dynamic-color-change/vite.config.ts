import { defineConfig } from 'vite'

const baseDir = 'dynamic-color-change';

export default defineConfig({
  build: {
    outDir: `../docs/${baseDir}/`,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `${baseDir}/script/script.js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return `${baseDir}/style/style.css`
          }
          return `assets/${baseDir}/[name]-[hash][extname]`
        }
      }
    }
  }
})

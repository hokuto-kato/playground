import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: '../docs/dynamic-color-change/',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'script/script.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style/style.css'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})

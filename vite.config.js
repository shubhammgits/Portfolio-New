import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        gesture: resolve(process.cwd(), 'gesture/index.html')
      }
    }
  },
  server: {
    open: true
  }
})

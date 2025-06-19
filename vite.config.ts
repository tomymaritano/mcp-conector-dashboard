import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    electron({
      // @ts-expect-error: type mismatch workaround
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            outDir: 'dist-electron',
            rollupOptions: {
              output: {
                entryFileNames: 'main.js'
              },
              external: ['electron']
            }
          }
        }
      },
      preload: {
        input: 'electron/preload.ts',
        vite: {
          build: {
            outDir: 'dist-electron',
            rollupOptions: {
              output: {
                entryFileNames: 'preload.mjs'
              }
            }
          }
        }
      }
    })
  ],
  build: {
    outDir: 'dist'
  }
})
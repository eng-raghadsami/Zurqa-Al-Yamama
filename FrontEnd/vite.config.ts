import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@website': path.resolve(__dirname, './src/website'),
      '@admin': path.resolve(__dirname, './src/admin'),
    },
  },
})

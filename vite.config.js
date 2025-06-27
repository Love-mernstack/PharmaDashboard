import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Only if you're using JS project (not TS)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

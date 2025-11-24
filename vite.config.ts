import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: 'localhost',
    port: 3002,
    open: true,
    strictPort: true,
    watch: {
      usePolling: false,
    },
    hmr: {
      overlay: true,
    },
  },
})


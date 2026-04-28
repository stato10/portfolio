import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  server: {
    port: 3000,
    // App uses basename `/portfolio` — open this URL or assets and routes break
    open: '/portfolio/',
  }
})



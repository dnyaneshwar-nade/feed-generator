import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['.ngrok-free.app'],
    host: '0.0.0.0',  // Allows access from any IP
    port: 5173,  // Use your Vite port
    strictPort: true
  },
  plugins: [react()],
})

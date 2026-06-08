import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      // Prevent clickjacking by forbidding framing
      'X-Frame-Options': 'DENY',
      // Prevent MIME-sniffing
      'X-Content-Type-Options': 'nosniff',
      // Control referrer information
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
})

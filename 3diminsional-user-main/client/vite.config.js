import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const port = 8080;

export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: port,
    strictPort: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
    port: port,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080',
  },
});
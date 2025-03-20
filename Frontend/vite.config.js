import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true
    },
    proxy: {
      '/api': {
        target: 'http://backend:4000',
        changeOrigin: true
      },
      '/CrearNomina': {
        target: 'http://backend:4000',
        changeOrigin: true
      }
    }
  }
});

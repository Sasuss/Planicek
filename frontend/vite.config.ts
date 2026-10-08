import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import {VitePWA} from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
//https://medium.com/@dlrnjstjs/building-a-react-pwa-creating-a-web-app-that-feels-native-57bd21ec03e5
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',  // Automatically update Service Worker
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  // Files to cache
      manifest: {
        name: 'Planicek PWA',  // Full app name
        short_name: 'Planicek',  // Short name displayed on home screen
        description: 'Maturitní projekt',
        theme_color: '#ffffff',  // Color of the top bar
        background_color: '#ffffff',  // Splash screen background color
        display: 'standalone',  // Makes it look like a native app (hides browser UI)
      }
    }), tailwindcss(),
  ],
  server: {
    proxy: { "/api": "http://localhost:8000"}
  }
})

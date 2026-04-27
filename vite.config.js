
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: process.cwd(),
  base: "/",
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'android-chrome-192x192.png'],
      manifest: {
        name: 'AIA Website',
        short_name: 'AIA',
        description: 'AIA Website with offline capabilities',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/aia\.in\.net\/webapi\/public\/assets\/images\/web_images\/banner_images\/.*\.webp$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'remote-banner-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/aia\.in\.net\/webapi\/public\/api\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 Hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
        ],
      },
    }),

    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),

    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Core React and Routing
            if (
              id.includes("/node_modules/react/") ||
              id.includes("/node_modules/react-dom/") ||
              id.includes("/node_modules/react-router-dom/") ||
              id.includes("/node_modules/scheduler/")
            ) {
              return "react-vendor";
            }

            // Data Fetching
            if (id.includes("axios") || id.includes("@tanstack/react-query")) {
              return "data-vendor";
            }
            
            // Group heavy UI/Animation libs
            if (id.includes("framer-motion") || id.includes("lucide-react") || id.includes("react-icons") || id.includes("vaul")) {
              return "ui-vendor";
            }

            // Maps are heavy and specific to certain routes
            if (id.includes("leaflet") || id.includes("react-leaflet")) {
              return "map-vendor";
            }

            // Carousels are also route-specific
            if (id.includes("swiper") || id.includes("embla-carousel")) {
              return "carousel-vendor";
            }

            // Everything else into a generic vendor chunk
            return "vendor";
          }
        },
      },
    },
  },
});

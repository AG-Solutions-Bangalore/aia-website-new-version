/**
 * @file vite.config.ts
 * @description Enterprise Vite configuration with build-time static pre-rendering (SSG),
 * Tailwind v4, PWA support, Gzip/Brotli asset compression, and React 18/19 scheduler unblock fix.
 *
 * @why
 * Vite builds client-side SPAs by default, which renders an empty `<div id="root"></div>` to
 * search engine crawlers before JavaScript evaluates. This configuration embeds `vitePrerenderPlugin`
 * to execute `src/prerender.tsx` during `vite build`, baking pre-rendered HTML and the canonical
 * `@graph` JSON-LD schema into flat static files for every route.
 *
 * @what
 * - Applies critical `MessagePort.prototype.onmessage` event-loop unblock patch for React scheduler.
 * - Injects `vitePrerenderPlugin` configured with `src/prerender.tsx` and renderTarget `#root`.
 * - Configures path alias `@` -> `./src`.
 * - Configures code-splitting and vendor manualChunks to isolate heavy packages (maps, carousels, flipbook).
 * - Integrates PWA service worker caching and Gzip/Brotli compression.
 *
 * @responsibility
 * Orchestrating the client build and SSG pre-rendering pipeline in a single deterministic command.
 *
 * @dependencies
 * - vite: Core build tool & bundler
 * - @vitejs/plugin-react: React JSX fast refresh & compilation
 * - @tailwindcss/vite: Tailwind CSS v4 Vite integration
 * - vite-prerender-plugin: Static pre-rendering (SSG) engine
 * - vite-plugin-pwa: Progressive Web App manifest and Workbox service worker
 * - vite-plugin-compression: Gzip & Brotli pre-compression for production hosting
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

// ============================================================================
// CRITICAL EVENT-LOOP UNBLOCK FIX: React 18/19 browser scheduler keeps a Node
// MessagePort alive, preventing the Vite build process from exiting after SSG.
// ============================================================================
if (typeof MessagePort !== 'undefined') {
  const originalOnMessageDesc = Object.getOwnPropertyDescriptor(MessagePort.prototype, 'onmessage');
  if (originalOnMessageDesc && originalOnMessageDesc.set) {
    Object.defineProperty(MessagePort.prototype, 'onmessage', {
      set(handler) {
        originalOnMessageDesc.set!.call(this, handler);
        if (typeof (this as any).unref === 'function') {
          (this as any).unref();
        }
      },
      get() {
        return originalOnMessageDesc.get?.call(this);
      },
      configurable: true,
      enumerable: true,
    });
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compressionFilter = /\.(js|mjs|json|css|svg|webmanifest)$/i;

export default defineConfig({
  root: process.cwd(),
  server: {
    allowedHosts: ['.ngrok-free.app'],
  },
  base: '/',
  plugins: [
    tailwindcss(),
    react(),
    vitePrerenderPlugin({
      prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
      renderTarget: '#root',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
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
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
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
      algorithm: 'gzip',
      ext: '.gz',
      filter: compressionFilter,
    }),

    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      filter: compressionFilter,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'chrome61',
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            // Core React and Routing
            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/react-router-dom/') ||
              id.includes('/node_modules/scheduler/')
            ) {
              return 'react-vendor';
            }

            // Data Fetching
            if (id.includes('axios') || id.includes('@tanstack/react-query')) {
              return 'data-vendor';
            }

            // Maps are heavy and specific to certain routes
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'map-vendor';
            }

            // Carousels are also route-specific
            if (id.includes('swiper') || id.includes('embla-carousel')) {
              return 'carousel-vendor';
            }

            // Flipbook engine — only used on the /aia-times/flip-book route
            if (
              id.includes('/node_modules/react-pageflip/') ||
              id.includes('/node_modules/page-flip/')
            ) {
              return 'flipbook-vendor';
            }
          }
        },
      },
    },
  },
});

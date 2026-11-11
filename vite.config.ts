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

import fs from 'fs';
import type { IncomingMessage, ServerResponse } from 'http';
import { defineConfig, type Plugin } from 'vite';
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

/**
 * Serves /sitemap.xml in `vite dev` and `vite preview` without Apache/.htaccess.
 * Mirrors production: /sitemap.xml/ 301-redirects to /sitemap.xml, and the XML is
 * proxied from the live CRM sitemap (with public/sitemap.xml as offline fallback).
 */
function devSitemapPlugin(): Plugin {
  const sitemapPath = '/sitemap.xml';
  const remoteSitemapUrl = 'https://aia.in.net/webapi/public/sitemap.xml';
  const localSitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
  const cacheTtlMs = 5 * 60 * 1000;
  let cachedXml = '';
  let cachedAt = 0;

  const loadSitemapXml = async (): Promise<string> => {
    if (cachedXml && Date.now() - cachedAt < cacheTtlMs) return cachedXml;
    try {
      const response = await fetch(remoteSitemapUrl, {
        headers: { Accept: 'application/xml,text/xml,*/*' },
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      const xml = (await response.text()).trim();
      if (!xml.includes('<urlset')) throw new Error('Invalid sitemap payload');
      cachedXml = xml;
      cachedAt = Date.now();
      return xml;
    } catch (error) {
      if (fs.existsSync(localSitemapPath)) {
        return fs.readFileSync(localSitemapPath, 'utf8').trim();
      }
      throw error;
    }
  };

  const middleware = (
    req: IncomingMessage,
    res: ServerResponse,
    next: (err?: unknown) => void,
  ): void => {
    const pathname = (req.url ?? '').split('?')[0].toLowerCase();
    if (pathname === `${sitemapPath}/`) {
      res.statusCode = 301;
      res.setHeader('Location', sitemapPath);
      res.end();
      return;
    }
    if (pathname !== sitemapPath) {
      next();
      return;
    }
    void loadSitemapXml().then(
      (xml) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.end(req.method === 'HEAD' ? undefined : xml);
      },
      (error) => next(error),
    );
  };

  return {
    name: 'dev-sitemap',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}


export default defineConfig({
  root: process.cwd(),
  server: {
    allowedHosts: ['.ngrok-free.app'],
  },
  base: '/',
  plugins: [
    devSitemapPlugin(),
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
    target: 'baseline-widely-available',
    chunkSizeWarningLimit: 1000,
    modulePreload: { polyfill: false },

    rolldownOptions: {
      output: {
        codeSplitting: {
          // `includeDependenciesRecursively` defaults to true, which made the Swiper group
          // capture React as a dependency. React then lived in `carousel-vendor`, forcing
          // the entry to import Swiper and preload ~40KB of unused JS on first load.
          includeDependenciesRecursively: false,
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: 'data-vendor',
              test: /node_modules[\\/](axios|@tanstack)[\\/]/,
              priority: 20,
            },
            {
              name: 'map-vendor',
              test: /node_modules[\\/](leaflet|react-leaflet)[\\/]/,
              priority: 20,
            },
            {
              name: 'carousel-vendor',
              test: /node_modules[\\/](swiper|embla-carousel)/,
              priority: 10,
            },
            {
              name: 'flipbook-vendor',
              test: /node_modules[\\/](react-pageflip|page-flip)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});

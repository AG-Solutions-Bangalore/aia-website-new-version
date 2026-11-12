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
 * Serves /sitemap.xml in `vite dev` and `vite preview` purely from the live CRM API.
 * Uses `https://aia.in.net/webapi/public/api/getSitemap` as the single source of truth.
 * No custom aliases, no modifications, strictly matching live API data.
 */
function devSitemapPlugin(): Plugin {
  const sitemapPath = '/sitemap.xml';
  const apiUrl = 'https://aia.in.net/webapi/public/api/getSitemap';
  const cacheTtlMs = 60 * 1000;
  let cachedXml = '';
  let cachedAt = 0;

  interface ApiPageItem {
    page_two_url?: string | null;
    page_two_priority?: string | null;
    page_two_status?: string | null;
    updated_at?: string | null;
  }

  const loadSitemapXml = async (): Promise<string> => {
    if (cachedXml && Date.now() - cachedAt < cacheTtlMs) return cachedXml;
    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      const json = (await response.json()) as {
        data?: ApiPageItem[];
        blog?: ApiPageItem[];
      };

      const urls: Array<{ loc: string; lastmod: string; priority: string }> = [];
      urls.push({
        loc: 'https://aia.in.net/',
        lastmod: '2026-03-09',
        priority: '1.00',
      });

      for (const page of json.data || []) {
        if ((page.page_two_status || '').trim().toLowerCase() !== 'active') continue;
        const url = (page.page_two_url || '').trim().replace(/^\/+/, '');
        if (!url) continue;
        urls.push({
          loc: `https://aia.in.net/${url}`,
          lastmod: page.updated_at ? page.updated_at.split('T')[0] : '',
          priority: page.page_two_priority || '0.80',
        });
      }

      for (const blog of json.blog || []) {
        if ((blog.page_two_status || '').trim().toLowerCase() !== 'active') continue;
        const url = (blog.page_two_url || '').trim().replace(/^\/+/, '');
        if (!url) continue;
        urls.push({
          loc: `https://aia.in.net/blogs/${url}`,
          lastmod: blog.updated_at ? blog.updated_at.split('T')[0] : '',
          priority: blog.page_two_priority || '0.80',
        });
      }

      const entries = urls
        .map(
          (u) =>
            `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n    <priority>${u.priority}</priority>\n  </url>`,
        )
        .join('\n');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
      cachedXml = xml;
      cachedAt = Date.now();
      return xml;
    } catch (error) {
      if (cachedXml) return cachedXml;
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
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.error'],
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
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

/**
 * @file src/main.tsx
 * @description Client-side application entry point with hydration-safe mounting,
 * HelmetProvider context, client routing, and accessibility title observers.
 *
 * @why
 * In an SSG architecture, the root container (`#root`) already contains pre-rendered DOM
 * nodes rendered at build time by Vite. Calling `createRoot` directly would blow away the
 * server-rendered DOM and cause layout shift or hydration flicker. Instead, this entry point
 * inspects `rootElement.hasChildNodes()` and calls `hydrateRoot` to attach event listeners seamlessly.
 *
 * @what
 * - Wraps `<App />` in `<React.StrictMode>`, `<HelmetProvider>`, and `<BrowserRouter>`.
 * - Hydrates via `ReactDOM.hydrateRoot` if `#root` contains pre-rendered HTML.
 * - Falls back to `ReactDOM.createRoot` if running in an empty client context.
 * - Initializes `initSeoTitles()` for image and anchor tag accessibility title attributes.
 *
 * @responsibility
 * Client-side DOM mounting and root provider initialization.
 *
 * @dependencies
 * - react: Core React UI library
 * - react-dom/client: React 18 client root and hydration APIs (`createRoot`, `hydrateRoot`)
 * - react-router-dom: Client-side routing provider (`BrowserRouter`)
 * - react-helmet-async: Thread-safe client `<head>` state management
 * - ./App: Main application component
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, hydrate } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const ssgState = (window as unknown as { __REACT_QUERY_STATE__?: unknown })
  .__REACT_QUERY_STATE__;

if (ssgState) {
  hydrate(queryClient, ssgState as Parameters<typeof hydrate>[1]);
}

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App queryClient={queryClient} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app);
  } else {
    ReactDOM.createRoot(rootElement).render(app);
  }
}

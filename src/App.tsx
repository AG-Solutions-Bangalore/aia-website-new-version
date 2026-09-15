/**
 * @file src/App.tsx
 * @description Main application shell component hosting deferred interactive widgets,
 * scroll restoration, and routing via `AppRoutes`.
 *
 * @why
 * Separating non-critical client widgets (Google Analytics, notification modals, floating contact buttons, toasts)
 * from core routing allows the initial page load and static pre-rendering to remain lightweight, fast,
 * and completely free of third-party script hydration bottlenecks.
 *
 * @what
 * - Loads deferred widgets asynchronously via `scheduleIdle` after the main UI settles.
 * - Renders `<ScrollToTop />` for seamless route transitions.
 * - Mounts `<AppRoutes />` containing all route definitions and SEO page layout wrappers.
 *
 * @responsibility
 * Application layout orchestrator for global client widgets and route tree mounting.
 *
 * @dependencies
 * - react: Component hooks (`lazy`, `Suspense`, `useEffect`, `useState`)
 * - react-router-dom: `useLocation` hook
 * - ./routes/AppRoutes: Modular application route tree with SEO wrappers
 * - ./components/common/scroll-to-top: Window scroll reset utility
 * - ./lib/prerender: Browser idle scheduling (`scheduleIdle`)
 */

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/common/scroll-to-top';
import AppRoutes from './routes/AppRoutes';
import { scheduleIdle } from './lib/prerender';

const NotificationPopup = lazy(
  () => import('./components/notification/notification-popup'),
);
const GoogleAnalytics = lazy(
  () => import('./components/google-analytics/google-analytics'),
);
const FloatingContact = lazy(
  () => import('./components/common/floating-contact'),
);
const LazyToaster = lazy(() =>
  import('sonner').then((module) => ({ default: module.Toaster })),
);

export default function App(): React.JSX.Element {
  const location = useLocation();
  const [loadDeferredWidgets, setLoadDeferredWidgets] = useState<boolean>(false);

  useEffect(() => {
    const load = () => setLoadDeferredWidgets(true);
    return scheduleIdle(load, { delay: 12000, timeout: 2000 });
  }, []);

  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col relative">
      <ScrollToTop />
      {loadDeferredWidgets && (
        <Suspense fallback={null}>
          <GoogleAnalytics />
          {!location.pathname.startsWith('/blogs/') && <NotificationPopup />}
          <FloatingContact />
          <LazyToaster position="top-right" richColors />
        </Suspense>
      )}

      <AppRoutes />
    </div>
  );
}

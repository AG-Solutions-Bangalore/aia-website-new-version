/**
 * ============================================================================
 * @file src/lib/query-provider.tsx
 * ============================================================================
 * 
 * WHY:
 * React components throughout the application fetch remote data (blogs, reviews,
 * course details). React Query provides client-side caching, background refetching,
 * and request deduplication.
 * 
 * WHAT:
 * Wraps children in `@tanstack/react-query`'s `QueryClientProvider` initialized
 * via `useState` to guarantee instance isolation during client navigation.
 * 
 * RESPONSIBILITY:
 * - Initialize and provide a unified `QueryClient` for all downstream hooks.
 * 
 * DEPENDENCIES:
 * - @tanstack/react-query: TanStack Query v5 core
 * - react: React context provider
 * ============================================================================
 */

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface AppQueryProviderProps {
  children: React.ReactNode;
}

export default function AppQueryProvider({ children }: AppQueryProviderProps): React.JSX.Element {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

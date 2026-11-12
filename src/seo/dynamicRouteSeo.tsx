import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@/api/base-url';
import {
  buildDynamicBlogSeo,
  buildDynamicStudentStorySeo,
  type MasterSeoStructure,
} from './engine';

const BLOG_DETAILS_QUERY = (slug: string) => ['blog-details', slug] as const;
const STORY_QUERY = (slug: string) => ['passout-stories-slug', slug] as const;

function normalizePath(pathname: string): string {
  const path = pathname.split('?')[0].split('#')[0];
  return path.replace(/\/+$/, '') || '/';
}

function getBlogSlug(pathname: string): string | null {
  const match = normalizePath(pathname).match(/^\/blogs\/([^/]+)$/);
  return match && match[1] !== 'course' ? match[1] : null;
}

function getStorySlug(pathname: string): string | null {
  return normalizePath(pathname).match(/^\/passout-stories\/([^/]+)$/)?.[1] || null;
}

/**
 * Resolves dynamic page SEO from the shared React Query cache.
 *
 * Page components already use these query keys for their visible content, so
 * React Query deduplicates requests while this central boundary observes the
 * same data and updates metadata when it becomes available.
 */
export function useDynamicRouteSeo(
  pathname: string,
  fallback: MasterSeoStructure,
): MasterSeoStructure {
  const blogSlug = getBlogSlug(pathname);
  const storySlug = getStorySlug(pathname);
  const isBrowser = typeof window !== 'undefined';

  const blogQuery = useQuery({
    queryKey: BLOG_DETAILS_QUERY(blogSlug || ''),
    queryFn: async () =>
      (await axios.get(`${BASE_URL}/api/getBlogbySlug/${blogSlug}`)).data,
    enabled: isBrowser && Boolean(blogSlug),
    retry: false,
  });

  const storyQuery = useQuery({
    queryKey: STORY_QUERY(storySlug || ''),
    queryFn: async () =>
      (await axios.get(`${BASE_URL}/api/getStudentsStorybySlug/${storySlug}`)).data,
    enabled: isBrowser && Boolean(storySlug),
    retry: false,
  });

  return useMemo(() => {
    if (blogSlug && blogQuery.data?.data) {
      return buildDynamicBlogSeo(
        blogQuery.data.data,
        blogQuery.data.faq || [],
        normalizePath(pathname),
      );
    }

    if (storySlug && storyQuery.data?.data) {
      return buildDynamicStudentStorySeo(
        storyQuery.data.data,
        normalizePath(pathname),
      );
    }

    return fallback;
  }, [blogQuery.data, blogSlug, fallback, pathname, storyQuery.data, storySlug]);
}

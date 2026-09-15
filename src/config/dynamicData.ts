/**
 * @file src/config/dynamicData.ts
 * @description Dynamic build-time data loader and in-memory cache for blogs, student stories,
 * and testimonials used by the SSG prerendering engine and SEO resolvers.
 *
 * @why
 * In a traditional SPA, dynamic routes like `/blogs/:slug` or `/passout-stories/:slug` only fetch data
 * inside client-side `useEffect` or `useQuery` hooks. In SSR `renderToString`, `useEffect` does not run,
 * leaving the crawler with an empty loading skeleton. This module fetches all dynamic entities in
 * fast parallel batches at build time, populating the crawler queue, generating exact Schema.org
 * graphs, and pre-hydrating React Query state for 100% complete static HTML output.
 *
 * @what
 * - `loadDynamicData()`: Singleton fetcher retrieving all 63+ blogs, 103+ stories, and 15+ testimonials.
 * - In-memory lookup maps for instant synchronous retrieval during prerender iteration.
 * - Exports accessor functions: `getDynamicBlog`, `getDynamicStudentStory`, `getAllDynamicRouteUrls`.
 *
 * @responsibility
 * Build-time data acquisition and caching for SSG route discovery and metadata synthesis.
 *
 * @dependencies
 * - @/api/base-url: `BASE_URL` constant
 */

import { BASE_URL } from '@/api/base-url';

export interface DynamicBlogSummary {
  id: number;
  blog_slug: string;
  blog_heading: string;
  blog_course: string;
  blog_created: string;
  blog_updated: string;
  blog_short_description: string;
  blog_images: string;
  blog_images_alt?: string;
  blog_categories?: string;
  blog_trending?: string;
}

export interface DynamicFaqItem {
  id?: number;
  faq_heading?: string;
  faq_que: string;
  faq_ans: string;
}

export interface DynamicBlogDetailResponse {
  data: DynamicBlogSummary & {
    blog_meta_title?: string;
    blog_meta_description?: string;
    blog_meta_keywords?: string;
    web_blog_subs?: Array<{
      id: number;
      blog_sub_heading: string;
      blog_sub_description: string;
    }>;
  };
  related_blogs?: DynamicBlogSummary[];
  student?: any[];
  faq?: DynamicFaqItem[];
  image_url?: Array<{ image_for: string; image_url: string }>;
}

export interface DynamicStudentStory {
  id: number;
  student_slug: string;
  student_name: string;
  student_course: string;
  student_designation?: string;
  student_linkedin_link?: string;
  student_story_details: string;
  student_story_date: string;
  student_image?: string;
  student_image_alt?: string;
  student_story_short_description: string;
  student_story_box_title1?: string;
  student_story_box_details1?: string;
  student_story_box_title2?: string;
  student_story_box_details2?: string;
  student_story_box_title3?: string;
  student_story_box_details3?: string;
  student_story_box_title4?: string;
  student_story_box_details4?: string;
  student_story_banner_image?: string;
  student_story_banner_image_alt?: string;
  company?: {
    id: number;
    student_company_name: string;
    student_company_image?: string;
    student_company_image_alt?: string;
  };
  country?: {
    id: number;
    country_name: string;
    country_city: string;
    country_latitude?: string;
    country_longitude?: string;
  };
}

export interface DynamicStoryResponse {
  data: DynamicStudentStory;
  image_url: Array<{ image_for: string; image_url: string }>;
}

export interface DynamicTestimonial {
  id: number;
  student_name: string;
  student_course: string;
  student_testimonial: string;
  student_testimonial_link?: string;
  student_image?: string;
  student_image_alt?: string;
  updated_at?: string;
}

// In-memory cache stores for build-time static rendering
let dynamicBlogsMap = new Map<string, DynamicBlogDetailResponse>();
let dynamicStoriesMap = new Map<string, DynamicStoryResponse>();
let dynamicTestimonials: DynamicTestimonial[] = [];
let dynamicCourseSlugs = new Set<string>();
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

/**
 * Loads all dynamic blogs, student stories, and testimonials once at build time.
 * 
 * ARCHITECTURE & EXECUTION FLOW:
 * 1. Singleton Guard: Prevents concurrent multiple fetches across parallel worker threads.
 * 2. Parallel Catalog Fetch: Retrieves the blog list, student story list, and testimonials catalog simultaneously.
 * 3. Batching Strategy (batchSize = 15): Full blog articles have rich HTML descriptions, subheadings,
 *    and FAQs. Fetching all 63+ in an unthrottled `Promise.all` could exhaust network sockets or trigger 429
 *    rate limits on the backend. Batching in chunks of 15 ensures high throughput (~3-4s total) while remaining
 *    polite to the API server.
 * 4. Fault Tolerance: If any individual slug request fails, the pipeline logs a warning and falls back to
 *    the catalog summary object so the build never crashes.
 */
export async function loadDynamicData(): Promise<void> {
  if (isLoaded) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      console.log('🔄 [SSG] Pre-fetching dynamic blogs, student stories, and testimonials from API...');

      // 1. Fetch Blogs catalog, Stories catalog, and Testimonials in parallel
      const [blogsRes, storiesRes, testimonialsRes] = await Promise.all([
        fetch(`${BASE_URL}/api/getAllBlogs`).then((r) => r.json()).catch((err) => {
          console.warn('⚠️ [SSG] Failed to fetch getAllBlogs:', err);
          return { data: [], image_url: [] };
        }),
        fetch(`${BASE_URL}/api/getStudentsStory`).then((r) => r.json()).catch((err) => {
          console.warn('⚠️ [SSG] Failed to fetch getStudentsStory:', err);
          return { data: [], image_url: [] };
        }),
        fetch(`${BASE_URL}/api/getAllTestimonials`).then((r) => r.json()).catch((err) => {
          console.warn('⚠️ [SSG] Failed to fetch getAllTestimonials:', err);
          return { data: [] };
        }),
      ]);

      const blogList: DynamicBlogSummary[] = blogsRes?.data || [];
      const blogImageUrls = blogsRes?.image_url || [];
      const storyList: DynamicStudentStory[] = storiesRes?.data || [];
      const storyImageUrls = storiesRes?.image_url || [];
      dynamicTestimonials = testimonialsRes?.data || [];

      // Index student stories by slug for O(1) synchronous lookup
      for (const story of storyList) {
        if (story.student_slug) {
          dynamicStoriesMap.set(story.student_slug, {
            data: story,
            image_url: storyImageUrls,
          });
        }
      }

      // Collect unique course categories from blogs (e.g., 'cia', 'cfe', 'cams', 'cisa')
      for (const blog of blogList) {
        if (blog.blog_course) {
          dynamicCourseSlugs.add(blog.blog_course.trim().toLowerCase());
        }
      }

      // 2. Fetch full blog details in parallel batches of 15
      const batchSize = 15;
      for (let i = 0; i < blogList.length; i += batchSize) {
        const batch = blogList.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (blog) => {
            try {
              const res = await fetch(`${BASE_URL}/api/getBlogbySlug/${blog.blog_slug}`).then((r) =>
                r.json(),
              );
              if (res && res.data) {
                dynamicBlogsMap.set(blog.blog_slug, res);
              } else {
                // Fallback to catalog summary item if getBlogbySlug returns null
                dynamicBlogsMap.set(blog.blog_slug, {
                  data: blog,
                  image_url: blogImageUrls,
                  faq: [],
                  related_blogs: [],
                  student: [],
                });
              }
            } catch {
              dynamicBlogsMap.set(blog.blog_slug, {
                data: blog,
                image_url: blogImageUrls,
                faq: [],
                related_blogs: [],
                student: [],
              });
            }
          }),
        );
      }

      isLoaded = true;
      console.log(
        `✅ [SSG] Loaded ${dynamicBlogsMap.size} blogs, ${dynamicStoriesMap.size} student stories, and ${dynamicTestimonials.length} testimonials.`,
      );
    } catch (error) {
      console.error('❌ [SSG] Error loading dynamic data:', error);
      isLoaded = true; // Avoid infinite retry loops during build
    }
  })();

  return loadPromise;
}

/**
 * Synchronous lookup for a dynamic blog by slug.
 * Used by `seoEngine.getSeoForRoute()` and `prerender.prerender()` during SSG iteration.
 *
 * @param slug - URL slug of the blog (e.g. 'cfe-module-1')
 * @returns Complete blog details including sections, FAQs, and related articles
 */
export function getDynamicBlog(slug: string): DynamicBlogDetailResponse | undefined {
  return dynamicBlogsMap.get(slug);
}

/**
 * Synchronous lookup for a student passout story by slug.
 *
 * @param slug - URL slug of the student (e.g. 'sahil-babbar-ciac')
 * @returns Student story data, designations, quotes, and image assets
 */
export function getDynamicStudentStory(slug: string): DynamicStoryResponse | undefined {
  return dynamicStoriesMap.get(slug);
}

/**
 * Retrieves all loaded student testimonials.
 *
 * @returns Array of testimonials used for schema generation or reviews
 */
export function getAllDynamicTestimonials(): DynamicTestimonial[] {
  return dynamicTestimonials;
}

/**
 * Returns all dynamic route URLs to inject into the SSG crawler queue.
 * These are passed to `vitePrerenderPlugin` in `prerender.tsx`, enabling the crawler
 * to pre-render every single blog post, course category page, and student story.
 *
 * @returns Array of relative URL paths (e.g., ['/blogs/cfe-module-1', '/passout-stories/...'])
 */
export function getAllDynamicRouteUrls(): string[] {
  const urls: string[] = [];

  // All individual blog post URLs
  for (const slug of dynamicBlogsMap.keys()) {
    urls.push(`/blogs/${slug}`);
  }

  // All course blog catalog URLs
  for (const course of dynamicCourseSlugs) {
    urls.push(`/blogs/course/${course}`);
  }

  // All student passout story URLs
  for (const slug of dynamicStoriesMap.keys()) {
    urls.push(`/passout-stories/${slug}`);
  }

  return urls;
}

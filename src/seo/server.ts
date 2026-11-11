/**
 * Server/build-time SEO boundary.
 *
 * This entry deliberately excludes React components and browser hooks so the
 * Vite prerender worker receives only deterministic metadata, schemas, route
 * policy, and dynamic build data.
 */
export * from './site';
export * from './engine';
export * from './dynamicData';
export * from './headingExpectations';
export * from './config/route-path';
export {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  createProductSchema,
  createSoftwareAppSchema,
  createCourseSchema,
  createCompositeGraph,
  createWebPageSchema,
  createBreadcrumbSchema,
  formatIsoDateWithTimezone,
  createBlogPostingSchema,
  createFaqSchema,
  createStudentReviewSchema,
} from './schema';

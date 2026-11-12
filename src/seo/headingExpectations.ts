export type RouteHeadingExpectation = Readonly<{
  h1: string;
}>;

/**
 * Heading requirements supplied for the home page and five course pages.
 * These are intentionally kept separate from rendered page components so the
 * route-level SEO audit can catch accidental heading edits during builds.
 */
export const INDEXABLE_HEADING_EXPECTATIONS: Readonly<
  Record<string, RouteHeadingExpectation>
> = {
  "/": {
    h1: "Training Institute for Global Certification - CFE, CIA, CAMS & CISA",
  },
  "/cfe-curriculum": {
    h1: "2026 CFE Preparation That Builds Real Fraud Examiner Expertise in You",
  },
  "/cia-curriculum": {
    h1: "Join the AIA Prep Course and Get 100% Success in the CIA Exam",
  },
  "/cia-challenge-curriculum": {
    h1: "Prepare Confidently for the CIA Challenge Exam with AIA's Expert-Led Training",
  },
  "/cams": {
    h1: "Join AIA's CAMS Prep Course and Crack Your CAMS Exam on Your 1st Attempt",
  },
  "/cisa": {
    h1: "Become a CISA (Certified Information Systems Auditor) with AIA's Expert-Led Training.",
  },
};

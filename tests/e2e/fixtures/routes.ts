/**
 * Shared E2E route definitions — single source of truth.
 * Keeps smoke, a11y, and other E2E suites in sync.
 */

/** All content routes that render a full page (exclude redirect stubs). */
export const CONTENT_ROUTES = [
  '/',
  '/about',
  '/apps',
  '/apps/exam-countdown',
  '/apps/gpa-calculator',
  '/apps/grade-calculator',
  '/apps/office-hours',
  '/apps/seat-planner',
  '/blog',
  '/blog/welcome',
  '/contact',
  '/cv',
  '/publications',
  '/research',
  '/talks',
  '/teaching',
  '/teaching/bracu',
  '/teaching/iub',
] as const;

/** All routes that should pass WCAG 2.x AA accessibility audit. */
export const A11Y_ROUTES = CONTENT_ROUTES;

/** Redirect-only pages that should forward to another route. */
export const REDIRECT_ROUTES = [
  { from: '/experience', to: '/about' },
  { from: '/service', to: '/about' },
  { from: '/service-awards', to: '/about' },
] as const;

/** All available themes for contrast testing. */
export const THEMES = [
  'light',
  'dark',
  'ocean',
  'forest',
  'lavender',
  'slate',
] as const;

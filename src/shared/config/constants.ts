/**
 * UI Display Constants
 */

/**
 * Maximum number of items to display in various contexts
 */
export const DISPLAY_LIMITS = {
  /** Maximum feedback items to show in course cards */
  COURSE_FEEDBACK: 2,

  /** Maximum description points to show in experience cards (compact view) */
  EXPERIENCE_DESCRIPTION: 2,

  /** Maximum tags to show in experience cards */
  EXPERIENCE_TAGS: 4,

  /** Maximum recent items to show on homepage */
  HOMEPAGE_RECENT: 3,

  /** Maximum years to display in academic search year filter */
  ACADEMIC_SEARCH_YEARS: 8,

  /** Maximum tags to display in academic search results */
  ACADEMIC_SEARCH_TAGS: 3,

  /** Maximum quick theme options in theme selector dropdown */
  THEME_SELECTOR_QUICK: 3,
} as const;

/**
 * Scroll behavior constants
 */
export const SCROLL = {
  /** Scroll position for back-to-top button to appear (in pixels) */
  BACK_TO_TOP_THRESHOLD: 300,

  /** Scroll animation behavior */
  BEHAVIOR: 'smooth' as const,

  /** Scroll to top position */
  TOP: 0,
} as const;

/**
 * Animation and timing constants
 */
export const TIMING = {
  /** Debounce delay for search inputs (in milliseconds) */
  SEARCH_DEBOUNCE: 300,

  /** Toast notification duration (in milliseconds) */
  TOAST_DURATION: 3000,

  /** Animation transition duration (in milliseconds) */
  TRANSITION: 200,
} as const;

/*
 * Note: TEACHING_METRICS has been moved to @/shared/lib/data/metrics.ts
 * as part of the Data Architecture Redesign (SSOT).
 */

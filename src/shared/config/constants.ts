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

/**
 * Animation duration constants
 */
export const ANIMATION = {
  /** Fast transition (buttons, small components) - 200ms */
  DURATION_FAST: 200,

  /** Normal transition (cards, standard components) - 300ms */
  DURATION_NORMAL: 300,

  /** Slow transition (large components, page transitions) - 500ms */
  DURATION_SLOW: 500,

  /** Intersection observer threshold for animations */
  OBSERVER_THRESHOLD: 0.1,

  /** Animation easing function */
  EASING: 'ease-in-out',
} as const;

/**
 * Teaching & Career Constants
 */
export const CAREER = {
  /** Year teaching career began (21 semesters ~= 7 years from 2024/2025) */
  TEACHING_START_YEAR: 2017,

  /** First teaching position start date */
  FIRST_TEACHING_POSITION: 'January 2017',

  /** Years of teaching experience (calculated dynamically) */
  get YEARS_TEACHING() {
    return new Date().getFullYear() - this.TEACHING_START_YEAR;
  },
} as const;

/**
 * Teaching metrics constants
 */
export const TEACHING_METRICS = {
  /** Average students per course */
  AVERAGE_CLASS_SIZE: 30,

  /** Total approximate students taught (placeholder) */
  TOTAL_STUDENTS: 500,

  /** Average student evaluation score out of 5.0 (avg over 21 semesters) */
  AVERAGE_RATING: 4.31,

  /** Maximum rating scale */
  MAX_RATING: 5.0,

  /** Total number of semesters taught */
  TOTAL_SEMESTERS: 21,
} as const;

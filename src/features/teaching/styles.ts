/**
 * Shared styles for teaching components
 * Single Source of Truth for course-level styling
 */

/**
 * Course level badge styles
 * Used by CourseCard and CourseCardCompact
 */
export const LEVEL_STYLES = {
  undergraduate:
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  graduate:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
} as const;

/**
 * Get style for a course level
 */
export function getLevelStyle(level: string): string {
  return (
    LEVEL_STYLES[level as keyof typeof LEVEL_STYLES] ||
    LEVEL_STYLES.undergraduate
  );
}

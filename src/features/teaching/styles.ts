/**
 * Shared styles for teaching components
 * Single Source of Truth for course-level styling
 */

/**
 * Course level badge styles
 * Used by CourseCard and CourseCardCompact
 */
export const LEVEL_STYLES = {
  undergraduate: 'bg-primary/10 text-primary',
  graduate: 'bg-secondary text-secondary-foreground',
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

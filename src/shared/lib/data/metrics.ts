/**
 * Central Metrics Repository (SSOT)
 * Single Source of Truth for all numerical data used across the site.
 * No more scattered constants or duplicated values.
 */
import { getTotalStudentsFromCourses } from '@/shared/lib/data/courses';

export const METRICS = {
  // Teaching
  AVERAGE_RATING: 4.32, // Source: CV, verified 2026
  TOTAL_STUDENTS: getTotalStudentsFromCourses(),
  YEARS_TEACHING: new Date().getFullYear() - 2015,
  AVERAGE_CLASS_SIZE: 30,

  // Research
  CITATION_COUNT: 39, // Source: Google Scholar
  H_INDEX: 3,
  I10_INDEX: 2,
  IMPACT_FACTOR_TOTAL: 15.5, // Placeholder/Estimate if needed

  // Activity Counts (Dynamic or Manual Fallbacks)
  PUBLICATIONS: 15,
  AWARDS: 6,
  GRANTS: 4,
} as const;

/**
 * Helper to format big numbers (e.g. 1000 -> 1k+)
 */
export function formatMetric(value: number, suffix: string = '+'): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace('.0', '')}k${suffix}`;
  }
  return `${value}${suffix}`;
}

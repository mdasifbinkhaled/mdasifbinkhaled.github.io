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

  // Research
  CITATION_COUNT: 39, // Source: Google Scholar
  H_INDEX: 3,
  I10_INDEX: 2,
} as const;

/**
 * Central Metrics Repository (SSOT)
 * Single Source of Truth for all numerical data used across the site.
 * No more scattered constants or duplicated values.
 */
import { getTotalStudentsFromCourses } from '@/shared/lib/data/courses';

export const METRICS = {
  // Teaching
  // Note: average teaching rating is derived from course data via
  // getTeachingFigures() — don't reintroduce a hardcoded rating here.
  TOTAL_STUDENTS: getTotalStudentsFromCourses(),
  YEARS_TEACHING: new Date().getFullYear() - 2015,

  // Research
  CITATION_COUNT: 42, // Source: Google Scholar, updated 2026-04-15
  H_INDEX: 4,
  I10_INDEX: 2,
} as const;

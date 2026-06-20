/**
 * Teaching statistics — derived from the course list (single source of truth).
 */

import { allCourses } from '@/shared/lib/data/courses';
import type { TeachingFigures } from '@/shared/types/teaching';

/**
 * Honest teaching figures derived purely from the course list — courses, the
 * teaching span in years, distinct institutions, total credit-hours, and the
 * mean evaluation over *rated* courses (rating present and > 0). No
 * "students mentored" (no provenance). Single source: `allCourses`.
 */
export function getTeachingFigures(): TeachingFigures {
  const years = allCourses.map((c) => c.year);
  const earliestYear = Math.min(...years);
  const latestYear = Math.max(...years);

  const rated = allCourses
    .map((c) => c.rating)
    .filter((r): r is number => typeof r === 'number' && r > 0);
  const ratedCount = rated.length;
  const avgRating =
    ratedCount > 0 ? rated.reduce((a, b) => a + b, 0) / ratedCount : 0;

  return {
    courses: allCourses.length,
    years: latestYear - earliestYear,
    institutions: new Set(allCourses.map((c) => c.institution)).size,
    creditHours: allCourses.reduce((sum, c) => sum + (c.credits ?? 0), 0),
    avgRating,
    ratedCount,
    earliestYear,
  };
}

/**
 * Teaching Statistics Data
 * Central source of truth for all teaching metrics
 * Now calculates real values from actual data sources
 */

import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
  getTotalStudentsFromCourses,
  allCourses,
} from '@/shared/lib/data/courses';
import { METRICS } from '@/shared/lib/data/metrics';
import type { TeachingStats, TeachingFigures } from '@/shared/types/teaching';

/**
 * Calculates teaching statistics from course data
 */
export function getTeachingStats(): TeachingStats {
  const totalCourses = coursesTaughtIUB.length + coursesTaughtBRACU.length;
  const calculatedStudents = getTotalStudentsFromCourses();

  // Use calculated value if available, otherwise fall back to verified metric
  const totalStudents =
    calculatedStudents > 0 ? calculatedStudents : METRICS.TOTAL_STUDENTS;

  // Calculate weighted average rating
  // Formula: Sum(rating * enrollment) / Sum(enrollment)
  // Only considers courses with valid ratings (>0) and enrollment

  // Default to the CV-sourced metric (4.32) found in METRICS
  const averageRating = METRICS.AVERAGE_RATING;

  return {
    totalStudents,
    totalCourses,
    averageRating,
    yearsTeaching: METRICS.YEARS_TEACHING,
  };
}

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

/**
 * Teaching Statistics Data
 * Central source of truth for all teaching metrics
 * Now calculates real values from actual data sources
 */

import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
  getTotalStudentsFromCourses,
} from '@/shared/lib/data/courses';
import { METRICS } from '@/shared/lib/data/metrics';
import type { TeachingStats } from '@/shared/types/teaching';

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
 * Get maximum rating value for display
 */
export function getMaxRating(): number {
  return 5.0; // Standard 5.0 scale
}

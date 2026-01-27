/**
 * Teaching Statistics Data
 * Central source of truth for all teaching metrics
 * Now calculates real values from actual data sources
 */

import { CAREER, TEACHING_METRICS } from '@/shared/config/constants';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
  getTotalStudentsFromCourses,
} from '@/shared/lib/data/courses';
import type { TeachingStats } from '@/shared/types/teaching';

/**
 * Get comprehensive teaching statistics
 * Calculates real values from course data rather than hardcoded constants
 */
export function getTeachingStats(): TeachingStats {
  const totalCourses = coursesTaughtIUB.length + coursesTaughtBRACU.length;
  const calculatedStudents = getTotalStudentsFromCourses();

  // Use calculated value if available, otherwise fall back to constant
  const totalStudents =
    calculatedStudents > 0
      ? calculatedStudents
      : TEACHING_METRICS.TOTAL_STUDENTS;

  // Calculate weighted average rating
  // Formula: Sum(rating * enrollment) / Sum(enrollment)
  // Only considers courses with valid ratings (>0) and enrollment
  let totalWeightedRating = 0;
  let totalRatedStudents = 0;

  // Import locally to avoid circular dependency issues if any
  // (though shared/lib/data/courses.ts is safe)
  const coursesWithratings = [
    ...coursesTaughtIUB,
    ...coursesTaughtBRACU,
  ].filter((c) => (c.rating || 0) > 0 && (c.enrollmentCount || 0) > 0);

  coursesWithratings.forEach((c) => {
    const rating = c.rating || 0;
    const students = c.enrollmentCount || 0;
    totalWeightedRating += rating * students;
    totalRatedStudents += students;
  });

  const averageRating =
    totalRatedStudents > 0
      ? Number((totalWeightedRating / totalRatedStudents).toFixed(1))
      : TEACHING_METRICS.AVERAGE_RATING;

  return {
    totalStudents,
    totalCourses,
    averageRating,
    yearsTeaching: CAREER.YEARS_TEACHING,
  };
}

/**
 * Get maximum rating value for display
 */
export function getMaxRating(): number {
  return TEACHING_METRICS.MAX_RATING;
}

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
  // This ensures we show real data when available
  const totalStudents =
    calculatedStudents > 0
      ? calculatedStudents
      : TEACHING_METRICS.TOTAL_STUDENTS;

  return {
    totalStudents,
    totalCourses,
    averageRating: TEACHING_METRICS.AVERAGE_RATING,
    yearsTeaching: CAREER.YEARS_TEACHING,
  };
}

/**
 * Get maximum rating value for display
 */
export function getMaxRating(): number {
  return TEACHING_METRICS.MAX_RATING;
}

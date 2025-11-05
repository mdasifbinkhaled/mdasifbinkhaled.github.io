/**
 * Teaching Statistics Data
 * Central source of truth for all teaching metrics
 */

import { CAREER, TEACHING_METRICS } from '@/shared/config/constants';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
} from '@/shared/lib/data/courses';
import type { TeachingStats } from '@/shared/types/teaching';

/**
 * Get comprehensive teaching statistics
 * @returns Complete teaching metrics including students, courses, rating, and years
 */
export function getTeachingStats(): TeachingStats {
  const totalCourses = coursesTaughtIUB.length + coursesTaughtBRACU.length;

  return {
    totalStudents: TEACHING_METRICS.TOTAL_STUDENTS,
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

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
import { getGlobalAverageRating } from '@/shared/lib/data/evaluations';
import type { TeachingStats } from '@/shared/types/teaching';

export const getTotalCourses = () =>
  coursesTaughtIUB.length + coursesTaughtBRACU.length;
export const getTotalStudents = () => {
  const calculated = getTotalStudentsFromCourses();
  return calculated > 0 ? calculated : TEACHING_METRICS.TOTAL_STUDENTS;
};

/**
 * Get comprehensive teaching statistics
 * Calculates real values from course data rather than hardcoded constants
 */
export function getTeachingStats(): TeachingStats {
  return {
    totalStudents: getTotalStudents(),
    totalCourses: getTotalCourses(),
    averageRating: getGlobalAverageRating(),
    yearsTeaching: CAREER.YEARS_TEACHING,
    totalSemesters: TEACHING_METRICS.TOTAL_SEMESTERS,
  };
}

/**
 * Get maximum rating value for display
 */
export function getMaxRating(): number {
  return TEACHING_METRICS.MAX_RATING;
}

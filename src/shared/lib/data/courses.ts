/**
 * Course Data Loader
 *
 * Central module for validated course data with institution groupings
 * and tier-based filtering.
 */
import type { CourseData, CourseInstitution, CourseTier } from '@/shared/types';
import { coursesArraySchema, validateData } from '../validation/schemas';

import { allCourses as rawAllCourses } from './courses/index';

/** Institution display names */
export const institutionNames: Record<CourseInstitution, string> = {
  IUB: 'Independent University, Bangladesh (IUB)',
  BRACU: 'BRAC University',
};

/** All courses — validated from central index */
export const allCourses: CourseData[] = validateData(
  rawAllCourses,
  coursesArraySchema,
  'courses'
);

export const coursesTaughtIUB = allCourses.filter(
  (c) => c.institution === 'IUB'
);

export const coursesTaughtBRACU = allCourses.filter(
  (c) => c.institution === 'BRACU'
);

/** Get courses by tier */
export const getCoursesByTier = (tier: CourseTier): CourseData[] =>
  allCourses.filter((c) => c.tier === tier);

/** Get detailed courses (for generating static pages) */
export const getDetailedCourses = (): CourseData[] =>
  allCourses.filter((c) => c.tier === 'detailed');

/** Calculate total students from enrollment data */
export function getTotalStudentsFromCourses(): number {
  return allCourses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0);
}

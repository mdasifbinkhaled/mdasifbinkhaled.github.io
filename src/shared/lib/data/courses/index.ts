/**
 * Course Data — Single Source of Truth
 *
 * All course data, institution groupings, tier-based filtering,
 * and derived calculations live here. No wrapper layers.
 */
import type { CourseData, CourseInstitution, CourseTier } from '@/shared/types';

import { iubCse101 } from './iub-cse101';
import { iubCse201 } from './iub-cse201';
import { iubCse203 } from './iub-cse203';
import { iubCse211 } from './iub-cse211/index';
import { iubCse317 } from './iub-cse317';
import { iubCse331 } from './iub-cse331';
import { iubCse110 } from './iub-cse110';

import { bracuCse423 } from './bracu-cse423';
import { bracuCse284 } from './bracu-cse284';
import { bracuCse420 } from './bracu-cse420/index';

import { bracuCse489 } from './bracu-cse489';

// Export individual courses for direct access if needed
export {
  iubCse101,
  iubCse201,
  iubCse203,
  iubCse211,
  iubCse317,
  iubCse331,
  iubCse110,
  bracuCse423,
  bracuCse284,
  bracuCse420,
  bracuCse489,
};

/** Institution display names */
export const institutionNames: Record<CourseInstitution, string> = {
  IUB: 'Independent University, Bangladesh (IUB)',
  BRACU: 'BRAC University',
};

// Aggregate by Institution
export const coursesTaughtIUB: CourseData[] = [
  iubCse211, // Featured/Detailed first
  iubCse101,
  iubCse201,
  iubCse203,
  iubCse317,
  iubCse331,
  iubCse110,
];

export const coursesTaughtBRACU: CourseData[] = [
  bracuCse423,
  bracuCse284,
  bracuCse420,
  bracuCse489,
];

// Master list
export const allCourses: CourseData[] = [
  ...coursesTaughtIUB,
  ...coursesTaughtBRACU,
];

/** Get courses by tier */
export const getCoursesByTier = (tier: CourseTier): CourseData[] =>
  allCourses.filter((c) => c.tier === tier);

/** Get detailed courses (for generating static pages) */
export const getDetailedCourses = (): CourseData[] =>
  allCourses.filter((c) => c.tier === 'detailed');

/** Calculate total students from enrollment data */
export function getTotalStudentsFromCourses(): number {
  return allCourses.reduce(
    (total, course) => total + (course.enrollmentCount || 0),
    0
  );
}

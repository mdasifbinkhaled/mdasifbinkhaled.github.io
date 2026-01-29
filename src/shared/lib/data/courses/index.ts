import type { CourseData } from '@/shared/types';

import { iubCse101 } from './iub-cse101';
import { iubCse201 } from './iub-cse201';
import { iubCse203 } from './iub-cse203';
import { iubCse211 } from './iub-cse211/index';
import { iubCse317 } from './iub-cse317';
import { iubCse331 } from './iub-cse331';
import { iubCse110 } from './iub-cse110';

import { bracuCse423 } from './bracu-cse423';
import { bracuCse284 } from './bracu-cse284';
import { bracuCse420 } from './bracu-cse420';
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

// Helper to get total students (calculated dynamically)
export function getTotalStudentsFromCourses(): number {
  return allCourses.reduce(
    (total, course) => total + (course.enrollmentCount || 0),
    0
  );
}

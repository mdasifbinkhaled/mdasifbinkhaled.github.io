// Course data loader - imports individual JSON files for better maintainability
import type {
  CourseData,
  CourseInstitution,
  CourseStatus,
} from '@/shared/types';
import { coursesArraySchema, validateData } from '../validation/schemas';

export const institutionNames: Record<CourseInstitution, string> = {
  IUB: 'Independent University, Bangladesh (IUB)',
  BRACU: 'BRAC University',
};

// Import IUB course JSON files
import cse101 from './courses/iub/cse101.json';
import cse201 from './courses/iub/cse201.json';
import cse203 from './courses/iub/cse203.json';
import cse205 from './courses/iub/cse205.json';
import cse303 from './courses/iub/cse303.json';
import cse401 from './courses/iub/cse401.json';
import cse403 from './courses/iub/cse403.json';

// Import BRACU course JSON files
import cgLab from './courses/bracu/cg-lab.json';
import nmLab from './courses/bracu/nm-lab.json';
import cdLab from './courses/bracu/cd-lab.json';
import androidLab from './courses/bracu/android-lab.json';

// IUB Courses (as Senior Lecturer)
const rawCoursesTaughtIUB: CourseData[] = [
  cse101 as CourseData,
  cse201 as CourseData,
  cse203 as CourseData,
  cse205 as CourseData,
  cse303 as CourseData,
  cse401 as CourseData,
  cse403 as CourseData,
];

/**
 * Validate and export IUB courses
 */
export const coursesTaughtIUB = validateData(
  rawCoursesTaughtIUB,
  coursesArraySchema,
  'IUB courses'
);

// BRACU Courses (as Teaching Assistant)
const rawCoursesTaughtBRACU: CourseData[] = [
  cgLab as CourseData,
  nmLab as CourseData,
  cdLab as CourseData,
  androidLab as CourseData,
];

/**
 * Validate and export BRACU courses
 */
export const coursesTaughtBRACU = validateData(
  rawCoursesTaughtBRACU,
  coursesArraySchema,
  'BRACU courses'
);

// All courses combined (already validated)
export const allCourses: CourseData[] = [
  ...coursesTaughtIUB,
  ...coursesTaughtBRACU,
];

// Filter functions
export const getCoursesByInstitution = (institution: CourseInstitution) =>
  allCourses.filter((course) => course.institution === institution);

export const getCoursesByLevel = (level: CourseData['level']) =>
  allCourses.filter((course) => course.level === level);

export const getCoursesByStatus = (status: CourseStatus) =>
  allCourses.filter((course) => course.status === status);

export const getCoursesByYear = (year: number) =>
  allCourses.filter((course) => course.year === year);

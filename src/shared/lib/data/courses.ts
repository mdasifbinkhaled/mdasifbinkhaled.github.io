/**
 * Course Data Loader - Centralized Index Architecture
 *
 * This module provides a scalable, future-proof course data system:
 * - Single central index (_index.json) for all courses
 * - Tier-based display levels (summary, standard, detailed)
 * - Lazy loading for detailed course content
 */
import type {
  CourseData,
  CourseInstitution,
  CourseStatus,
  CourseTier,
} from '@/shared/types';
import { coursesArraySchema, validateData } from '../validation/schemas';

// Import central index
import { allCourses as rawAllCourses } from './courses/index';

/**
 * Institution display names
 */
export const institutionNames: Record<CourseInstitution, string> = {
  IUB: 'Independent University, Bangladesh (IUB)',
  BRACU: 'BRAC University',
};

/**
 * All courses - validated from central index
 * Now imported from type-safe TS files
 */
export const allCourses: CourseData[] = validateData(
  rawAllCourses,
  coursesArraySchema,
  'courses'
);

/**
 * Courses by institution
 */
export const coursesTaughtIUB = allCourses.filter(
  (c) => c.institution === 'IUB'
);

export const coursesTaughtBRACU = allCourses.filter(
  (c) => c.institution === 'BRACU'
);

/**
 * Courses grouped by institution
 * Enables dynamic tab generation
 */
export const coursesByInstitution: Record<string, CourseData[]> = {
  IUB: coursesTaughtIUB,
  BRACU: coursesTaughtBRACU,
};

/**
 * Get courses by tier
 */
export const getCoursesByTier = (tier: CourseTier): CourseData[] =>
  allCourses.filter((c) => c.tier === tier);

/**
 * Get detailed courses (for generating static pages)
 */
export const getDetailedCourses = (): CourseData[] =>
  allCourses.filter((c) => c.tier === 'detailed');

/**
 * Check if a course has a detail page
 * Uses tier field (detailed = has page)
 */
export const hasDetailPage = (course: CourseData): boolean =>
  course.tier === 'detailed';

/**
 * Calculate total students from enrollment data
 */
export function getTotalStudentsFromCourses(): number {
  return allCourses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0);
}

/**
 * Filter functions
 */
export const getCoursesByInstitution = (institution: CourseInstitution) =>
  allCourses.filter((course) => course.institution === institution);

export const getCoursesByLevel = (level: CourseData['level']) =>
  allCourses.filter((course) => course.level === level);

export const getCoursesByStatus = (status: CourseStatus) =>
  allCourses.filter((course) => course.status === status);

export const getCoursesByYear = (year: number) =>
  allCourses.filter((course) => course.year === year);

/**
 * Get course by ID
 */
export const getCourseById = (id: string): CourseData | undefined =>
  allCourses.find((course) => course.id === id);

/**
 * Get course by code (e.g., "CSE 101")
 */
export const getCourseByCode = (code: string): CourseData | undefined =>
  allCourses.find(
    (course) =>
      course.code.toLowerCase().replace(/\s/g, '') ===
      code.toLowerCase().replace(/\s/g, '')
  );

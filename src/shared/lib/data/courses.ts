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

// Import IUB course JSON files (CV-verified courses)
import cse101 from './courses/iub/cse101.json'; // Introduction to Programming
import cse203 from './courses/iub/cse203.json'; // Data Structures
import cse211 from './courses/iub/cse211.json'; // Algorithms
import cse201 from './courses/iub/cse201-discrete-math.json'; // Discrete Mathematics
import cse317 from './courses/iub/cse317.json'; // Numerical Methods
import finiteAutomata from './courses/iub/finite-automata.json'; // Finite Automata and Computability
import fundamentalsCs from './courses/iub/fundamentals-cs.json'; // Fundamentals of Computer System

// Import BRACU course JSON files (Adjunct Lecturer Sep 2017 - Dec 2018)
import cgLab from './courses/bracu/cg-lab.json';
import nmLab from './courses/bracu/nm-lab.json';
import cdLab from './courses/bracu/cd-lab.json';
import androidLab from './courses/bracu/android-lab.json';

// IUB Courses (Senior Lecturer Feb 2023+ & Lecturer Jan 2019-Feb 2023)
const rawCoursesTaughtIUB: CourseData[] = [
  cse101 as CourseData, // Introduction to Programming
  cse203 as CourseData, // Data Structures
  cse211 as CourseData, // Algorithms
  cse201 as CourseData, // Discrete Mathematics
  cse317 as CourseData, // Numerical Methods
  finiteAutomata as CourseData, // Finite Automata and Computability
  fundamentalsCs as CourseData, // Fundamentals of Computer System
];

/**
 * Validate and export IUB courses
 */
export const coursesTaughtIUB = validateData(
  rawCoursesTaughtIUB,
  coursesArraySchema,
  'IUB courses'
);

// BRACU Courses (Adjunct Lecturer Sep 2017 - Dec 2018)
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

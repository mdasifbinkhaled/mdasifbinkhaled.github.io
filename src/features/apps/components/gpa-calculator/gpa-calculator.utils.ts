// ────────────────────────────────────────────────
// GPA Calculator — pure helpers + types
// (no 'use client' — this file has zero side-effects)
// ────────────────────────────────────────────────

import { STANDARD_GRADING_SCALE } from '@/shared/lib/data/grading';
import type { SchemaField } from '@/shared/lib/parsers/types';

export type TranscriptKey = 'name' | 'credits' | 'grade';

export interface CourseEntry {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export const TRANSCRIPT_FIELDS: readonly SchemaField<TranscriptKey>[] = [
  {
    key: 'name',
    label: 'Course',
    required: true,
    aliases: ['course', 'course name', 'course title', 'name', 'code'],
  },
  {
    key: 'credits',
    label: 'Credits',
    required: true,
    aliases: ['credits', 'credit', 'cr', 'cr.', 'units'],
    parse: (raw) => {
      const n = Number(raw);
      if (!Number.isFinite(n) || n <= 0 || n > 6) {
        throw new Error(`invalid credits "${raw}"`);
      }
      return n;
    },
  },
  {
    key: 'grade',
    label: 'Grade',
    required: true,
    aliases: ['grade', 'letter', 'letter grade', 'mark'],
    parse: (raw) => {
      const s = String(raw).trim().toUpperCase();
      const match = STANDARD_GRADING_SCALE.find((g) => g.label === s);
      if (!match) throw new Error(`unknown grade "${raw}"`);
      return match.label;
    },
  },
];

export const GPA_TOOL_SLUG = 'gpa-calculator';

export const DEFAULT_COURSES: CourseEntry[] = [
  { id: '1', name: '', credits: 3, grade: 'A' },
  { id: '2', name: '', credits: 3, grade: 'B+' },
  { id: '3', name: '', credits: 3, grade: 'A-' },
];

export interface GpaResult {
  termGpa: number;
  termCredits: number;
  cgpa: number;
  totalCredits: number;
}

export function computeGpa(
  courses: CourseEntry[],
  prevCredits: number | '',
  prevCgpa: number | ''
): GpaResult {
  let currentGradePoints = 0;
  let currentCredits = 0;

  courses.forEach((course) => {
    const scaleMatch = STANDARD_GRADING_SCALE.find(
      (s) => s.label === course.grade
    );
    if (scaleMatch && course.credits > 0) {
      currentGradePoints += scaleMatch.gpa * course.credits;
      currentCredits += course.credits;
    }
  });

  const termGpaCalc =
    currentCredits > 0 ? currentGradePoints / currentCredits : 0;

  let finalCgpa = termGpaCalc;
  let finalTotalCredits = currentCredits;

  if (
    typeof prevCredits === 'number' &&
    typeof prevCgpa === 'number' &&
    prevCredits > 0
  ) {
    const pastGradePoints = prevCredits * prevCgpa;
    finalTotalCredits = prevCredits + currentCredits;
    finalCgpa = (pastGradePoints + currentGradePoints) / finalTotalCredits;
  }

  return {
    termGpa: termGpaCalc,
    termCredits: currentCredits,
    cgpa: finalCgpa,
    totalCredits: finalTotalCredits,
  };
}

import { describe, it, expect } from 'vitest';
import {
  computeGpa,
  type CourseEntry,
} from '@/features/apps/components/gpa-calculator/gpa-calculator.utils';

/** Build a CourseEntry with sensible defaults. */
const course = (credits: number, grade: string, name = 'X'): CourseEntry => ({
  id: `${name}-${grade}`,
  name,
  credits,
  grade,
});

describe('computeGpa', () => {
  it('returns all-zero for an empty course list', () => {
    expect(computeGpa([], '', '')).toEqual({
      termGpa: 0,
      termCredits: 0,
      cgpa: 0,
      totalCredits: 0,
      ignoredCount: 0,
    });
  });

  it('computes a single-course term GPA exactly', () => {
    const r = computeGpa([course(3, 'A')], '', '');
    expect(r.termGpa).toBe(4);
    expect(r.termCredits).toBe(3);
    expect(r.cgpa).toBe(4);
    expect(r.totalCredits).toBe(3);
  });

  it('weights the term GPA by credits', () => {
    // A(4.0)*3 + B+(3.3)*3 + A-(3.7)*3 = 33 over 9 credits
    const r = computeGpa(
      [course(3, 'A'), course(3, 'B+'), course(3, 'A-')],
      '',
      ''
    );
    expect(r.termGpa).toBeCloseTo(33 / 9, 6);
    expect(r.termCredits).toBe(9);
  });

  it('blends prior CGPA by prior credits', () => {
    // current: A*3 = 12 pts / 3 cr ; prior: 30 cr @ 3.0 = 90 pts
    const r = computeGpa([course(3, 'A')], 30, 3.0);
    expect(r.cgpa).toBeCloseTo((90 + 12) / 33, 6); // 3.0909…
    expect(r.totalCredits).toBe(33);
  });

  it('does NOT blend when prior credits are 0 (short-circuit)', () => {
    const r = computeGpa([course(3, 'A')], 0, 3.0);
    expect(r.cgpa).toBe(4); // equals term GPA, prior ignored
    expect(r.totalCredits).toBe(3);
  });

  it('does NOT blend when prior fields are blank', () => {
    const r = computeGpa([course(3, 'A')], '', '');
    expect(r.cgpa).toBe(4);
  });

  it('excludes (and counts) a course with an unrecognized grade', () => {
    const r = computeGpa([course(3, 'A'), course(3, 'ZZ')], '', '');
    expect(r.termGpa).toBe(4); // only the A counts
    expect(r.termCredits).toBe(3);
    expect(r.ignoredCount).toBe(1);
  });

  it('excludes (and counts) a populated course with non-positive credits', () => {
    const r = computeGpa([course(0, 'A')], '', '');
    expect(r.termCredits).toBe(0);
    expect(r.ignoredCount).toBe(1);
  });

  it('does NOT count a wholly-empty placeholder row as ignored', () => {
    const r = computeGpa([course(0, '')], '', '');
    expect(r.ignoredCount).toBe(0);
  });
});

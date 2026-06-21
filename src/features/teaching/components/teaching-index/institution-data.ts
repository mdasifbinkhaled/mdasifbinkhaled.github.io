import type { CourseData, CourseInstitution } from '@/shared/types';
import { allCourses, institutionNames } from '@/shared/lib/data/courses';

/** The active institution filter value: a real institution code or "all". */
export type InstitutionFilter = CourseInstitution | 'all';

export interface InstitutionGroup {
  /** Institution code (filter value). */
  short: CourseInstitution;
  /** Monogram crest text shown until a real logo is wired in. */
  mark: string;
  /** Display name. */
  name: string;
  /** True for the present institution (green presence dot + tinted badge). */
  current: boolean;
  /** Tenure range, e.g. "2017 – 2018" or "2017 – present". */
  years: string;
  /** Number of courses taught there. */
  count: number;
}

// Name is single-sourced from `institutionNames` (shared data) so the filter
// card and the record toolbar can never disagree. Only the teaching-local
// presentation bits (crest mark, present-institution flag) live here.
const META: Record<CourseInstitution, { mark: string; current: boolean }> = {
  IUB: { mark: 'IUB', current: true },
  BRACU: { mark: 'BU', current: false },
};

/** True when a course belongs to the present institution. */
export function isPresentInstitution(inst: CourseInstitution): boolean {
  return META[inst]?.current ?? false;
}

/**
 * Institution groups derived from the live course list — preserves the order
 * institutions first appear in `allCourses` (IUB, then BRACU).
 */
export function getInstitutionGroups(): InstitutionGroup[] {
  const order: CourseInstitution[] = [];
  const buckets = new Map<CourseInstitution, CourseData[]>();

  for (const course of allCourses) {
    if (!buckets.has(course.institution)) {
      buckets.set(course.institution, []);
      order.push(course.institution);
    }
    buckets.get(course.institution)?.push(course);
  }

  return order.map((short) => {
    const courses = buckets.get(short) ?? [];
    const years = courses.map((c) => c.year);
    const min = Math.min(...years);
    const max = Math.max(...years);
    const meta = META[short];
    return {
      short,
      mark: meta.mark,
      name: institutionNames[short],
      current: meta.current,
      years: meta.current ? `${min} – present` : `${min} – ${max}`,
      count: courses.length,
    };
  });
}

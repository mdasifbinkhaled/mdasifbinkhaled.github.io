import { describe, it, expect } from 'vitest';
import type { CourseData } from '@/shared/types';
import {
  allExams,
  buildNotices,
  computeCurrentWeek,
  deriveSections,
  deriveThisWeek,
  weekFirst,
} from '@/features/teaching/components/course-page/course-page.utils';

const base: CourseData = {
  id: 'test',
  code: 'CSE 999',
  title: 'Test Course',
  institution: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: 'Summer',
  year: 2026,
  description: 'Test',
  outcomes: ['a', 'b'],
  status: 'ongoing',
  tier: 'detailed',
  totalWeeks: 6,
  units: [
    {
      label: 'Unit I',
      weeks: [
        { week: 1, title: 'W1', theory: 't1', lab: 'l1' },
        { week: 2, title: 'W2', theory: 't2', lab: 'l2' },
        { week: '3–4', title: 'W3-4', theory: 't34', lab: 'l34' },
      ],
    },
  ],
  assessmentSchemes: {
    theory: {
      label: 'Theory',
      grading: [{ label: 'Final', pct: 100 }],
      exams: {
        midterm: { name: 'Midterm', date: 'To be announced' },
        final: { name: 'Final', date: 'To be announced' },
      },
    },
  },
  sectionsRoster: {
    rows: [
      {
        sec: '01',
        type: 'Theory',
        instructor: 'X',
        days: 'Sun',
        time: '9',
        room: 'R1',
      },
    ],
  },
  assignments: [{ title: 'A1', status: 'upcoming' }],
  resourceSections: [{ title: 'Group', items: [{ label: 'Item' }] }],
  announcements: [{ tag: 'new', title: 'Hello', date: 'Posted 1 Jan' }],
};

describe('weekFirst', () => {
  it('returns the number for numeric weeks', () => {
    expect(weekFirst(5)).toBe(5);
  });
  it('parses the first number of a range string', () => {
    expect(weekFirst('8–9')).toBe(8);
  });
});

describe('computeCurrentWeek', () => {
  it('returns null without a start date', () => {
    expect(
      computeCurrentWeek(undefined, 12, new Date('2026-06-16'))
    ).toBeNull();
  });
  it('returns null for an invalid date', () => {
    expect(
      computeCurrentWeek('not-a-date', 12, new Date('2026-06-16'))
    ).toBeNull();
  });
  it('computes the week from the term start, clamped to [1, total]', () => {
    const now = new Date('2026-06-16');
    expect(computeCurrentWeek('2026-06-01', 12, now)).toBe(3); // 15 days -> week 3
    expect(computeCurrentWeek('2026-06-15', 12, now)).toBe(1); // before week 1 floor -> clamp
    expect(computeCurrentWeek('2020-01-01', 12, now)).toBe(12); // far past -> clamp to total
  });
});

describe('allExams', () => {
  it('flattens exams from dual schemes', () => {
    const exams = allExams(base);
    expect(exams.map((e) => e.name)).toEqual(['Midterm', 'Final']);
  });
  it('falls back to top-level exams', () => {
    const course = {
      ...base,
      assessmentSchemes: undefined,
      exams: { midterm: { date: '2026-07-01' }, final: { date: 'TBA' } },
    } satisfies CourseData;
    expect(allExams(course).map((e) => e.name)).toEqual(['Midterm', 'Final']);
  });
  it('returns [] when there are no exams', () => {
    const course = {
      ...base,
      assessmentSchemes: undefined,
    } satisfies CourseData;
    expect(allExams(course)).toEqual([]);
  });
});

describe('buildNotices', () => {
  it('collapses all-TBA exams into one row + adds assignments + announcements', () => {
    const notices = buildNotices(base);
    expect(notices[0]).toMatchObject({ tag: 'exam', target: 'assessment' });
    expect(notices.some((n) => n.target === 'assignments')).toBe(true);
    expect(notices.some((n) => n.tag === 'new')).toBe(true);
  });
  it('lists exams individually when dates are known', () => {
    const course = {
      ...base,
      assessmentSchemes: undefined,
      exams: { midterm: { date: '2026-07-01' }, final: { date: 'TBA' } },
    } satisfies CourseData;
    const titles = buildNotices(course).map((n) => n.title);
    expect(titles.some((t) => t.includes('2026-07-01'))).toBe(true);
    expect(titles.some((t) => /to be announced/i.test(t))).toBe(true);
  });
  it('skips exams/assignments for completed courses (announcements only)', () => {
    const course = { ...base, status: 'completed' } satisfies CourseData;
    const notices = buildNotices(course);
    expect(notices).toHaveLength(1);
    expect(notices[0]?.tag).toBe('new');
  });
});

describe('deriveSections', () => {
  it('numbers all present sections sequentially', () => {
    const { visible, num } = deriveSections(base);
    expect(visible.map((s) => s.id)).toEqual([
      'overview',
      'sections',
      'syllabus',
      'assessment',
      'assignments',
      'resources',
    ]);
    expect(num.overview).toBe('01');
    expect(num.resources).toBe('06');
  });
  it('drops absent sections and renumbers without gaps', () => {
    const course = {
      ...base,
      sectionsRoster: undefined,
      assignments: undefined,
    } satisfies CourseData;
    const { visible, num } = deriveSections(course);
    expect(visible.map((s) => s.id)).toEqual([
      'overview',
      'syllabus',
      'assessment',
      'resources',
    ]);
    expect(num.syllabus).toBe('02');
    expect(num.resources).toBe('04');
  });
});

describe('deriveThisWeek', () => {
  it('finds the unit/week containing the current week', () => {
    expect(deriveThisWeek(base, 2)).toMatchObject({
      title: 'W2',
      unit: 'Unit I',
    });
  });
  it('matches a week range', () => {
    expect(deriveThisWeek(base, 4)).toMatchObject({ title: 'W3-4' });
  });
  it('returns null when no week matches', () => {
    expect(deriveThisWeek(base, 99)).toBeNull();
  });
});

import type {
  DraftRecords,
  TeachingAssistantRecord,
} from '@/shared/types/teaching';

/**
 * Teaching assistants who supported the owner's courses.
 *
 * SAMPLE / draft: real TA records are not in the public data yet — placeholder
 * initials only (no real individuals); the courses/terms are real. The UI shows
 * a visible "Sample" badge while `draft` is true. Replace `rows` and set
 * `draft: false` once real records exist.
 */
export const teachingAssistants: DraftRecords<TeachingAssistantRecord> = {
  draft: true,
  note: 'Sample structure — replace with real TA records.',
  rows: [
    {
      name: 'A. R.',
      course: 'CSE 211',
      title: 'Algorithms',
      term: 'Summer 2026',
      role: 'Lab & grading',
    },
    {
      name: 'S. H.',
      course: 'CSE 203',
      title: 'Data Structures',
      term: 'Spring 2023',
      role: 'Lab support',
    },
    {
      name: 'M. K.',
      course: 'CSE 101',
      title: 'Intro to Programming',
      term: 'Fall 2023',
      role: 'Tutorials',
    },
    {
      name: 'T. I.',
      course: 'CSE 317',
      title: 'Numerical Methods',
      term: 'Summer 2024',
      role: 'Grading',
    },
  ],
};

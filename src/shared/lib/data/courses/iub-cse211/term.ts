import type { CourseData } from '@/shared/types';

export const cse211Term = {
  id: 'iub-cse211-summer26',
  slug: 'cse211sum26',
  label: 'Summer 2026',
  semester: 'Summer',
  year: 2026,
  publishedOn: '2026-05-13',
} as const satisfies {
  id: string;
  slug: string;
  label: string;
  semester: CourseData['semester'];
  year: number;
  publishedOn: string;
};

import type { ClassScheduleItem, CourseData } from '@/shared/types';
import { cse211Term } from './term';

export const semesterEndDate: CourseData['semesterEndDate'] = undefined;

export const notices = [
  {
    id: 'n-summer-rollover',
    title: `${cse211Term.label} course page is now active`,
    date: cse211Term.publishedOn,
    type: 'info' as const,
    importance: 'high' as const,
  },
  {
    id: 'n-routine-pending',
    title:
      'Class routine, lab sections, and exam dates will be updated after official publication',
    date: cse211Term.publishedOn,
    type: 'warning' as const,
    importance: 'medium' as const,
  },
];

export const activeContest: CourseData['activeContest'] = {
  title: 'Algorithms Lab Programming Contest — Summer 2026',
  url: 'https://vjudge.net/contest/815686',
  startDate: cse211Term.publishedOn,
  platform: 'VJudge',
};

export const exams = {
  midterm: {
    date: 'TBA',
    seatPlanUrl: '#',
    syllabus: 'Weeks 1-6',
  },
  final: {
    date: 'TBA',
    seatPlanUrl: '#',
  },
};

export const classSchedule: ClassScheduleItem[] = [];

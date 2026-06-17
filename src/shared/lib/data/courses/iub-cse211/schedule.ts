import type { CourseData } from '@/shared/types';
import { cse211Term } from './term';

export const activeContest: CourseData['activeContest'] = {
  title: 'Algorithms Lab Programming Contest — Summer 2026',
  url: 'https://vjudge.net/contest/815686',
  startDate: cse211Term.publishedOn,
  platform: 'VJudge',
  sub: 'Live now · open to all enrolled students',
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

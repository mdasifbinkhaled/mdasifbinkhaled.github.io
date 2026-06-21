import type { CourseData } from '@/shared/types';
import { cse211Term } from './term';

export const activeContest: CourseData['activeContest'] = {
  title: `Algorithms Lab Programming Contest — ${cse211Term.label}`,
  url: 'https://vjudge.net/contest/815686',
  startDate: cse211Term.publishedOn,
  platform: 'VJudge',
  sub: 'Live now · open to all enrolled students',
};

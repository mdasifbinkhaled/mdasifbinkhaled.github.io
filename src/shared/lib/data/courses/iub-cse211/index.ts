import type { CourseData } from '@/shared/types';
import { weeklyModules } from './modules';
import { links, resourceSections } from './resources';
import {
  classSchedule,
  semesterEndDate,
  notices,
  activeContest,
  exams,
} from './schedule';

export const iubCse211: CourseData = {
  id: 'iub-cse211-spring26',
  code: 'CSE 211',
  slug: 'cse211spr26',

  title: 'Algorithms',
  institution: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: 'Spring',
  year: 2026,
  description:
    'Comprehensive study of algorithm analysis and design. Topics include sorting, searching, graph algorithms, dynamic programming, and complexity analysis (Big O). Emphasis on solving complex computational problems efficiently.',
  outcomes: [
    'Analyze the asymptotic performance of algorithms.',
    'Demonstrate a familiarity with major algorithms and data structures.',
    'Apply important algorithmic design paradigms and methods of analysis.',
    'Synthesize efficient algorithms in common engineering design situations.',
    'Understand NP-completeness and intractability.',
  ],
  technologies: ['Python', 'C++', 'Jupyter Notebook'],
  assignments: [
    {
      title: 'Assignment 1 Specification',
      link: 'https://docs.google.com/document/d/1zpuJU5Us3u_ZXNavkciqvSvQeB2ZmoFqvhbLo-6sIEk/edit?usp=sharing',
      status: 'active',
      description:
        'Review the detailed requirement specification for Assignment 1.',
    },
  ],
  enrollmentCount: 0,
  rating: 0,
  iconName: 'Brain',
  status: 'ongoing',
  tier: 'detailed',

  // Hub Features (Imported from Sub-modules)
  semesterEndDate,
  notices,
  activeContest,
  exams,
  weeklyModules,
  links,
  resourceSections,
  classSchedule,
};

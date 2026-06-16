import type { CourseData } from '@/shared/types';
import { weeklyModules } from './modules';
import { links, resourceSections } from './resources';
import { cse211Term } from './term';
import {
  classSchedule,
  semesterEndDate,
  notices,
  activeContest,
  exams,
} from './schedule';
import {
  announcements,
  assessmentSchemes,
  nextMilestone,
  pastOfferings,
  quickLinks,
  sectionsRoster,
  staff,
  units,
} from './command-center';

export const iubCse211: CourseData = {
  id: cse211Term.id,
  code: 'CSE 211',
  slug: cse211Term.slug,

  title: 'Algorithms',
  institution: 'IUB',
  institutionShort: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: cse211Term.semester,
  year: cse211Term.year,
  tagline:
    'Designing and analyzing efficient algorithms — from asymptotic complexity to the paradigms behind scalable computation.',
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
      title: `${cse211Term.label} Assignment 1`,
      status: 'upcoming',
      description:
        'Specification will be published after the Summer 2026 class routine and lab sections are finalized.',
    },
  ],
  enrollmentCount: 0,
  rating: 0,
  iconName: 'Brain',
  status: 'ongoing',
  tier: 'detailed',

  // Hub Features (Imported from Sub-modules)
  ...(semesterEndDate ? { semesterEndDate } : {}),
  notices,
  ...(activeContest ? { activeContest } : {}),
  exams,
  weeklyModules,
  links,
  resourceSections,
  classSchedule,
  consultation: {
    office: 'BC5010-D',
    hours:
      'By appointment during Summer 2026 until the class routine is finalized.',
    phone: '(+88) 01676076329',
    note: 'Please make an appointment before visiting.',
  },

  // Course-page "Command Center" template fields
  template: 'command-center',
  totalWeeks: 12,
  currentWeek: 3,
  termStartDate: '2026-06-01',
  staff,
  nextMilestone,
  units,
  quickLinks,
  assessmentSchemes,
  sectionsRoster,
  announcements,
  pastOfferings,
};

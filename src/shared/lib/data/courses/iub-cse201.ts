import type { CourseData } from '@/shared/types';

export const iubCse201: CourseData = {
  id: 'iub-cse201',
  code: 'CSE 201',
  title: 'Discrete Mathematics',
  institution: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: 'Fall',
  year: 2023,
  description:
    'Mathematical foundations for computer science including logic, sets, relations, functions, and graph theory.',
  outcomes: [
    'Students can construct mathematical proofs',
    'Students understand set theory and relations',
    'Students can apply graph theory concepts',
    'Students understand combinatorics and counting',
  ],
  technologies: ['LaTeX', 'Mathematical Notation', 'Proof Techniques'],
  enrollmentCount: 35,
  rating: 4.3,
  iconName: 'Calculator',
  status: 'completed',
  tier: 'summary',
};

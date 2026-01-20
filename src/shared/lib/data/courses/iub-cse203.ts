import type { CourseData } from '@/shared/types';

export const iubCse203: CourseData = {
  id: 'iub-cse203',
  code: 'CSE 203',
  title: 'Data Structures',
  institution: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: 'Spring',
  year: 2023,
  description:
    'Advanced data structures including trees, heaps, graphs, and hash tables with analysis of algorithm complexity.',
  outcomes: [
    'Students can implement advanced data structures',
    'Students can analyze algorithmic complexity',
    'Students can solve problems using trees and graphs',
    'Students understand hashing and memory organization',
  ],
  technologies: ['C++', 'STL', 'Algorithm Analysis', 'Visual Studio'],
  enrollmentCount: 40,
  rating: 4.8,
  iconName: 'Database',
  status: 'completed',
  tier: 'standard',
};

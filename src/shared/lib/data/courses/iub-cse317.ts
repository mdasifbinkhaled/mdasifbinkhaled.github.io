import type { CourseData } from '@/shared/types';

export const iubCse317: CourseData = {
  id: 'iub-cse317',
  code: 'CSE 317',
  title: 'Numerical Methods',
  institution: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: 'Summer',
  year: 2024,
  description:
    'Numerical techniques for solving mathematical problems including root finding, interpolation, numerical integration, and differential equations.',
  outcomes: [
    'Students can implement numerical algorithms',
    'Students understand error analysis',
    'Students can solve engineering problems numerically',
    'Students can use MATLAB for scientific computing',
  ],
  technologies: ['MATLAB', 'Python', 'NumPy', 'SciPy'],
  enrollmentCount: 30,
  rating: 4.4,
  iconName: 'Calculator',
  status: 'completed',
  tier: 'standard',
};

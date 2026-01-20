import type { CourseData } from '@/shared/types';

export const bracuCse423: CourseData = {
  id: 'bracu-cg-lab',
  code: 'CSE 423',
  title: 'Computer Graphics Lab',
  institution: 'BRACU',
  level: 'undergraduate',
  credits: 1,
  semester: 'Fall',
  year: 2018,
  description:
    'Practical application of computer graphics principles including 2D/3D transformations, rendering, and OpenGL programming.',
  outcomes: [
    'Students can implement graphics primitives',
    'Students can create 3D scenes',
    'Students understand transformation matrices',
    'Students can develop interactive applications',
  ],
  technologies: ['OpenGL', 'C++', 'Visual Studio', 'GLUT'],
  enrollmentCount: 25,
  rating: 4.6,
  iconName: 'Presentation',
  status: 'completed',
  tier: 'summary',
};

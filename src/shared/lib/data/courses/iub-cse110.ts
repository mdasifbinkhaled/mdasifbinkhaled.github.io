import type { CourseData } from '@/shared/types';

export const iubCse110: CourseData = {
  id: 'iub-fundamentals-cs',
  code: 'CSE 110',
  title: 'Fundamentals of Computer System',
  institution: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: 'Spring',
  year: 2023,
  description:
    'Introduction to computer organization, binary systems, logic design, and basic computer architecture.',
  outcomes: [
    'Students understand binary and hexadecimal systems',
    'Students can design basic logic circuits',
    'Students understand CPU architecture',
    'Students can work with assembly language basics',
  ],
  technologies: ['Logisim', 'Digital Circuit Simulators', 'Assembly'],
  enrollmentCount: 50,
  rating: 4.3,
  iconName: 'Server',
  status: 'completed',
  tier: 'standard',
};

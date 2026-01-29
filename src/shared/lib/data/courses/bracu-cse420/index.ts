import type { CourseData } from '@/shared/types';
import { weeklyModules } from './modules';

export const bracuCse420: CourseData = {
  id: 'bracu-cd-lab',
  code: 'CSE 420',
  title: 'Compiler Design Lab',
  institution: 'BRACU',
  level: 'undergraduate',
  credits: 1,
  semester: 'Spring',
  year: 2018,
  description:
    'Practical implementation of compiler components including lexical analysis, parsing, and code generation.',
  outcomes: [
    'Students can implement lexical analyzers',
    'Students can build parsers',
    'Students understand code generation',
    'Students can use compiler tools',
  ],
  technologies: ['Flex', 'Bison', 'C Language', 'GCC'],
  enrollmentCount: 22,
  rating: 4.5,
  iconName: 'Code2',
  status: 'completed',
  tier: 'summary', // We can upgrade this to 'detailed' to test the hub layout if desired, but 'summary' might hide extraction.
  // Actually, to test the Hub layout, I should set it to 'detailed' or ensure the layout handles 'summary' too.
  // But the prompt implies "Archived Course" usually still has details.
  // I will add modules but keep it "completed".

  weeklyModules,
};

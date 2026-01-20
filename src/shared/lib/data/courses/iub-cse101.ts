import type { CourseData } from '@/shared/types';

export const iubCse101: CourseData = {
  id: 'iub-cse101',
  code: 'CSE 101',
  title: 'Introduction to Programming',
  institution: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: 'Fall',
  year: 2023,
  description:
    'Fundamentals of programming concepts, problem-solving techniques, and introduction to C programming language.',
  outcomes: [
    'Students can write well-structured C programs',
    'Students can solve complex problems using programming',
    'Students understand memory management and pointers',
    'Students can debug and optimize their code',
  ],
  technologies: ['C Programming', 'Code::Blocks', 'GCC Compiler', 'GitHub'],
  enrollmentCount: 45,
  rating: 4.7,
  iconName: 'Code2',
  status: 'completed',
  tier: 'standard',
};

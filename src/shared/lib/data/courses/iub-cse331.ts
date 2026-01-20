import type { CourseData } from '@/shared/types';

export const iubCse331: CourseData = {
  id: 'iub-finite-automata',
  code: 'CSE 331',
  title: 'Finite Automata and Computability',
  institution: 'IUB',
  level: 'undergraduate',
  credits: 3,
  semester: 'Fall',
  year: 2023,
  description:
    'Theory of computation including finite automata, regular expressions, context-free grammars, and Turing machines.',
  outcomes: [
    'Students understand formal language theory',
    'Students can design automata and grammars',
    'Students understand computability limits',
    'Students can prove language properties',
  ],
  technologies: ['JFLAP', 'Automata Simulator', 'LaTeX'],
  enrollmentCount: 28,
  rating: 4.2,
  iconName: 'Cpu',
  status: 'completed',
  tier: 'standard',
};

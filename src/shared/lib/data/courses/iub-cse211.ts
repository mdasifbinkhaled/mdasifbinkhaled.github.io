import type { CourseData } from '@/shared/types';
import { FACULTY } from '@/shared/lib/data/faculty';

export const iubCse211: CourseData = {
  id: 'iub-cse211',
  code: 'CSE 211',
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
  enrollmentCount: 0,
  rating: 0,
  iconName: 'Brain',
  status: 'ongoing',
  tier: 'detailed',
  links: [
    {
      title: 'Course Outline (Theory)',
      url: 'https://docs.google.com/document/d/10nD1Ao4XhV4BlDBgUX18qyV_9dUlwvzb/edit?usp=sharing&ouid=103481537481896376273&rtpof=true&sd=true',
      type: 'outline',
    },
    {
      title: 'Course Outline (Lab)',
      url: 'https://docs.google.com/document/d/1lLKafW3GkDltO92__eqn0_Iwyk2rCmPZ/edit?usp=sharing&ouid=103481537481896376273&rtpof=true&sd=true',
      type: 'outline',
    },
    {
      title: 'Lecture Slides (Drive)',
      url: 'https://drive.google.com/drive/folders/1Ill6_PRGVmZO7WxDHyP5x9RWfKwCSknH?usp=sharing',
      type: 'slides',
    },
    {
      title: 'Discord Server',
      url: 'https://discord.gg/qSp9gRAu',
      type: 'discord',
    },
    {
      title: 'Programming Contest (VJudge)',
      url: 'https://vjudge.net/contest/782172',
      type: 'problem-set',
    },
  ],
  resourceSections: [
    {
      title: 'Interactive Labs (Visualize It)',
      items: [
        {
          label: 'VisuAlgo',
          url: 'https://visualgo.net/en',
          description:
            'Visualize data structures and algorithms through animation.',
        },
        {
          label: 'Algorithm Visualizer',
          url: 'https://algorithm-visualizer.org/',
          description:
            'View code execution and visualization side-by-side (JS/Java/C++).',
        },
        {
          label: 'Python Tutor',
          url: 'https://pythontutor.com/',
          description:
            'Step through code execution to understand memory and recursion frames.',
        },
      ],
    },
    {
      title: 'Practice Arena (Build It)',
      items: [
        {
          label: 'CSES Problem Set',
          url: 'https://cses.fi/problemset/',
          description:
            'Standard collection of classic competitive programming problems.',
        },
        {
          label: 'LeetCode: Algorithms',
          url: 'https://leetcode.com/study-plan/algorithm/',
          description: 'Structured study plan for interview preparation.',
        },
        {
          label: 'CP-Algorithms',
          url: 'https://cp-algorithms.com/',
          description:
            'Comprehensive wiki with detailed explanations of advanced algorithms.',
        },
      ],
    },
    {
      title: 'Reference Library (Read It)',
      items: [
        {
          label: 'Grokking Algorithms',
          description:
            'Aditya Bhargava. A fully illustrated, friendly guide providing intuition.',
        },
        {
          label: 'The Algorithm Design Manual',
          description:
            "Steven Skiena. Focuses on real-world design and 'war stories'.",
        },
        {
          label: 'Introduction to Algorithms (CLRS)',
          description:
            'Cormen, Leiserson, Rivest, Stein. The definitive, comprehensive textbook.',
        },
      ],
    },
    {
      title: 'Video Lectures (Watch It)',
      items: [
        {
          label: 'Autumn 2020 Lectures (Archive)',
          url: 'https://drive.google.com/drive/folders/19RagPRHij-bEh4IMCRRAtiPVp735_Trn',
          description:
            'Complete video archive of the Autumn 2020 semester sessions.',
        },
        {
          label: 'Summer 2021 Python Lectures (Archive)',
          url: 'https://drive.google.com/drive/folders/1CGvatwCUcu7owNt5DLAbZUUKcR9ISuZc',
          description:
            'Video archive of the Python-based sessions from Summer 2021.',
        },
        {
          label: 'MIT 6.006: Intro to Algorithms',
          url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
          description:
            'World-class university lectures covering foundational topics.',
        },
        {
          label: "Abdul Bari's Algorithms",
          url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
          description:
            'Highly rated community tutorials simplifying complex concepts.',
        },
      ],
    },
  ],
  classSchedule: [
    {
      section: 1,
      theory: {
        faculty: FACULTY.MOTIUR.name,
        email: FACULTY.MOTIUR.email,
        days: 'ST',
        time: '08:00 - 09:30',
        room: 'BC6010',
      },
      lab: {
        faculty: FACULTY.JUNAYED.name,
        email: FACULTY.JUNAYED.email,
        days: 'W',
        time: '11:00 - 12:30',
        room: 'BC6004',
      },
    },
    {
      section: 2,
      theory: {
        faculty: FACULTY.ASIF.name,
        email: FACULTY.ASIF.email,
        days: 'ST',
        time: '09:40 - 11:10',
        room: 'BC6010',
      },
      lab: {
        faculty: FACULTY.JUNAYED.name,
        email: FACULTY.JUNAYED.email,
        days: 'W',
        time: '12:40 - 14:10',
        room: 'BC6004',
      },
    },
    {
      section: 3,
      theory: {
        faculty: FACULTY.ASIF.name,
        email: FACULTY.ASIF.email,
        days: 'MW',
        time: '08:00 - 09:30',
        room: 'BC6009',
      },
      lab: {
        faculty: FACULTY.SAS.name,
        email: FACULTY.SAS.email,
        days: 'T',
        time: '11:00 - 12:30',
        room: 'BC6004',
      },
    },
    {
      section: 4,
      theory: {
        faculty: FACULTY.MOTIUR.name,
        email: FACULTY.MOTIUR.email,
        days: 'MW',
        time: '09:40 - 11:10',
        room: 'BC6009',
      },
      lab: {
        faculty: FACULTY.SAS.name,
        email: FACULTY.SAS.email,
        days: 'T',
        time: '12:40 - 14:10',
        room: 'BC6004',
      },
    },
    {
      section: 5,
      theory: {
        faculty: FACULTY.MOSTAFIZ.name,
        email: FACULTY.MOSTAFIZ.email,
        days: 'ST',
        time: '11:20 - 12:50',
        room: 'BC6009',
      },
      lab: {
        faculty: FACULTY.SAS.name,
        email: FACULTY.SAS.email,
        days: 'M',
        time: '08:00 - 09:30',
        room: 'BC6004',
      },
    },
    {
      section: 6,
      theory: {
        faculty: FACULTY.MOSTAFIZ.name,
        email: FACULTY.MOSTAFIZ.email,
        days: 'ST',
        time: '13:00 - 14:30',
        room: 'BC6009',
      },
      lab: {
        faculty: FACULTY.JUNAYED.name,
        email: FACULTY.JUNAYED.email,
        days: 'M',
        time: '09:40 - 11:10',
        room: 'BC6004',
      },
    },
    {
      section: 7,
      theory: {
        faculty: FACULTY.ZAHANGIR.name,
        email: FACULTY.ZAHANGIR.email,
        days: 'ST',
        time: '14:40 - 16:10',
        room: 'BC6009',
      },
      lab: {
        faculty: FACULTY.SAS.name,
        email: FACULTY.SAS.email,
        days: 'M',
        time: '11:20 - 12:50',
        room: 'BC6004',
      },
    },
  ],
};

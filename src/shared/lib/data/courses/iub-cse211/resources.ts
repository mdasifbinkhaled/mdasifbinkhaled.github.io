import type { CourseLink, CourseResourceSection } from '@/shared/types';

export const links: CourseLink[] = [
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
    title: 'Previous Year Lectures',
    url: 'https://drive.google.com/drive/folders/19RagPRHij-bEh4IMCRRAtiPVp735_Trn',
    type: 'video',
  },
  {
    title: 'Python Cheat Sheet',
    url: 'https://github.com/ehmatthes/pcc_3e/blob/main/cheat_sheets/color_sheets/beginners_python_cheat_sheet_pcc_all.pdf',
    type: 'note',
  },
];

export const resourceSections: CourseResourceSection[] = [
  {
    title: 'Interactive Labs (Visualize It)',
    items: [
      {
        label: 'Red Blob Games (Graphs)',
        url: 'https://www.redblobgames.com/',
        description:
          'The world’s best interactive guide to A*, BFS, and pathfinding.',
      },
      {
        label: 'USFCA Visualizations',
        url: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html',
        description:
          'Classic, no-nonsense animations for sorting, trees, and graphs.',
      },
      {
        label: 'Big-O Cheat Sheet',
        url: 'https://www.bigocheatsheet.com/',
        description:
          'The definitive reference poster for time and space complexity.',
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
        label: 'VJudge Contest',
        url: 'https://vjudge.net/contest/782172',
        description: 'The official class programming contest.',
      },
    ],
  },
  {
    title: 'Course Materials',
    items: [
      {
        label: 'Course Outline (Theory)',
        url: 'https://docs.google.com/document/d/10nD1Ao4XhV4BlDBgUX18qyV_9dUlwvzb/edit?usp=sharing&ouid=103481537481896376273&rtpof=true&sd=true',
        description: 'Official syllabus and policy document.',
      },
      {
        label: 'Lecture Slides',
        url: 'https://drive.google.com/drive/folders/1Ill6_PRGVmZO7WxDHyP5x9RWfKwCSknH?usp=sharing',
        description: 'Google Drive folder with all class slides.',
      },
    ],
  },
];

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
    title: 'Python Cheat Sheet',
    url: 'https://github.com/ehmatthes/pcc_3e/blob/main/cheat_sheets/color_sheets/beginners_python_cheat_sheet_pcc_all.pdf',
    type: 'note',
  },
  {
    title: 'Discord Community',
    url: 'https://discord.gg/N5PSCt5q',
    type: 'discord',
  },
  {
    title: 'Anonymous Feedback',
    url: 'https://forms.gle/zpz4ZFWBgMyZB9h27',
    type: 'site',
  },
];

export const resourceSections: CourseResourceSection[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LEARN: Visualization & Interactive Tools
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'Interactive Labs (Visualize It)',
    items: [
      {
        label: 'VisuAlgo',
        url: 'https://visualgo.net/en',
        description:
          'Step-by-step algorithm animations used by top universities worldwide.',
        isNew: true,
      },
      {
        label: 'Red Blob Games (Graphs)',
        url: 'https://www.redblobgames.com/',
        description:
          "The world's best interactive guide to A*, BFS, and pathfinding.",
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

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE: Coding Challenges & Contests
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'Practice Arena (Build It)',
    items: [
      {
        label: 'VJudge Contest',
        url: 'https://vjudge.net/contest/782172',
        description: '🏆 The official class programming contest.',
      },
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
        label: 'AtCoder',
        url: 'https://atcoder.jp/',
        description:
          'High-quality algorithmic contests from Japan. Great for practice.',
        isNew: true,
      },
      {
        label: 'Codeforces EDU',
        url: 'https://codeforces.com/edu/courses',
        description:
          'Free courses on Segment Trees, DP, and more (ITMO Academy).',
        isNew: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE: Algorithms Encyclopedia
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'Reference & Deep Dives',
    items: [
      {
        label: 'CP-Algorithms',
        url: 'https://cp-algorithms.com/',
        description:
          'Comprehensive encyclopedia of algorithms with code and explanations.',
        isNew: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // READ: Recommended Learning Resources
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'Recommended Reading',
    items: [
      {
        label: 'MIT 6.006 Video Lectures',
        url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
        description:
          'World-renowned algorithm lectures from MIT (free, full course).',
        isNew: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS: Official Course Materials
  // ═══════════════════════════════════════════════════════════════════════════
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
      {
        label: 'Sample Case Studies & Problems',
        url: 'https://drive.google.com/drive/folders/19LFOumXwkUuqjf0JhlaI71rgGUNCjm69?usp=drive_link',
        description: 'Practice problems and case study materials.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VIDEO: Lecture Recordings
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: 'Video Archive',
    items: [
      {
        label: 'Previous Year Lectures',
        url: 'https://drive.google.com/drive/folders/19RagPRHij-bEh4IMCRRAtiPVp735_Trn',
        description: 'Recorded lectures from previous semesters.',
      },
    ],
  },
];

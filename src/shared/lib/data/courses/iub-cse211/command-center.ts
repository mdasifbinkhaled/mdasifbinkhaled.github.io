import type {
  CourseAnnouncement,
  CourseAssessmentSchemes,
  CourseNextMilestone,
  CourseQuickLink,
  CourseSectionRoster,
  CourseStaff,
  CourseUnit,
} from '@/shared/types';
import { links } from './resources';
import { cse211Term } from './term';

/** Resolve a quick-link URL from the canonical `links` list by title prefix. */
const linkUrl = (titlePrefix: string): string | undefined =>
  links.find((l) => l.title.startsWith(titlePrefix))?.url;

export const staff = {
  name: 'Md Asif Bin Khaled',
  role: 'Senior Lecturer · Instructor',
  initials: 'MK',
  email: 'mdasifbinkhaled@iub.edu.bd',
} satisfies CourseStaff;

export const nextMilestone = {
  label: 'Midterm Examination',
  detail: 'Date TBA · covers Weeks 1–6',
} satisfies CourseNextMilestone;

/** Syllabus grouped into the four course units. */
export const units = [
  {
    label: 'Unit I · Foundations',
    weeks: [
      {
        week: 1,
        title: 'Introduction to Algorithms',
        theory: 'Algorithm analysis, correctness, insertion sort',
        lab: 'Lab 0 — Review & intro to Google Colab',
      },
      {
        week: 2,
        title: 'Asymptotic Notation',
        theory: 'Big-O, Ω, Θ, growth of functions',
        lab: 'Lab 1 — Asymptotic analysis',
      },
      {
        week: 3,
        title: 'Recurrences',
        theory: 'Substitution method, recursion trees, Master theorem',
        lab: 'Lab 2 — Divide & conquer',
      },
    ],
  },
  {
    label: 'Unit II · Divide & Conquer · Data Structures',
    weeks: [
      {
        week: 4,
        title: 'Divide & Conquer',
        theory: 'Merge sort, quicksort, analysis',
        lab: 'Project discussion',
      },
      {
        week: 5,
        title: 'Heaps & Priority Queues',
        theory: 'Binary heaps, heapsort, priority-queue operations',
        lab: 'Heap implementation',
      },
    ],
  },
  {
    label: 'Unit III · Graph Algorithms',
    weeks: [
      {
        week: 6,
        title: 'Graph Basics',
        theory: 'Representation, BFS, DFS',
        lab: 'Graph traversal implementation',
      },
      {
        week: 7,
        title: 'Midterm Review',
        theory: 'Review of Weeks 1–6',
        lab: 'Mock midterm contest',
      },
      {
        week: 8,
        title: 'Shortest Paths',
        theory: 'Dijkstra, Bellman-Ford',
        lab: 'SSSP implementation',
      },
      {
        week: 9,
        title: 'Minimum Spanning Trees',
        theory: 'Prim, Kruskal',
        lab: 'MST implementation',
      },
    ],
  },
  {
    label: 'Unit IV · Dynamic Programming · Complexity',
    weeks: [
      {
        week: 10,
        title: 'Dynamic Programming I',
        theory: 'DP basics, rod cutting, memoization',
        lab: 'Basic DP problems',
      },
      {
        week: 11,
        title: 'Dynamic Programming II',
        theory: 'LCS, knapsack, matrix-chain multiplication',
        lab: 'Advanced DP problems',
      },
      {
        week: 12,
        title: 'Greedy Algorithms & Complexity',
        theory: 'Activity selection, Huffman, P vs NP',
        lab: 'Greedy problems & final contest',
      },
    ],
  },
] satisfies CourseUnit[];

export const quickLinks = [
  {
    label: 'Course Outline · Theory',
    icon: 'file-text',
    primary: true,
    url: linkUrl('Course Outline (Theory)'),
  },
  {
    label: 'Course Outline · Lab',
    icon: 'flask-conical',
    url: linkUrl('Course Outline (Lab)'),
  },
  {
    label: 'Lecture Slides',
    icon: 'presentation',
    primary: true,
    url: linkUrl('Lecture Slides'),
  },
  {
    label: 'Python Cheat Sheet',
    icon: 'code-2',
    url: linkUrl('Python Cheat Sheet'),
  },
  {
    label: 'Anonymous Feedback',
    icon: 'message-square',
    url: linkUrl('Anonymous Feedback'),
  },
  {
    label: 'Discord (CSE 211)',
    icon: 'message-circle',
    url: linkUrl('Discord'),
  },
] satisfies CourseQuickLink[];

/**
 * Dual assessment. Theory weights reflect the published outline; the lab
 * scheme is a marked DRAFT placeholder until the lab routine is finalized.
 * Exam dates are TBA, so the notice strip auto-collapses them to one row.
 */
export const assessmentSchemes = {
  theory: {
    label: 'CSE 211 · Theory',
    credits: 3,
    grading: [
      { label: 'Attendance', pct: 5 },
      { label: 'Assignments', pct: 10 },
      { label: 'Lab & contest', pct: 25 },
      { label: 'Midterm', pct: 25 },
      { label: 'Final', pct: 35 },
    ],
    exams: {
      midterm: {
        name: 'Midterm Examination',
        date: 'To be announced',
        seatPlan: 'Not published',
        syllabus: 'Weeks 1–6',
      },
      final: {
        name: 'Final Examination',
        date: 'To be announced',
        seatPlan: 'Not published',
        syllabus: 'Cumulative',
      },
    },
  },
  lab: {
    label: 'CSE 211L · Lab',
    credits: 1,
    placeholder: true,
    grading: [
      { label: 'Lab tasks', pct: 35 },
      { label: 'Lab attendance', pct: 10 },
      { label: 'Contest', pct: 20 },
      { label: 'Lab midterm', pct: 15 },
      { label: 'Lab final', pct: 20 },
    ],
    exams: {
      midterm: {
        name: 'Lab Midterm Evaluation',
        date: 'To be announced',
        seatPlan: 'Not published',
        syllabus: 'Labs 0–5',
      },
      final: {
        name: 'Lab Final Evaluation',
        date: 'To be announced',
        seatPlan: 'Not published',
        syllabus: 'All labs + project',
      },
    },
  },
} satisfies CourseAssessmentSchemes;

/**
 * Coordinator roster — every section across instructors. PLACEHOLDER rows:
 * instructor names, rooms, and some times are provisional ("TBA") until the
 * registrar's routine is published.
 */
export const sectionsRoster = {
  coordinator: true,
  note: "Placeholder roster — replace with the registrar's published routine once confirmed.",
  rows: [
    {
      sec: '01',
      type: 'Theory',
      instructor: 'Md Asif Bin Khaled',
      mine: true,
      days: 'Sun · Tue',
      time: '09:40–11:10',
      room: 'BC 2008',
    },
    {
      sec: '02',
      type: 'Theory',
      instructor: 'Instructor B — TBA',
      days: 'Sun · Tue',
      time: '11:20–12:50',
      room: 'Room — TBA',
    },
    {
      sec: '03',
      type: 'Theory',
      instructor: 'Instructor C — TBA',
      days: 'Mon · Wed',
      time: '09:40–11:10',
      room: 'Room — TBA',
    },
    {
      sec: 'L1',
      type: 'Lab',
      instructor: 'Md Asif Bin Khaled',
      mine: true,
      days: 'Thu',
      time: '11:20–14:20',
      room: 'BC 5012 (CL)',
    },
    {
      sec: 'L2',
      type: 'Lab',
      instructor: 'Instructor B — TBA',
      days: 'Thu',
      time: '14:30–17:30',
      room: 'Lab — TBA',
    },
  ],
} satisfies CourseSectionRoster;

export const announcements = [
  {
    tag: 'new',
    title: `${cse211Term.label} course page is now active.`,
    date: 'Posted 13 May 2026',
  },
  {
    tag: 'update',
    title:
      'Class routine, lab sections, and exam dates will be updated after official publication.',
    date: 'Posted 13 May 2026',
  },
] satisfies CourseAnnouncement[];

export const pastOfferings = ['Spring 2026', 'Fall 2025', 'Summer 2025'];

import type { AppCategory, AppDefinition } from '@/shared/types';

// ---------------------------------------------------------------------------
// Single source of truth for every app listed on the /apps hub page.
// Add, reorder, or mark tools as beta/planned here — no page-level edits needed.
// ---------------------------------------------------------------------------

export const apps: readonly AppDefinition[] = [
  // ── Grades ───────────────────────────────────────────────────────────
  {
    slug: 'grade-calculator',
    title: 'Grade Calculator',
    description:
      'Calculate your current class standing and dynamically project the required scores needed to achieve your target final grade.',
    icon: 'Calculator',
    status: 'active',
    category: 'grades',
  },
  {
    slug: 'gpa-calculator',
    title: 'GPA Calculator',
    description:
      'Compute your semester GPA and cumulative CGPA across multiple credit-weighted courses.',
    icon: 'Brain',
    status: 'active',
    category: 'grades',
  },

  // ── Planning ─────────────────────────────────────────────────────────
  {
    slug: 'seat-planner',
    title: 'Seat Planner',
    description:
      'Generate exam seating arrangements with room assignments, master lists, and printable signature sheets.',
    icon: 'Building2',
    status: 'active',
    category: 'planning',
  },
  {
    slug: 'course-planner',
    title: 'Course Planner',
    description:
      'Visualize prerequisite chains in topological order, track completed courses, and plan your next semester.',
    icon: 'GitBranch',
    status: 'active',
    category: 'planning',
  },
  {
    slug: 'exam-countdown',
    title: 'Exam Countdown',
    description:
      'Keep track of upcoming midterms and finals with real-time countdown timers.',
    icon: 'Timer',
    status: 'active',
    category: 'planning',
  },
  {
    slug: 'office-hours',
    title: 'Office Hours',
    description:
      'View office hours schedule and availability for 1-on-1 counseling sessions.',
    icon: 'CalendarDays',
    status: 'active',
    category: 'planning',
  },

  // ── Productivity ─────────────────────────────────────────────────────
  {
    slug: 'study-timer',
    title: 'Study Timer',
    description:
      'Pomodoro-style focus timer with configurable work/break intervals, session tracking, and daily stats.',
    icon: 'Clock',
    status: 'active',
    category: 'productivity',
  },
] as const;

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

export const appCategories: Record<AppCategory, string> = {
  grades: 'Grades & GPA',
  planning: 'Planning & Scheduling',
  productivity: 'Productivity',
};

/** Return apps grouped by their category, preserving declaration order. */
export function getAppsByCategory(): {
  category: AppCategory;
  label: string;
  items: AppDefinition[];
}[] {
  const order: AppCategory[] = ['grades', 'planning', 'productivity'];
  return order
    .map((cat) => ({
      category: cat,
      label: appCategories[cat],
      items: apps.filter((a) => a.category === cat),
    }))
    .filter((g) => g.items.length > 0);
}

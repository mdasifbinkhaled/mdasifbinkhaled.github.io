// ────────────────────────────────────────────────
// Exam Countdown — pure helpers + types
// (no 'use client' — this file has zero side-effects)
// ────────────────────────────────────────────────

import type { SchemaField } from '@/shared/lib/parsers/types';

export interface ExamEvent {
  id: string;
  course: string;
  title: string;
  date: string; // ISO string format
}

export type ExamKey = 'course' | 'title' | 'date';

export const EXAM_TOOL_SLUG = 'exam-countdown';

export const DEFAULT_EXAMS: ExamEvent[] = [
  {
    id: '1',
    course: 'CSE 420',
    title: 'Midterm Examination',
    date: new Date(
      new Date().getTime() + 14 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }, // +14 days
  {
    id: '2',
    course: 'CSE 211',
    title: 'Final Examination',
    date: new Date(
      new Date().getTime() + 45 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }, // +45 days
];

export const EXAM_FIELDS: readonly SchemaField<ExamKey>[] = [
  {
    key: 'course',
    label: 'Course',
    required: true,
    aliases: ['course', 'course code', 'code'],
  },
  {
    key: 'title',
    label: 'Title',
    required: true,
    aliases: ['title', 'exam', 'exam title', 'name'],
  },
  {
    key: 'date',
    label: 'Date',
    required: true,
    aliases: ['date', 'when', 'datetime', 'start', 'exam date'],
    parse: (raw) => {
      const d = new Date(String(raw));
      if (Number.isNaN(d.getTime())) {
        throw new Error(`invalid date "${raw}"`);
      }
      return d.toISOString();
    },
  },
];

export interface TimeRemaining {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  isPassed: boolean;
}

export function computeTimeRemaining(
  dateIso: string,
  now: number
): TimeRemaining {
  const target = new Date(dateIso).getTime();
  const diff = target - now;
  const isPassed = diff < 0;
  const abs = Math.abs(diff);

  return {
    days: Math.floor(abs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((abs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((abs % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((abs % (1000 * 60)) / 1000),
    isPassed,
  };
}

export interface UrgencyClasses {
  urgencyClass: string;
  accentColor: string;
  countdownColor: string;
}

export function getUrgencyClasses(
  isPassed: boolean,
  days: number
): UrgencyClasses {
  const urgencyClass = isPassed
    ? 'opacity-60 border-muted'
    : days <= 1
      ? 'border-red-500/50 shadow-red-500/10 shadow-md'
      : days <= 3
        ? 'border-orange-500/40 shadow-orange-500/10 shadow-sm'
        : days <= 7
          ? 'border-amber-500/30 shadow-xs'
          : 'border-primary/20 shadow-xs';

  const accentColor = isPassed
    ? 'bg-muted'
    : days <= 1
      ? 'bg-red-500'
      : days <= 3
        ? 'bg-orange-500'
        : days <= 7
          ? 'bg-amber-500'
          : 'bg-primary';

  const countdownColor = isPassed
    ? 'text-muted-foreground'
    : days <= 1
      ? 'text-red-600 dark:text-red-400'
      : days <= 3
        ? 'text-orange-600 dark:text-orange-400'
        : 'text-foreground';

  return { urgencyClass, accentColor, countdownColor };
}

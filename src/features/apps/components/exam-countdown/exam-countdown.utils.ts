// ────────────────────────────────────────────────
// Exam Countdown — pure helpers + types
// (no 'use client' — this file has zero side-effects)
// ────────────────────────────────────────────────

import type { SchemaField } from '@/shared/lib/parsers/types';

export interface ExamEvent {
  id: string;
  course: string;
  title: string;
  /**
   * Naive local wall-clock, `YYYY-MM-DDThh:mm` — the exact format a
   * `<input type="datetime-local">` produces and consumes. Parsed as LOCAL by
   * `new Date(...)`. Every producer (defaults, add, import) must use this format
   * so the countdown isn't skewed by the user's timezone offset.
   */
  date: string;
}

export type ExamKey = 'course' | 'title' | 'date';

export const EXAM_TOOL_SLUG = 'exam-countdown';

/**
 * Format a Date as a naive local `YYYY-MM-DDThh:mm` string (the canonical
 * `ExamEvent.date` shape). Uses local getters so the value round-trips through
 * `new Date(...)` with no timezone shift — unlike `toISOString()`, which emits
 * UTC and desyncs the countdown for any non-UTC user.
 */
export function toLocalInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

const DAY_MS = 24 * 60 * 60 * 1000;

export const DEFAULT_EXAMS: ExamEvent[] = [
  {
    id: '1',
    course: 'CSE 420',
    title: 'Midterm Examination',
    date: toLocalInputValue(new Date(Date.now() + 14 * DAY_MS)),
  }, // +14 days
  {
    id: '2',
    course: 'CSE 211',
    title: 'Final Examination',
    date: toLocalInputValue(new Date(Date.now() + 45 * DAY_MS)),
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
      // Normalize to the canonical naive-local format (see ExamEvent.date).
      return toLocalInputValue(d);
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
      ? 'border-destructive/50 shadow-destructive/10 shadow-md'
      : days <= 3
        ? 'border-warning/40 shadow-warning/10 shadow-sm'
        : days <= 7
          ? 'border-warning/30 shadow-xs'
          : 'border-primary/20 shadow-xs';

  const accentColor = isPassed
    ? 'bg-muted'
    : days <= 1
      ? 'bg-destructive'
      : days <= 3
        ? 'bg-warning'
        : days <= 7
          ? 'bg-warning/70'
          : 'bg-primary';

  const countdownColor = isPassed
    ? 'text-muted-foreground'
    : days <= 1
      ? 'text-destructive'
      : days <= 3
        ? 'text-warning-emphasis'
        : 'text-foreground';

  return { urgencyClass, accentColor, countdownColor };
}

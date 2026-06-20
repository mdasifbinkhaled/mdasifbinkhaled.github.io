import type { IconName } from '@/shared/components/common/icons';

/**
 * Teaching Domain Types
 * Centralized type definitions for all teaching-related components
 */

export interface TeachingActivity {
  id: string;
  type: 'support' | 'workshop' | 'seminar';
  title: string;
  role?: string;
  institution: string;
  description: string;
  period?: string;
  students?: number;
  iconName?: IconName;
}

/**
 * Teaching statistics
 */
export interface TeachingStats {
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  yearsTeaching: number;
}

/**
 * Honest, single-sourced teaching figures derived from the course list
 * (drives the /teaching figure strip). No invented "students mentored".
 */
export interface TeachingFigures {
  courses: number;
  years: number;
  institutions: number;
  creditHours: number;
  /** Mean of rated courses (rating present and > 0); 0 if none rated. */
  avgRating: number;
  ratedCount: number;
  earliestYear: number;
}

/* ── Supervision (thesis / directed research) ─────────────────────────── */
export type SupervisionStatus = 'Ongoing' | 'Completed';

export interface SupervisionMember {
  name: string;
  role: string;
  /** Monogram avatar initials. */
  initials: string;
}

export interface SupervisionRecord {
  level: string;
  topic: string;
  year: string;
  status: SupervisionStatus;
  abstract: string;
  members: SupervisionMember[];
}

/* ── Teaching assistants ──────────────────────────────────────────────── */
export interface TeachingAssistantRecord {
  name: string;
  course: string;
  title: string;
  term: string;
  role: string;
}

/**
 * A draft-flagged records section: when `draft` is true the UI shows a visible
 * "Sample" badge + note (records aren't in public data yet). Replace the rows
 * and drop the flag once real data exists.
 */
export interface DraftRecords<T> {
  draft: boolean;
  note: string;
  rows: T[];
}

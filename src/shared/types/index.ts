// Shared type definitions
// All domain types are plain TypeScript interfaces. No runtime schema validation.

import type { IconName } from '@/shared/components/common/icons';

export type { AppStatus, AppCategory, AppDefinition } from './apps';

export type PublicationType =
  | 'Conference'
  | 'Journal'
  | 'Workshop'
  | 'Preprint'
  | 'In Progress'
  | 'Book Chapter'
  | 'Thesis';

export interface PublicationItem {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: PublicationType;
  link?: string;
  pdfLink?: string;
  abstract?: string;
  keywords?: string[];
  doi?: string;
  pages?: string;
  volume?: string;
  issue?: string;
}

export type ExperienceType =
  | 'Academic'
  | 'Research'
  | 'Industry'
  | 'Teaching Support';

export interface ExperienceItem {
  id: string;
  title: string;
  institution: string;
  location?: string;
  duration: string;
  description: string[];
  logoUrl?: string | null;
  tags?: string[];
  type?: ExperienceType;
}

export type CourseInstitution = 'IUB' | 'BRACU';
export type CourseLevel = 'undergraduate' | 'graduate';
export type CourseStatus = 'completed' | 'ongoing' | 'upcoming';
export type CourseTier = 'summary' | 'standard' | 'detailed';

export interface CourseLink {
  title: string;
  url: string;
  type:
    | 'outline'
    | 'slides'
    | 'discord'
    | 'site'
    | 'video'
    | 'problem-set'
    | 'note'
    | 'other';
}

export interface CourseResourceSectionItem {
  label: string;
  url?: string;
  description?: string;
  icon?: IconName;
  isNew?: boolean;
}

export interface CourseResourceSection {
  title: string;
  items: CourseResourceSectionItem[];
}

export interface CourseContest {
  title: string;
  url: string;
  startDate?: string;
  endDate?: string;
  platform?: string;
  /** Short subtitle shown on the course-page contest CTA. */
  sub?: string;
}

export interface CourseConsultation {
  office?: string;
  hours: string;
  phone?: string;
  note?: string;
}

/* ---------------------------------------------------------------------------
 * Course-page "Command Center" template types.
 * One data-driven CoursePage renders active + completed courses defensively.
 * All fields below are additive/optional on CourseData so existing tiered
 * courses (summary/standard, and detailed courses still on the legacy layout)
 * are unaffected.
 * ------------------------------------------------------------------------- */

/** Icon names the course-page template understands (mapped to lucide-react). */
export type CourseIconName =
  | 'file-text'
  | 'flask-conical'
  | 'presentation'
  | 'code-2'
  | 'message-square'
  | 'message-circle'
  | 'book-open'
  | 'list-checks'
  | 'eye'
  | 'trophy'
  | 'folder'
  | 'link'
  | 'graduation-cap'
  | 'video';

export interface CourseStaff {
  name: string;
  role: string;
  initials: string;
  email?: string;
}

export interface CourseNextMilestone {
  label: string;
  detail: string;
}

export interface CourseGradeItem {
  label: string;
  pct: number;
}

export interface CourseExamEntry {
  name: string;
  date: string;
  seatPlan?: string;
  syllabus?: string;
}

export interface CourseSchemeExams {
  midterm?: CourseExamEntry;
  final?: CourseExamEntry;
}

/** One assessment scheme (e.g. Theory or Lab) with its grade breakdown. */
export interface CourseScheme {
  label: string;
  credits?: number;
  /** Marks the scheme as a provisional DRAFT in the UI. */
  placeholder?: boolean;
  grading: CourseGradeItem[];
  exams?: CourseSchemeExams;
}

export interface CourseAssessmentSchemes {
  theory?: CourseScheme;
  lab?: CourseScheme;
}

export interface CourseRosterRow {
  sec: string;
  type: 'Theory' | 'Lab';
  instructor: string;
  /** Highlights rows taught by the page owner (enables the All/Mine toggle). */
  mine?: boolean;
  days: string;
  time: string;
  room: string;
}

export interface CourseSectionRoster {
  coordinator?: boolean;
  note?: string;
  rows: CourseRosterRow[];
}

export interface CourseQuickLink {
  label: string;
  url?: string;
  icon: CourseIconName;
  primary?: boolean;
}

export type CourseAnnouncementTag = 'new' | 'update' | 'exam' | 'soon' | 'info';

export interface CourseAnnouncement {
  tag: CourseAnnouncementTag;
  title: string;
  date?: string;
  /** Section id to deep-link to when the notice is clicked. */
  target?: string;
}

export interface CourseMaterial {
  label: string;
  icon: CourseIconName;
  url?: string;
}

/** A syllabus week (string `week` supports ranges like "8–9"). */
export interface CourseSyllabusWeek {
  week: number | string;
  title: string;
  theory?: string;
  lab?: string;
  materials?: CourseMaterial[];
}

export interface CourseUnit {
  label: string;
  weeks: CourseSyllabusWeek[];
}

export interface CourseSummaryStat {
  k: string;
  v: string;
}

/** Retrospective band content for completed courses. */
export interface CourseSummary {
  headline: string;
  detail: string;
  stats: CourseSummaryStat[];
}

export interface CourseData {
  id: string;
  code: string;
  slug?: string;
  title: string;
  institution: CourseInstitution;
  level: CourseLevel;
  credits: number;
  semester: 'Spring' | 'Summer' | 'Fall' | 'Winter';
  year: number;
  description: string;
  outcomes: string[];
  objectives?: string[];
  technologies?: string[];
  assignments?: {
    title: string;
    link?: string;
    dueDate?: string;
    status?: 'active' | 'closed' | 'upcoming';
    description?: string;
  }[];
  enrollmentCount?: number;
  rating?: number;
  feedback?: string[];
  iconName?: IconName;
  status?: CourseStatus;
  tier?: CourseTier;
  resourceSections?: CourseResourceSection[];
  activeContest?: CourseContest;
  consultation?: CourseConsultation;

  /* ---- Course-page "Command Center" template fields (all optional) ---- */
  /** Short institution label for the hero meta line (e.g. "IUB"). */
  institutionShort?: string;
  tagline?: string;
  /** Live week number; if omitted the page computes it from the term start. */
  currentWeek?: number;
  totalWeeks?: number;
  staff?: CourseStaff;
  nextMilestone?: CourseNextMilestone;
  /** Unit-grouped syllabus weeks (drives the syllabus + "this week" band). */
  units?: CourseUnit[];
  sectionsRoster?: CourseSectionRoster;
  quickLinks?: CourseQuickLink[];
  /** Dual theory/lab grade schemes — the single assessment model. */
  assessmentSchemes?: CourseAssessmentSchemes;
  announcements?: CourseAnnouncement[];
  /** Retrospective band content (completed courses). */
  summary?: CourseSummary;
  pastOfferings?: string[];
  /** ISO date the term began — used to compute the live current week. */
  termStartDate?: string;
  /** Opt a detailed course into the full-width "Command Center" course page. */
  template?: 'command-center';
}

// Navigation types
export interface NavItem {
  href: string;
  label: string;
  icon?: IconName;
  sectionId: string;
  external?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

// Skill types
export interface Skill {
  category: string;
  iconName?: string;
  items: string[];
}

// Theme types
export type ThemeName =
  | 'light'
  | 'dark'
  | 'ocean'
  | 'forest'
  | 'lavender'
  | 'slate';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  description: string;
  category: 'classic' | 'natural' | 'vibrant' | 'professional';
  preview: {
    background: string;
    foreground: string;
    primary: string;
  };
}

// News types
export interface NewsItem {
  /** Unique identifier for stable React keys */
  id: string;
  /** Display date (e.g., '[2025/03]') */
  date: string;
  /** Main text content */
  text: string;
  /** Optional highlighted portion (displayed in accent color) */
  highlight?: string;
  /** Optional description following the highlight */
  description?: string;
}

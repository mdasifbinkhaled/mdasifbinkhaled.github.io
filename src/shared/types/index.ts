// Shared type definitions
// All domain types are plain TypeScript interfaces. No runtime schema validation.

import type { IconName } from '@/shared/components/common/icons';

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

export interface CourseAssessmentBreakdown {
  midterm?: number;
  final?: number;
  assignments?: number;
  projects?: number;
  quizzes?: number;
  participation?: number;
}

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

export interface ClassScheduleItem {
  section: number;
  theory: {
    faculty: string;
    email?: string;
    days: string;
    time: string;
    room: string;
  };
  lab: {
    faculty: string;
    email?: string;
    days: string;
    time: string;
    room: string;
  };
}

export interface CourseNotice {
  id: string;
  title: string;
  date: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  link?: string;
  importance?: 'high' | 'medium' | 'low';
}

export interface CourseContest {
  title: string;
  url: string;
  startDate?: string;
  endDate: string;
  platform?: string;
}

export interface CourseModule {
  week: number;
  title: string;
  description?: string;
  theory?: {
    topic: string;
    slides?: string;
    recording?: string;
  };
  lab?: {
    topic: string;
    task?: string;
    repo?: string;
  };
}

export interface CourseExams {
  midterm?: {
    date?: string;
    seatPlanUrl?: string;
    syllabus?: string;
  };
  final?: {
    date?: string;
    seatPlanUrl?: string;
  };
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
  topics?: string[];
  technologies?: string[];
  assignments?: {
    title: string;
    link?: string;
    dueDate?: string;
    status?: 'active' | 'closed' | 'upcoming';
    description?: string;
  }[];
  projects?: string[];
  assessment?: CourseAssessmentBreakdown;
  enrollmentCount?: number;
  rating?: number;
  feedback?: string[];
  iconName?: IconName;
  status?: CourseStatus;
  tier?: CourseTier;
  links?: CourseLink[];
  resourceSections?: CourseResourceSection[];
  classSchedule?: ClassScheduleItem[];
  semesterEndDate?: string;
  notices?: CourseNotice[];
  activeContest?: CourseContest;
  weeklyModules?: CourseModule[];
  exams?: CourseExams;
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
  items: string[];
}

// Academic types
export interface AcademicAward {
  id: string;
  title: string;
  organization: string;
  year: number;
  description: string;
  type: 'award' | 'grant' | 'fellowship' | 'recognition';
  amount?: string;
  duration?: string;
}

export interface ResearchArea {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  publicationCount?: number;
  icon?: IconName;
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

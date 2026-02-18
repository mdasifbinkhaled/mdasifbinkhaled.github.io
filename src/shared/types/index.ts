// Shared type definitions
// Types with Zod schemas are re-exported from validation/schemas.ts

import type { IconName } from '@/shared/components/common/icons';

// Re-exported from Zod schemas (Single Source of Truth)
export type {
  PublicationType,
  PublicationItem,
  ExperienceType,
  ExperienceItem,
  CourseInstitution,
  CourseLevel,
  CourseStatus,
  CourseTier,
  CourseAssessmentBreakdown,
  CourseData,
  CourseLink,
  CourseResourceSection,
  ClassScheduleItem,
} from '@/shared/lib/validation/schemas';

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

// Extended course types (composition pattern)
export interface BaseCourseInfo {
  id: string;
  code: string;
  title: string;
  institution: 'IUB' | 'BRACU';
  level: 'undergraduate' | 'graduate';
  credits: number;
  semester: string;
  year: number;
  description: string;
  outcomes: string[];
}

export interface CourseDetails {
  objectives?: string[];
  topics?: string[];
  technologies?: string[];
  assignments?: string[];
  projects?: string[];
}

export interface CourseMetrics {
  enrollmentCount?: number;
  rating?: number;
  feedback?: string[];
}

export interface CoursePresentation {
  iconName?: IconName;
  status?: 'completed' | 'ongoing' | 'upcoming';
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

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

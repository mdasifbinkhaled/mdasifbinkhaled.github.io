/**
 * ==========================================
 * SHARED TYPE DEFINITIONS
 * ==========================================
 *
 * Central type exports for the application.
 * Types with Zod schemas are re-exported from validation/schemas.ts
 * to maintain a Single Source of Truth.
 *
 * @version 4.0
 * @author Md Asif Bin Khaled
 */

import type { IconName } from '@/shared/components/common/icons';

// ============================================================================
// RE-EXPORTED FROM ZOD SCHEMAS (Single Source of Truth)
// ============================================================================
// These types are derived from Zod schemas for runtime validation consistency.

export type {
  PublicationType,
  PublicationItem,
  ExperienceType,
  ExperienceItem,
  CourseInstitution,
  CourseLevel,
  CourseStatus,
  CourseAssessmentBreakdown,
  CourseData,
} from '@/shared/lib/validation/schemas';

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export interface NavItem {
  href: string;
  label: string;
  icon?: IconName;
  sectionId: string;
  external?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

// ============================================================================
// SKILL TYPES
// ============================================================================

export interface Skill {
  category: string;
  items: string[];
}

// ============================================================================
// EXTENDED COURSE TYPES (for composition pattern)
// ============================================================================

// Core course information (for selective imports)
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

// Optional course details (curriculum-related)
export interface CourseDetails {
  objectives?: string[];
  topics?: string[];
  technologies?: string[];
  assignments?: string[];
  projects?: string[];
}

// Optional course metrics (feedback and statistics)
export interface CourseMetrics {
  enrollmentCount?: number;
  rating?: number;
  feedback?: string[];
}

// Optional course presentation
export interface CoursePresentation {
  iconName?: IconName;
  status?: 'completed' | 'ongoing' | 'upcoming';
}

// ============================================================================
// ACADEMIC TYPES
// ============================================================================

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

// ============================================================================
// THEME TYPES
// ============================================================================

export type ThemeName =
  | 'light'
  | 'dark'
  | 'ocean'
  | 'warm'
  | 'forest'
  | 'midnight'
  | 'sunset'
  | 'lavender'
  | 'slate'
  | 'crimson'
  | 'emerald'
  | 'indigo'
  | 'vintage';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  description: string;
  category: 'classic' | 'dramatic' | 'natural' | 'vibrant' | 'professional';
  preview: {
    background: string;
    foreground: string;
    primary: string;
  };
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

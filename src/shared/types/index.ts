import type { IconName } from '@/shared/components/common/icons'; // Added import

export type PublicationType =
  | 'Conference'
  | 'Journal'
  | 'Workshop'
  | 'Preprint'
  | 'In Progress'
  | 'Book Chapter'
  | 'Thesis';

export interface ExperienceItem {
  id: string;
  title: string;
  institution: string;
  location?: string;
  duration: string;
  description: string[];
  logoUrl?: string | null;
  tags?: string[];
  type?: 'Academic' | 'Research' | 'Industry' | 'Teaching Support';
}

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

export interface NavItem {
  href: string;
  label: string;
  icon?: IconName; // Changed from LucideIcon to IconName (string)
  sectionId: string;
  external?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

export interface Skill {
  category: string;
  items: string[];
}

// Enhanced academic-specific types
export type CourseInstitution = 'IUB' | 'BRACU';
export type CourseLevel = 'undergraduate' | 'graduate';
export type CourseStatus = 'completed' | 'ongoing' | 'upcoming';

export interface CourseAssessmentBreakdown {
  midterm?: number;
  final?: number;
  assignments?: number;
  projects?: number;
  quizzes?: number;
  participation?: number;
}

// Core course information (required fields only)
export interface BaseCourseInfo {
  id: string;
  code: string;
  title: string;
  institution: CourseInstitution;
  level: CourseLevel;
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
  assessment?: CourseAssessmentBreakdown;
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
  status?: CourseStatus;
}

// Complete course data type combining all interfaces
export interface CourseData
  extends BaseCourseInfo,
    CourseDetails,
    CourseMetrics,
    CoursePresentation {}

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

// Theme-related types
export type ThemeName = 'light' | 'dark';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  description: string;
  category: 'classic' | 'dramatic';
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

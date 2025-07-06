import type { IconName } from '@/components/icons'; // Added import

export type PublicationType = 'Conference' | 'Journal' | 'Workshop' | 'Preprint' | 'In Progress' | 'Book Chapter' | 'Thesis';

export interface ExperienceItem {
  id: string;
  title: string;
  institution: string;
  location?: string;
  duration: string;
  description: string | string[];
  logoUrl?: string;
  tags?: string[];
  type?: 'Academic' | 'Research' | 'Industry' | 'Teaching Support';
}

export interface PublicationItem {
  id:string;
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
  label:string;
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
export interface CourseData {
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
  technologies?: string[];
  projects?: string[];
  enrollmentCount?: number;
  iconName?: IconName;
}

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
export type ThemeName = 'light' | 'dark' | 'retro' | 'cyberpunk' | 'ocean';

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

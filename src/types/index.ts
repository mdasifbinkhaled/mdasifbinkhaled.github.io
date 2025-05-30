import type { LucideIcon } from 'lucide-react';

export type PublicationType = 'Conference' | 'Journal' | 'Workshop' | 'Preprint' | 'In Progress' | 'Book Chapter' | 'Thesis';

export interface ExperienceItem {
  id: string;
  title: string;
  institution: string; // Changed from company to institution for academic context
  location?: string;
  duration: string;
  description: string | string[]; // Can be a single string or array of bullet points
  logoUrl?: string;
  logoAiHint?: string;
  tags?: string[];
  type?: 'Academic' | 'Research' | 'Industry' | 'Teaching Support'; // To categorize experiences
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
  icon?: LucideIcon; // Making icon optional as not all navs might have one
  sectionId: string; // For scroll-spy or page identification
  external?: boolean;
  disabled?: boolean;
  children?: NavItem[]; // For nested navigation, e.g., in-page teaching sidebar
}

export interface Skill {
  category: string;
  items: string[];
}

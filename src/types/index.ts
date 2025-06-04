import type { LucideIcon } from 'lucide-react';
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

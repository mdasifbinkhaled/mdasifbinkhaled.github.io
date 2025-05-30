export type PublicationType = 'Conference' | 'Journal' | 'Workshop' | 'Preprint' | 'In Progress' | 'Book Chapter' | 'Thesis';

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  logoUrl?: string;
  logoAiHint?: string;
  tags?: string[];
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
}

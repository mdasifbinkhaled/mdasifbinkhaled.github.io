import { assetPaths, getAssetUrl, SITE_URL } from './assets';

type SiteLinks = {
  github: string;
  linkedin: string;
  googleScholar: string;
  researchGate: string;
  orcid: string;
  academiaEdu: string;
  iubAcademic: string;
  cv: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  url: string;
  ogImage: string;
  links: SiteLinks;
  keywords: string[];
  author: string;
  /** Given name for structured data */
  givenName: string;
  /** Family name for structured data */
  familyName: string;
  email: string;
  phone: string;
  address: string;
  /** Short job role (e.g. Senior Lecturer) */
  role: string;
  /** Primary job title for consistent usage across the site */
  jobTitle: string;
  /** Current institution */
  institution: string;
  /** Short institution name */
  institutionShort: string;
  /** Department name */
  department: string;
  /** School/Faculty name */
  school: string;
};

export const siteConfig: SiteConfig = {
  name: 'Md Asif Bin Khaled - Academic Portfolio',
  shortName: 'Md Asif Bin Khaled',
  description:
    'The professional academic portfolio of Md Asif Bin Khaled, Senior Lecturer & Researcher. Showcasing research in Explainable AI (XAI) and Multimodal AI (MMAI) for healthcare, teaching experience, publications, and grants.',
  url: SITE_URL,
  ogImage: getAssetUrl(assetPaths.ogImage),
  links: {
    github: 'https://github.com/mdasifbinkhaled',
    linkedin: 'https://linkedin.com/in/mdasifbinkhaled/',
    googleScholar:
      'https://scholar.google.com/citations?user=QIPrqWgAAAAJ&hl=en',
    researchGate: 'https://www.researchgate.net/profile/Md-Asif-Bin-Khaled',
    orcid: 'https://orcid.org/0000-0001-8811-0826',
    academiaEdu: 'https://iub-bd.academia.edu/mdasifbinkhaled',
    iubAcademic:
      'https://iub.ac.bd/academics/departments/cse/faculty-and-staff/mdasifbinkhaled',
    cv: assetPaths.cv,
  },
  keywords: [
    'Md Asif Bin Khaled',
    'mabk',
    'mdasifbinkhaled',
    'Senior Lecturer',
    'Researcher',
    'academic portfolio',
    'research',
    'publications',
    'teaching',
    'experience',
    'computer science',
    'machine learning',
    'Explainable AI',
    'XAI',
    'Multimodal AI',
    'MMAI',
    'Computer Vision',
    'CV',
    'Healthcare AI',

    'IUB',
    'BRACU',
    'Bangladesh',
  ],
  author: 'Md Asif Bin Khaled',
  givenName: 'Md Asif',
  familyName: 'Bin Khaled',
  email: 'mdasifbinkhaled@gmail.com',
  phone: '(+88) 01676076329',
  address: 'Dhaka, Bangladesh',
  role: 'Senior Lecturer',
  jobTitle: 'Senior Lecturer & Researcher',
  institution: 'Independent University, Bangladesh (IUB)',
  institutionShort: 'IUB',
  department: 'Computer Science & Engineering',
  school: 'School of Engineering, Technology & Sciences (SETS)',
};

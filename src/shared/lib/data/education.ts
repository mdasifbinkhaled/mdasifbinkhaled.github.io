import { GraduationCap } from 'lucide-react';

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  distinction: string;
  thesis: {
    title: string;
    advisor: string;
  };
  achievements?: string[];
  icon: typeof GraduationCap;
}

export const educationData: EducationItem[] = [
  {
    id: 'msc-iub',
    degree: 'M.Sc in Computer Science',
    institution: 'Independent University, Bangladesh (IUB)',
    location: 'Dhaka, Bangladesh',
    duration: 'May 2017 - Dec 2018',
    distinction: 'Graduated with Distinction (Cum Laude)',
    thesis: {
      title:
        'Word Sense Disambiguation of Bengali Words using FP-Growth Algorithm',
      advisor: 'Dr. Mahady Hasan',
    },
    icon: GraduationCap,
  },
  {
    id: 'bsc-bracu',
    degree: 'B.Sc in Computer Science and Engineering',
    institution: 'BRAC University (BRACU)',
    location: 'Dhaka, Bangladesh',
    duration: 'Jan 2013 - Apr 2017',
    distinction: 'Graduated with Highest Distinction (Summa Cum Laude)',
    thesis: {
      title:
        'Exploring Deep Features: Deeper Fully Convolutional Neural Network for Image Segmentation',
      advisor: 'Mr. Moin Mostakim',
    },
    achievements: [
      "Achieved Vice Chancellor's Award for Academic Excellence 6 times.",
    ],
    icon: GraduationCap,
  },
];

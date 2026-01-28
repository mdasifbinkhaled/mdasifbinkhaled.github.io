import { GraduationCap } from 'lucide-react';
import { educationArraySchema, validateData } from '../validation/schemas';
import type { z } from 'zod';

// Infer type from schema to ensure consistency
export type EducationItem = z.infer<typeof educationArraySchema>[number] & {
  // Add back the non-serializable component properties that Zod skips
  icon: typeof GraduationCap;
};

const rawEducationData: EducationItem[] = [
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

export const educationData = validateData(
  rawEducationData,
  educationArraySchema,
  'education'
);

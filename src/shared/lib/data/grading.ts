/**
 * Grading Scale Data
 * Common university grading scales (BRACU/IUB hybrid or standard US)
 */
import type { GradingScale } from '@/shared/types/tools';

export const STANDARD_GRADING_SCALE: GradingScale[] = [
  { label: 'A', minPercentage: 90, gpa: 4.0 },
  { label: 'A-', minPercentage: 85, gpa: 3.7 },
  { label: 'B+', minPercentage: 80, gpa: 3.3 },
  { label: 'B', minPercentage: 75, gpa: 3.0 },
  { label: 'B-', minPercentage: 70, gpa: 2.7 },
  { label: 'C+', minPercentage: 65, gpa: 2.3 },
  { label: 'C', minPercentage: 60, gpa: 2.0 },
  { label: 'C-', minPercentage: 55, gpa: 1.7 },
  { label: 'D+', minPercentage: 50, gpa: 1.3 },
  { label: 'D', minPercentage: 45, gpa: 1.0 },
  { label: 'F', minPercentage: 0, gpa: 0.0 },
];

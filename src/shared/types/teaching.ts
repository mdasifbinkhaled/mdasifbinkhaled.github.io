/**
 * Teaching Domain Types
 * Centralized type definitions for all teaching-related components
 */

// Re-export Testimonial from Zod schemas (Single Source of Truth)
export type { Testimonial } from '@/shared/lib/validation/schemas';

/**
 * Teaching statistics
 */
export interface TeachingStats {
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  yearsTeaching: number;
  totalSemesters?: number;
}

/**
 * Course card component props (simplified)
 */
export interface CourseCardProps {
  code: string;
  title: string;
  credits: number;
  description?: string;
  level?: string;
  semester?: string;
}

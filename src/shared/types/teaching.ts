import type { IconName } from '@/shared/components/common/icons';

/**
 * Teaching Domain Types
 * Centralized type definitions for all teaching-related components
 */

export interface Testimonial {
  id: string | number;
  student: string;
  quote: string;
  course: string;
  rating: number;
  semester?: string;
}

export interface TeachingActivity {
  id: string;
  type: 'support' | 'workshop' | 'seminar';
  title: string;
  role?: string;
  institution: string;
  description: string;
  period?: string;
  students?: number;
  iconName?: IconName;
}

/**
 * Teaching statistics
 */
export interface TeachingStats {
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  yearsTeaching: number;
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

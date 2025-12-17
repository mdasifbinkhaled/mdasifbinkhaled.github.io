/**
 * Teaching Domain Types
 * Centralized type definitions for all teaching-related components
 */

/**
 * Student testimonial data structure
 */
export interface Testimonial {
  id: number | string;
  name?: string;
  student?: string;
  course: string;
  rating: number;
  comment?: string;
  quote?: string;
  semester?: string;
  date?: string;
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
 * Course card component props
 */
export interface CourseCardProps {
  code: string;
  title: string;
  credits: number;
  description?: string;
  level?: string;
  semester?: string;
}

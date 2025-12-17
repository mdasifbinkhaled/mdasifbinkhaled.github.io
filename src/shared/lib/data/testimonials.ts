/**
 * Student Testimonials Data
 * Central repository for all student feedback and testimonials
 */

import type { Testimonial } from '@/shared/types/teaching';

/**
 * Curated student testimonials showcasing teaching impact
 */
export const studentTestimonials: Testimonial[] = [
  {
    id: 1,
    student: 'Anonymous',
    quote:
      'Clear explanations and practical examples made complex algorithms easy to understand. The hands-on approach really helped solidify the concepts.',
    course: 'CSE 211 - Algorithms',
    rating: 5,
    semester: 'Fall 2023',
  },
  {
    id: 2,
    student: 'Anonymous',
    quote:
      'Good balance of theory and hands-on practice. The assignments were challenging but fair, and office hours were incredibly helpful.',
    course: 'CSE 101 - Introduction to Programming',
    rating: 5,
    semester: 'Fall 2023',
  },
  {
    id: 3,
    student: 'Anonymous',
    quote:
      "The instructor's passion for teaching is evident in every lecture. The structured approach to problem-solving has improved my coding skills significantly.",
    course: 'CSE 203 - Data Structures',
    rating: 5,
    semester: 'Spring 2024',
  },
];

/**
 * Get testimonials by minimum rating
 * @param minRating Minimum rating threshold (1-5)
 * @returns Filtered testimonials meeting the rating criteria
 */
export function getTestimonialsByRating(minRating: number): Testimonial[] {
  return studentTestimonials.filter((t) => t.rating >= minRating);
}

/**
 * Get testimonials by course code
 * @param courseCode Course code to filter by (e.g., "CSE 303")
 * @returns Testimonials for the specified course
 */
export function getTestimonialsByCourse(courseCode: string): Testimonial[] {
  return studentTestimonials.filter((t) =>
    t.course.toLowerCase().includes(courseCode.toLowerCase())
  );
}

/**
 * Get all testimonials sorted by rating (highest first)
 */
export function getTestimonialsSortedByRating(): Testimonial[] {
  return [...studentTestimonials].sort((a, b) => b.rating - a.rating);
}

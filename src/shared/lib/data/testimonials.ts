/**
 * Student Testimonials Data
 * Central repository for all student feedback and testimonials
 */

import type { Testimonial } from '@/shared/types/teaching';
import {
  testimonialsArraySchema,
  validateData,
} from '@/shared/lib/validation/schemas';

/**
 * Raw testimonials data
 */
const rawTestimonials = [
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
 * Validated student testimonials
 */
export const studentTestimonials: Testimonial[] = validateData(
  rawTestimonials,
  testimonialsArraySchema,
  'studentTestimonials'
);

/**
 * Get testimonial count (for stats)
 */
export function getTestimonialCount(): number {
  return studentTestimonials.length;
}

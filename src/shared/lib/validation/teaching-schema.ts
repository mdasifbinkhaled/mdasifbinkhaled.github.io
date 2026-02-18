/**
 * Teaching Validation Schemas
 * Runtime validation for teaching activities and testimonials
 */

import { z } from 'zod';
import { iconNameSchema } from './common-schema';

/**
 * Teaching Activity Schema
 */
export const teachingActivitySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.enum(['support', 'workshop', 'seminar']),
  title: z.string().min(3, 'Title is required'),
  role: z.string().optional(),
  institution: z.string().min(2, 'Institution is required'),
  description: z.string().min(10, 'Description must be at least 10 chars'),
  period: z.string().optional(),
  students: z.number().optional(),
  iconName: iconNameSchema.optional(),
});

export const teachingActivitiesArraySchema = z.array(teachingActivitySchema);

/**
 * Testimonial Schema
 * Validates student testimonial data
 */
export const testimonialSchema = z.object({
  id: z.union([z.string(), z.number()]),
  student: z.string().min(1, 'Student identifier is required'),
  quote: z.string().min(20, 'Quote must be at least 20 characters'),
  course: z.string().min(3, 'Course name is required'),
  rating: z.number().int().min(1).max(5),
  semester: z.string().optional(),
});

export const testimonialsArraySchema = z.array(testimonialSchema);

// Inferred types (Single Source of Truth)

/** TeachingActivity type inferred from schema */
export type TeachingActivity = z.infer<typeof teachingActivitySchema>;

/** Testimonial structure inferred from schema */
export type Testimonial = z.infer<typeof testimonialSchema>;

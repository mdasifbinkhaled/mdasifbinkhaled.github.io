/**
 * Experience Validation Schemas
 * Runtime validation for experience/employment data types
 */

import { z } from 'zod';

/**
 * Experience Type Schema
 */
export const experienceTypeSchema = z.enum([
  'Academic',
  'Research',
  'Industry',
  'Teaching Support',
]);

/**
 * Experience Item Schema
 * Validates experience/employment data
 */
export const experienceItemSchema = z.object({
  id: z
    .string()
    .min(1, 'Experience ID is required')
    .regex(/^exp-/, 'Experience ID must start with "exp-"'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  institution: z.string().min(2, 'Institution must be at least 2 characters'),
  location: z.string().min(2).optional(),
  duration: z
    .string()
    .min(3, 'Duration is required')
    .refine(
      (duration) =>
        duration.includes('–') ||
        duration.includes('-') ||
        duration.includes('Present'),
      'Duration should include date range (e.g., "Jan 2020 – Present")'
    ),
  description: z
    .array(
      z
        .string()
        .min(10, 'Each description item should be at least 10 characters')
    )
    .min(1, 'At least one description item is required')
    .max(10, 'Too many description items'),
  logoUrl: z.string().url('Logo URL must be valid').nullable().optional(),
  tags: z.array(z.string().min(1)).max(15, 'Too many tags (max 15)').optional(),
  type: experienceTypeSchema.optional(),
});

/**
 * Array validator for bulk experience data validation
 */
export const experiencesArraySchema = z.array(experienceItemSchema);

// Inferred types (Single Source of Truth)

/** Experience type enum inferred from schema */
export type ExperienceType = z.infer<typeof experienceTypeSchema>;

/** Experience item structure inferred from schema */
export type ExperienceItem = z.infer<typeof experienceItemSchema>;

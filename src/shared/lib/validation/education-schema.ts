/**
 * Education Validation Schemas
 * Runtime validation for education data types
 */

import { z } from 'zod';
import type { LucideIcon } from 'lucide-react';

// Helper for keeping icon components (referenced but not rigorously validated)
const iconSchema = z.custom<LucideIcon>(
  (val) => typeof val === 'function' || typeof val === 'object',
  'Expected a valid Icon component'
);

/**
 * Education Item Schema
 */
export const educationItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  degree: z.string().min(3, 'Degree is required'),
  institution: z.string().min(2, 'Institution is required'),
  location: z.string().min(2, 'Location is required'),
  duration: z.string().min(3, 'Duration is required'),
  distinction: z.string().optional(),
  thesis: z
    .object({
      title: z.string().min(5),
      advisor: z.string().min(3),
    })
    .optional(),
  achievements: z.array(z.string().min(5)).optional(),
  icon: iconSchema,
});

export const educationArraySchema = z.array(educationItemSchema);

// Inferred types (Single Source of Truth)

/** EducationItem structure inferred from schema */
export type EducationItem = z.infer<typeof educationItemSchema>;

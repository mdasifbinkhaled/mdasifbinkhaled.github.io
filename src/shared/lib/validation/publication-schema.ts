/**
 * Publication Validation Schemas
 * Runtime validation for publication data types
 */

import { z } from 'zod';

/**
 * Publication Type Schema
 */
export const publicationTypeSchema = z.enum([
  'Conference',
  'Journal',
  'Workshop',
  'Preprint',
  'In Progress',
  'Book Chapter',
  'Thesis',
]);

/**
 * Publication Item Schema
 * Validates publication data with strict rules for required fields
 */
export const publicationItemSchema = z.object({
  id: z
    .string()
    .min(1, 'Publication ID is required')
    .regex(/^pub-/, 'Publication ID must start with "pub-"'),
  title: z.string().min(10, 'Title must be at least 10 characters'),
  authors: z
    .array(z.string().min(1))
    .min(1, 'At least one author is required')
    .refine(
      (authors) => authors.every((author) => author.includes(',')),
      'Authors should be in format: "LastName, FirstInitials"'
    ),
  venue: z.string().min(5, 'Venue must be at least 5 characters'),
  year: z
    .number()
    .int()
    .min(2000, 'Year must be 2000 or later')
    .max(
      new Date().getFullYear() + 2,
      'Year cannot be more than 2 years in future'
    ),
  type: publicationTypeSchema,
  link: z.string().url('Link must be a valid URL').optional(),
  pdfLink: z.string().url('PDF link must be a valid URL').optional(),
  abstract: z
    .string()
    .min(50, 'Abstract should be at least 50 characters')
    .optional(),
  keywords: z.array(z.string().min(1)).min(1).max(10).optional(),
  doi: z
    .string()
    .regex(/^10\.\d{4,}\//, 'Invalid DOI format')
    .optional(),
  pages: z.string().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
});

/**
 * Array validator for bulk publication data validation
 */
export const publicationsArraySchema = z.array(publicationItemSchema);

// Inferred types (Single Source of Truth)

/** Publication type enum inferred from schema */
export type PublicationType = z.infer<typeof publicationTypeSchema>;

/** Publication item structure inferred from schema */
export type PublicationItem = z.infer<typeof publicationItemSchema>;

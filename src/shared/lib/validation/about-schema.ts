/**
 * About Page Validation Schemas
 * Runtime validation for about page data types (facts, highlights, certs, awards, services)
 */

import { z } from 'zod';
import type { LucideIcon } from 'lucide-react';

// Helper for keeping icon components (referenced but not rigorously validated)
const iconSchema = z.custom<LucideIcon>(
  (val) => typeof val === 'function' || typeof val === 'object',
  'Expected a valid Icon component'
);

/**
 * Quick Fact Schema
 */
export const quickFactSchema = z.object({
  id: z.string().min(1),
  icon: iconSchema,
  label: z.string().min(2),
  value: z.string().min(1),
});

/**
 * Highlight Stats Schema
 */
export const highlightStatsSchema = z.object({
  id: z.string().min(1),
  icon: iconSchema,
  value: z.string().min(1),
  label: z.string().min(2),
});

/**
 * Certification Schema
 */
export const certificationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(5),
  institution: z.string().min(2),
  date: z.string().min(3),
  note: z.string().min(10),
});

/**
 * Award Item Schema
 */
export const awardItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  institution: z.string().min(2),
  date: z.string().min(3),
  icon: iconSchema,
});

/**
 * Service Item Schema
 */
export const serviceItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  organization: z.string().min(2),
  duration: z.string().min(3),
  description: z.string().min(10),
  icon: iconSchema,
});

/**
 * Array validators for bulk about data validation
 */
export const quickFactsArraySchema = z.array(quickFactSchema);
export const highlightsArraySchema = z.array(highlightStatsSchema);
export const certificationsArraySchema = z.array(certificationSchema);
export const awardsArraySchema = z.array(awardItemSchema);
export const servicesArraySchema = z.array(serviceItemSchema);

// Inferred types (Single Source of Truth)

/** QuickFact structure inferred from schema */
export type QuickFact = z.infer<typeof quickFactSchema>;

/** HighlightStats structure inferred from schema */
export type HighlightStats = z.infer<typeof highlightStatsSchema>;

/** Certification structure inferred from schema */
export type Certification = z.infer<typeof certificationSchema>;

/** AwardItem structure inferred from schema */
export type AwardItem = z.infer<typeof awardItemSchema>;

/** ServiceItem structure inferred from schema */
export type ServiceItem = z.infer<typeof serviceItemSchema>;

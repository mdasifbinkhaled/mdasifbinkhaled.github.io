/**
 * Course Validation Schemas
 * Runtime validation for course data types
 */

import { z } from 'zod';
import { iconNameSchema } from './common-schema';

/**
 * Course Institution Schema
 */
export const courseInstitutionSchema = z.enum(['IUB', 'BRACU']);

/**
 * Course Level Schema
 */
export const courseLevelSchema = z.enum(['undergraduate', 'graduate']);

/**
 * Course Status Schema
 */
export const courseStatusSchema = z.enum(['completed', 'ongoing', 'upcoming']);

/**
 * Course Tier Schema
 * Defines display detail level: summary (card only), standard (expandable), detailed (full page)
 */
export const courseTierSchema = z.enum(['summary', 'standard', 'detailed']);

/**
 * Course Assessment Breakdown Schema
 */
export const courseAssessmentBreakdownSchema = z
  .object({
    midterm: z.number().min(0).max(100).optional(),
    final: z.number().min(0).max(100).optional(),
    assignments: z.number().min(0).max(100).optional(),
    projects: z.number().min(0).max(100).optional(),
    quizzes: z.number().min(0).max(100).optional(),
    participation: z.number().min(0).max(100).optional(),
  })
  .refine((assessment) => {
    const total = Object.values(assessment).reduce(
      (sum, val) => sum + (val || 0),
      0
    );
    return total <= 100;
  }, 'Assessment breakdown must sum to 100 or less');

/**
 * Course Data Schema
 * Validates course data with comprehensive rules
 */
export const courseDataSchema = z.object({
  // Required base info
  id: z
    .string()
    .min(1, 'Course ID is required')
    .regex(/^(iub|bracu)-/, 'Course ID must start with institution prefix'),
  code: z
    .string()
    .min(3, 'Course code is required')
    .regex(
      /^[A-Z]{3}\s?\d{3}/,
      'Course code must be in format: ABC 123 or ABC123'
    ),
  slug: z.string().min(3).optional(), // Custom URL slug (e.g. cse211spr26)
  title: z.string().min(5, 'Course title must be at least 5 characters'),

  institution: courseInstitutionSchema,
  level: courseLevelSchema,
  credits: z.number().int().min(1).max(6, 'Credits must be between 1-6'),
  semester: z.enum(['Spring', 'Summer', 'Fall', 'Winter']),
  year: z
    .number()
    .int()
    .min(2015, 'Year must be 2015 or later')
    .max(
      new Date().getFullYear() + 1,
      'Year cannot be more than 1 year in future'
    ),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  outcomes: z
    .array(z.string().min(10))
    .min(1, 'At least one learning outcome is required')
    .max(10),

  // Optional details
  objectives: z.array(z.string().min(10)).min(1).max(10).optional(),
  topics: z.array(z.string().min(3)).min(1).max(20).optional(),
  technologies: z.array(z.string().min(2)).min(1).max(15).optional(),
  assignments: z
    .array(
      z.object({
        title: z.string().min(5),
        link: z.string().url().optional(),
        dueDate: z.string().optional(),
        status: z.enum(['active', 'closed', 'upcoming']).optional(),
        description: z.string().optional(),
      })
    )
    .max(20)
    .optional(),
  projects: z.array(z.string().min(5)).max(10).optional(),
  assessment: courseAssessmentBreakdownSchema.optional(),

  // Optional metrics
  enrollmentCount: z.number().int().min(0).max(500).optional(),
  rating: z.number().min(0).max(5).optional(),
  feedback: z.array(z.string().min(10)).max(20).optional(),

  // Optional presentation
  iconName: iconNameSchema.optional(),
  status: courseStatusSchema.optional(),

  // Tier: determines display level (summary=card, standard=expandable, detailed=full page)
  tier: courseTierSchema.default('standard'),

  // Extended Resource Fields
  links: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().url(),
        type: z.enum([
          'outline',
          'slides',
          'discord',
          'site',
          'video',
          'problem-set',
          'note',
          'other',
        ]),
      })
    )
    .optional(),

  resourceSections: z
    .array(
      z.object({
        title: z.string(),
        items: z.array(
          z.object({
            label: z.string(),
            url: z.string().url().optional(),
            description: z.string().optional(),
            icon: iconNameSchema.optional(),
            isNew: z.boolean().optional(),
          })
        ),
      })
    )
    .optional(),

  // Class Schedule
  classSchedule: z
    .array(
      z.object({
        section: z.number(),
        theory: z.object({
          faculty: z.string(),
          email: z.string().email().optional(),
          days: z.string(),
          time: z.string(),
          room: z.string(),
        }),
        lab: z.object({
          faculty: z.string(),
          email: z.string().email().optional(),
          days: z.string(),
          time: z.string(),
          room: z.string(),
        }),
      })
    )
    .optional(),

  // Hub Features (New in Phase 41)
  semesterEndDate: z.string().optional(), // '2026-04-16'

  notices: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        date: z.string(),
        type: z.enum(['alert', 'info', 'success', 'warning']),
        link: z.string().optional(),
        importance: z.enum(['high', 'medium', 'low']).default('medium'),
      })
    )
    .optional(),

  activeContest: z
    .object({
      title: z.string(),
      url: z.string().url(),
      startDate: z.string().optional(),
      endDate: z.string(), // For countdown
      platform: z.string().default('VJudge'),
    })
    .optional(),

  weeklyModules: z
    .array(
      z.object({
        week: z.number(),
        title: z.string(),
        description: z.string().optional(),
        theory: z
          .object({
            topic: z.string(),
            slides: z.string().optional(),
            recording: z.string().optional(),
          })
          .optional(),
        lab: z
          .object({
            topic: z.string(),
            task: z.string().optional(),
            repo: z.string().optional(),
          })
          .optional(),
      })
    )
    .optional(),

  exams: z
    .object({
      midterm: z
        .object({
          date: z.string().optional(),
          seatPlanUrl: z.string().optional(),
          syllabus: z.string().optional(),
        })
        .optional(),
      final: z
        .object({
          date: z.string().optional(),
          seatPlanUrl: z.string().optional(),
        })
        .optional(),
    })
    .optional(),

  // Deprecated: kept for backward compatibility
  hasDetailPage: z.boolean().optional(),
});

/**
 * Array validator for bulk course data validation
 */
export const coursesArraySchema = z.array(courseDataSchema);

// Inferred types (Single Source of Truth)

/** Course institution enum inferred from schema */
export type CourseInstitution = z.infer<typeof courseInstitutionSchema>;

/** Course level enum inferred from schema */
export type CourseLevel = z.infer<typeof courseLevelSchema>;

/** Course status enum inferred from schema */
export type CourseStatus = z.infer<typeof courseStatusSchema>;

/** Course tier enum inferred from schema */
export type CourseTier = z.infer<typeof courseTierSchema>;

/** Course assessment breakdown inferred from schema */
export type CourseAssessmentBreakdown = z.infer<
  typeof courseAssessmentBreakdownSchema
>;

/** Complete course data structure inferred from schema */
export type CourseData = z.infer<typeof courseDataSchema>;

export type CourseLink = NonNullable<
  z.infer<typeof courseDataSchema>['links']
>[number];
export type CourseResourceSection = NonNullable<
  z.infer<typeof courseDataSchema>['resourceSections']
>[number];

export type ClassScheduleItem = NonNullable<
  z.infer<typeof courseDataSchema>['classSchedule']
>[number];

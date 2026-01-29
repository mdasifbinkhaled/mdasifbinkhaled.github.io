/**
 * Zod Validation Schemas
 * Runtime validation for all data types to prevent silent corruption
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
 * Icon Name Schema (must match icons.tsx icon components)
 */
export const iconNameSchema = z.enum([
  'Code2',
  'Home',
  'UserCircle',
  'Briefcase',
  'BookOpenText',
  'Rss',
  'Cpu',
  'Award',
  'Send',
  'Presentation',
  'LayoutDashboard',
  'Building2',
  'Brain',
  'Database',
  'Calculator',
  'BookOpen',
  'Server',
  'Users',
]);

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
  assignments: z.array(z.string().min(5)).max(20).optional(),
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
 * Array validators for bulk data validation
 */
export const publicationsArraySchema = z.array(publicationItemSchema);
export const experiencesArraySchema = z.array(experienceItemSchema);
export const coursesArraySchema = z.array(courseDataSchema);

// Helper for keeping icon components (referenced but not rigorously validated)
const iconSchema = z.any();

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
 * About Page Schemas
 */
export const quickFactSchema = z.object({
  id: z.string().min(1),
  icon: iconSchema,
  label: z.string().min(2),
  value: z.string().min(1),
});

export const highlightStatsSchema = z.object({
  id: z.string().min(1),
  icon: iconSchema,
  value: z.string().min(1),
  label: z.string().min(2),
});

export const certificationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(5),
  institution: z.string().min(2),
  date: z.string().min(3),
  note: z.string().min(10),
});

export const awardItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  institution: z.string().min(2),
  date: z.string().min(3),
  icon: iconSchema,
});

export const serviceItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  organization: z.string().min(2),
  duration: z.string().min(3),
  description: z.string().min(10),
  icon: iconSchema,
});

export const quickFactsArraySchema = z.array(quickFactSchema);
export const highlightsArraySchema = z.array(highlightStatsSchema);
export const certificationsArraySchema = z.array(certificationSchema);
export const awardsArraySchema = z.array(awardItemSchema);
export const servicesArraySchema = z.array(serviceItemSchema);

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

/**
 * Validation helper function with detailed error reporting
 */
export function validateData<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  dataName: string
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error(`❌ Validation failed for ${dataName}:`);
    // eslint-disable-next-line no-console
    console.error(result.error.format());

    // Create detailed error message
    const errors = result.error.issues.map(
      (err: z.ZodIssue) => `  - ${err.path.join('.')}: ${err.message}`
    );

    throw new Error(
      `Data validation failed for ${dataName}:\n${errors.join('\n')}\n\n` +
        `Please fix the data issues above to continue.\n` +
        `This validation prevents silent data corruption.`
    );
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`✅ Validation passed for ${dataName}`);
  }
  return result.data;
}

/**
 * Safe validation that logs errors but doesn't throw
 * Useful for development/migration period
 */
export function validateDataSafe<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  dataName: string
): { success: boolean; data?: T; errors?: string[] } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map(
      (err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`
    );

    // eslint-disable-next-line no-console
    console.warn(`⚠️ Validation warnings for ${dataName}:`, errors);

    return { success: false, errors };
  }

  return { success: true, data: result.data };
}

// Inferred types (Single Source of Truth)
// These types are derived directly from the Zod schemas above.

/** Publication type enum inferred from schema */
export type PublicationType = z.infer<typeof publicationTypeSchema>;

/** Publication item structure inferred from schema */
export type PublicationItem = z.infer<typeof publicationItemSchema>;

/** Experience type enum inferred from schema */
export type ExperienceType = z.infer<typeof experienceTypeSchema>;

/** Experience item structure inferred from schema */
export type ExperienceItem = z.infer<typeof experienceItemSchema>;

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

/** Icon name enum inferred from schema */
export type IconNameFromSchema = z.infer<typeof iconNameSchema>;

/** Complete course data structure inferred from schema */
export type CourseData = z.infer<typeof courseDataSchema>;

/** Testimonial structure inferred from schema */
export type Testimonial = z.infer<typeof testimonialSchema>;

export type CourseLink = NonNullable<
  z.infer<typeof courseDataSchema>['links']
>[number];
export type CourseResourceSection = NonNullable<
  z.infer<typeof courseDataSchema>['resourceSections']
>[number];

export type ClassScheduleItem = NonNullable<
  z.infer<typeof courseDataSchema>['classSchedule']
>[number];

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

/** TeachingActivity type inferred from schema */
export type TeachingActivity = z.infer<typeof teachingActivitySchema>;

/** EducationItem structure inferred from schema */
export type EducationItem = z.infer<typeof educationItemSchema>;

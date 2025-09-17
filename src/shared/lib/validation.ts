import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(100, { message: 'Name must not exceed 100 characters' })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        'Name can only contain letters, spaces, hyphens, and apostrophes',
    }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(254, { message: 'Email must not exceed 254 characters' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters long' })
    .max(200, { message: 'Subject must not exceed 200 characters' })
    .trim(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(2000, { message: 'Message must not exceed 2000 characters' })
    .trim(),
  honeypot: z.string().max(0, { message: 'Spam detected' }).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// URL validation schema for external links
export const urlSchema = z
  .string()
  .url({ message: 'Please enter a valid URL' })
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    },
    { message: 'URL must use HTTP or HTTPS protocol' }
  );

// Academic publication validation schema
export const publicationSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(500, { message: 'Title must not exceed 500 characters' }),
  authors: z
    .array(z.string().min(2).max(100))
    .min(1, { message: 'At least one author is required' })
    .max(50, { message: 'Too many authors listed' }),
  year: z
    .number()
    .int()
    .min(1900, { message: 'Year must be 1900 or later' })
    .max(new Date().getFullYear() + 5, {
      message: 'Year cannot be more than 5 years in the future',
    }),
  venue: z.string().max(200).optional(),
  type: z.enum([
    'Journal',
    'Conference',
    'Workshop',
    'Book Chapter',
    'Thesis',
    'Patent',
    'Preprint',
    'In Progress',
  ]),
  link: urlSchema.optional(),
  pdfLink: urlSchema.optional(),
  doi: z
    .string()
    .regex(/^10\.\d{4,}\/[-._;()\/:A-Za-z0-9]+$/, {
      message: 'Invalid DOI format',
    })
    .optional(),
  abstract: z.string().max(5000).optional(),
  keywords: z
    .array(z.string().min(1).max(50))
    .max(20, { message: 'Too many keywords' })
    .optional(),
  citationCount: z.number().int().min(0).optional(),
});

export type PublicationData = z.infer<typeof publicationSchema>;

// Professional experience validation schema
export const experienceSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long' })
    .max(200, { message: 'Title must not exceed 200 characters' }),
  institution: z
    .string()
    .min(2, { message: 'Institution must be at least 2 characters long' })
    .max(200, { message: 'Institution must not exceed 200 characters' }),
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters long' })
    .max(100, { message: 'Location must not exceed 100 characters' }),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, {
    message: 'Start date must be in YYYY-MM format',
  }),
  endDate: z
    .string()
    .regex(/^(\d{4}-\d{2}|Present)$/, {
      message: 'End date must be in YYYY-MM format or "Present"',
    })
    .optional(),
  description: z
    .array(z.string().min(10).max(500))
    .min(1, { message: 'At least one description item is required' })
    .max(20, { message: 'Too many description items' }),
  skills: z
    .array(z.string().min(1).max(50))
    .max(50, { message: 'Too many skills listed' })
    .optional(),
  logoUrl: urlSchema.optional(),
  website: urlSchema.optional(),
});

export type ExperienceData = z.infer<typeof experienceSchema>;

// Search and filter validation schemas
export const searchQuerySchema = z
  .string()
  .max(100, { message: 'Search query too long' })
  .regex(/^[a-zA-Z0-9\s\-_.,!?]*$/, {
    message: 'Search query contains invalid characters',
  });

export const filterSchema = z.object({
  type: z
    .enum(['all', 'journal', 'conference', 'workshop', 'other'])
    .default('all'),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 5)
    .optional(),
  author: z.string().max(100).optional(),
  keyword: z.string().max(50).optional(),
});

// User preferences schema (for theme, language, etc.)
export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'retro', 'system']).default('system'),
  language: z.enum(['en', 'bn']).default('en'),
  reducedMotion: z.boolean().default(false),
  highContrast: z.boolean().default(false),
  fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
});

export type UserPreferences = z.infer<typeof userPreferencesSchema>;

// API response validation schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  errors: z.array(z.string()).optional(),
});

// Error validation schema
export const errorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional(),
  timestamp: z.string().datetime(),
});

// Content validation for CMS or dynamic content
export const contentBlockSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'image', 'video', 'embed', 'code']),
  content: z.string(),
  metadata: z.record(z.any()).optional(),
  order: z.number().int().min(0),
  published: z.boolean().default(true),
});

// File upload validation schema
export const fileUploadSchema = z.object({
  name: z.string().min(1).max(255),
  size: z
    .number()
    .int()
    .min(1)
    .max(10 * 1024 * 1024), // 10MB max
  type: z.string().regex(/^[a-zA-Z0-9\/\-\+]+$/, {
    message: 'Invalid file type format',
  }),
  lastModified: z.number().int().min(0),
});

// Security validation helpers
export const sanitizeHtml = (input: string): string => {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');
};

export const validateAndSanitizeInput = <T>(
  schema: z.ZodSchema<T>,
  input: unknown,
  sanitize = false
): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    let processedInput = input;

    if (sanitize && typeof input === 'object' && input !== null) {
      processedInput = JSON.parse(
        JSON.stringify(input, (_, value) => {
          return typeof value === 'string' ? sanitizeHtml(value) : value;
        })
      );
    }

    const result = schema.parse(processedInput);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(
          (err) => `${err.path.join('.')}: ${err.message}`
        ),
      };
    }
    return {
      success: false,
      errors: ['Validation failed with unknown error'],
    };
  }
};

// Rate limiting schema for API calls
export const rateLimitSchema = z.object({
  requests: z.number().int().min(1).max(1000),
  windowMs: z.number().int().min(1000).max(3600000), // 1 second to 1 hour
  identifier: z.string().min(1).max(100),
});

export type RateLimitConfig = z.infer<typeof rateLimitSchema>;

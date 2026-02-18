/**
 * Common Validation Schemas
 * Shared schemas used across multiple domains
 */

import { z } from 'zod';

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

/** Icon name enum inferred from schema */
export type IconNameFromSchema = z.infer<typeof iconNameSchema>;

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
    if (process.env.NODE_ENV !== 'production') {
      console.error(`❌ Validation failed for ${dataName}:`);
      console.error(result.error.format());
    }

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
    // Development logic
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
  _dataName: string
): { success: boolean; data?: T; errors?: string[] } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map(
      (err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`
    );

    return { success: false, errors };
  }

  return { success: true, data: result.data };
}

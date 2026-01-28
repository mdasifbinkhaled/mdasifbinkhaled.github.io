/**
 * Teaching Activities Data
 * Central repository for non-course teaching activities (TA roles, workshops, etc.)
 */

import {
  teachingActivitiesArraySchema,
  validateData,
} from '../validation/schemas';
import type { TeachingActivity } from '../validation/schemas';

/**
 * Activity type definition derived from Zod schema
 */
// Re-export type for consumers
export type { TeachingActivity } from '../validation/schemas';

/**
 * Teaching support roles (TA, Tutor, etc.)
 */
export const teachingSupportRoles: TeachingActivity[] = [
  {
    id: 'support-ta',
    type: 'support',
    title: 'Teaching Assistant',
    institution: 'IUB',
    description:
      'Supported course delivery, grading, lab sessions, and OBE-aligned assessments.',
    iconName: 'Users',
  },
  {
    id: 'support-tutor',
    type: 'support',
    title: 'Student Tutor',
    institution: 'IUB',
    description:
      'Peer tutoring, exam prep sessions, and project guidance for CS courses.',
    iconName: 'Users',
  },
  {
    id: 'support-sod',
    type: 'support',
    title: 'School of Development',
    institution: 'IUB',
    description:
      'Programming bootcamps, soft skills, and collaborative learning groups.',
    iconName: 'Users',
  },
];

/**
 * Workshops and seminars
 */
export const workshopsAndSeminars: TeachingActivity[] = [
  {
    id: 'ws-python-2023',
    type: 'workshop',
    title: 'Python Automation Workshops',
    institution: 'IUB',
    period: '2023-2024',
    description:
      'Instructor for hands-on workshops teaching Python automation to students and faculty.',
    iconName: 'Presentation',
  },
  {
    id: 'ws-microcontroller',
    type: 'workshop',
    title: 'Micro-controller Programming',
    institution: 'CCSE, IUB',
    description:
      'Facilitated advanced micro-controller programming concepts and applications.',
    iconName: 'Presentation',
  },
  {
    id: 'ws-bac-sar',
    type: 'seminar',
    title: 'BAC Accreditation SAR',
    institution: 'IQAC, IUB',
    period: 'Oct 2024',
    description:
      'Workshop on Self-Assessment Report preparation and course file management.',
    iconName: 'BookOpen',
  },
  {
    id: 'ws-yes-we-can',
    type: 'workshop',
    title: 'Yes We Can! Workshop',
    institution: 'CCSE, IUB',
    description: 'Skill enhancement and motivation workshop for students.',
    iconName: 'Presentation',
  },
];

/**
 * All teaching activities combined
 */
const rawAllTeachingActivities: TeachingActivity[] = [
  ...teachingSupportRoles,
  ...workshopsAndSeminars,
];

/**
 * All teaching activities combined (Validated)
 */
export const allTeachingActivities = validateData(
  rawAllTeachingActivities,
  teachingActivitiesArraySchema,
  'teaching activities'
);

/**
 * Get activities by type
 */
export function getActivitiesByType(
  type: TeachingActivity['type']
): TeachingActivity[] {
  return allTeachingActivities.filter((a) => a.type === type);
}

/**
 * Get total activity count (for badge display)
 */
export function getActivityCount(): number {
  return allTeachingActivities.length;
}

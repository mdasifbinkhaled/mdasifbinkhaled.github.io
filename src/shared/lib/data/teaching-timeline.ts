/**
 * Teaching Timeline Data
 * Central repository for teaching career milestones
 */

import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import type { TeachingTimelineEvent } from '@/shared/types/teaching';

/**
 * Teaching career timeline events
 * Only includes actual teaching positions (no workshops)
 */
export const teachingTimelineEvents: TeachingTimelineEvent[] = [
  {
    id: 'senior-lecturer-iub',
    title: 'Senior Lecturer',
    institution: 'Independent University, Bangladesh (IUB)',
    period: 'Feb 2023 - Present',
    type: 'current',
    icon: GraduationCap,
    description:
      'Leading undergraduate courses in Computer Science and Engineering. Mentoring students in research projects and career development.',
    highlights: [
      'Teaching advanced CSE courses',
      'Research supervision',
      'Curriculum development',
    ],
  },
  {
    id: 'lecturer-iub',
    title: 'Lecturer',
    institution: 'Independent University, Bangladesh (IUB)',
    period: 'Aug 2021 - Jan 2023',
    type: 'past',
    icon: BookOpen,
    description:
      'Taught core Computer Science courses with focus on practical implementation and real-world applications.',
    highlights: ['Course instruction', 'Lab supervision', 'Student mentoring'],
  },
  {
    id: 'ta-iub',
    title: 'Teaching Assistant',
    institution: 'Independent University, Bangladesh (IUB)',
    period: 'Jan 2020 - Jul 2021',
    type: 'past',
    icon: Users,
    description:
      'Assisted in teaching activities, conducted lab sessions, and provided academic support to students.',
    highlights: [
      'Lab instruction',
      'Assignment grading',
      'Office hours support',
    ],
  },
  {
    id: 'part-time-bracu',
    title: 'Part-Time Lecturer',
    institution: 'BRAC University (BRACU)',
    period: 'May 2015 - Dec 2019',
    type: 'past',
    icon: BookOpen,
    description:
      'Taught introductory and intermediate Computer Science courses alongside full-time responsibilities.',
    highlights: ['Course delivery', 'Curriculum support', 'Student assessment'],
  },
  {
    id: 'student-tutor-bracu',
    title: 'Student Tutorship',
    institution: 'BRAC University (BRACU)',
    period: 'May 2015 - Dec 2015',
    type: 'milestone',
    icon: Award,
    description:
      'Started teaching journey by providing tutoring support to fellow students in Computer Science fundamentals.',
    highlights: ['Peer tutoring', 'Academic support', 'Teaching fundamentals'],
  },
];

/**
 * Get timeline events for a specific institution
 */
export function getTimelineByInstitution(
  institution: string
): TeachingTimelineEvent[] {
  return teachingTimelineEvents.filter((event) =>
    event.institution.toLowerCase().includes(institution.toLowerCase())
  );
}

/**
 * Get current teaching position
 */
export function getCurrentPosition(): TeachingTimelineEvent | undefined {
  return teachingTimelineEvents.find((event) => event.type === 'current');
}

/**
 * Get all past teaching positions
 */
export function getPastPositions(): TeachingTimelineEvent[] {
  return teachingTimelineEvents.filter((event) => event.type === 'past');
}

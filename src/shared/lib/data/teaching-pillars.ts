import { Target, Users, Award, type LucideIcon } from 'lucide-react';

export interface TeachingPillar {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Teaching Philosophy Pillars
 * Core pillars displayed on the teaching page philosophy section
 */
export const teachingPillars: TeachingPillar[] = [
  {
    id: 'pillar-1',
    icon: Users,
    title: 'Hands-On Learning',
    description:
      'Bridging theory and industry practice through real-world projects, interactive coding sessions, and practical applications.',
  },
  {
    id: 'pillar-2',
    icon: Target,
    title: 'Outcome-Based',
    description:
      'Structuring courses with clear learning objectives, measurable outcomes, and continuous assessment aligned with international OBE standards.',
  },
  {
    id: 'pillar-3',
    icon: Award,
    title: 'Student Success',
    description:
      'Nurturing potential through personalized mentorship, career guidance, and building confidence to tackle complex technical challenges.',
  },
];

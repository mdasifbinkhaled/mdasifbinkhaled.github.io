// Central researcher profile configuration (Aggregator)
// Now largely redirects to @/shared/lib/data/ for SSOT content.

import { METRICS } from '@/shared/lib/data/metrics';
import { personalIdentity } from '@/shared/lib/data/personal';
import {
  researchData,
  academicProfiles as profiles,
} from '@/shared/lib/data/research';

// Research identity
export const researchIdentity = {
  philosophy: researchData.philosophy,
  primaryAreas: researchData.areas,
  currentFocus: researchData.focus,
  goals: personalIdentity.goals,
  libraries: researchData.libraries,
} as const;

// Academic profiles & metrics
export const academicProfiles = {
  profiles: profiles.profiles,
  github: profiles.github,

  // Private metrics (Legacy reference - use METRICS directly in new code)
  metrics: {
    citations: METRICS.CITATION_COUNT,
    hIndex: METRICS.H_INDEX,
    i10Index: METRICS.I10_INDEX,
    lastUpdated: '2025-10-26',
  },
} as const;

// Teaching philosophy
export const teachingPhilosophy = personalIdentity.teachingPhilosophy;

// Key learnings & insights (Preserved here or move to personal?)
// Removed unused metrics and unused domains

// Research projects
export const researchProjects = {
  featured: researchData.projects,
} as const;

// Type exports
export type ResearchArea = (typeof researchIdentity.primaryAreas)[number];
export type AcademicProfile = (typeof academicProfiles.profiles)[number];
export type ResearchProject = (typeof researchProjects.featured)[number];

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

  // Private metrics (Legacy reference - use METRICS directy in new code)
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
export const keyLearnings = {
  research: {
    primary: 'Methodological research is very important',
    insights: [
      'Rigorous methodology is the foundation of credible research',
      'Explainability should be built into AI systems from the ground up',
      'Healthcare applications require special attention to trustworthiness',
    ],
  },
} as const;

// Research projects
export const researchProjects = {
  featured: researchData.projects,
} as const;

// Notable publications
export const notablePublications = {
  featured: ['pub-desrist-2024'],
  highlights: {
    'pub-desrist-2024': {
      note: 'DESRIST 2024 - Research in Progress Track (A-ranked conference)',
      specialRecognition: false,
    },
  },
} as const;

// PhD interests (private - not displayed on public site)
export const phdInterests = personalIdentity.phdInterests;

// Visual identity (placeholder)
export const visualIdentity = {
  logo: {
    concept: 'Neural network + healthcare + transparency theme',
    status: 'To be designed',
  },
  colorTheme: {
    healthcare: 'hsl(var(--healthcare-primary))',
    explainability: 'hsl(var(--explainability-primary))',
    technology: 'hsl(var(--technology-primary))',
  },
  visualMotifs: {
    neuralNetworks: true,
    transparency: true,
    healthcare: true,
  },
} as const;

// Contact & availability
export const availability = {
  collaboration: {
    open: true,
    areas: ['Healthcare AI', 'XAI', 'Multimodal AI'],
  },
  supervision: {
    undergraduate: false,
    masters: false,
  },
  speaking: {
    available: false,
  },
} as const;

// Type exports
export type ResearchArea = (typeof researchIdentity.primaryAreas)[number];
export type AcademicProfile = (typeof academicProfiles.profiles)[number];
export type ResearchProject = (typeof researchProjects.featured)[number];

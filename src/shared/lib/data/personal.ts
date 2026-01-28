/**
 * Personal Data
 * Bio, goals, and interests.
 */

export const personalIdentity = {
  goals: {
    shortTerm: 'Advance explainable AI techniques in healthcare applications',
    longTerm:
      'Become an expert in the field working towards innovations that benefit humanity',
    impact:
      'Making AI decisions in critical domains transparent and trustworthy',
  },
  teachingPhilosophy: {
    core: 'Teach that inspires and makes students capable, impactful, and honest',
    approach:
      'Outcome-Based Education (OBE) with focus on practical application',
    values: [
      'Inspiration',
      'Capability Building',
      'Real-world Impact',
      'Integrity',
    ],
    commitment:
      'Fostering an environment where students develop both technical skills and ethical responsibility',
  },
  phdInterests: {
    timeline: {
      targetStart: 'Fall 2026',
      applicationPeriod: '2025-2026',
    },
    targetLocations: ['Europe', 'Australia', 'Saudi Arabia'],
    researchFocus: ['Healthcare AI', 'AI/ML', 'Explainable AI'],
    supervisorPreferences: {},
    isPrivate: true,
  },
} as const;

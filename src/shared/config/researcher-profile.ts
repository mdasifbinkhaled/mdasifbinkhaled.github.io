// Central researcher profile configuration
// Used across the entire site for consistency

import { siteConfig } from './site';

// Research identity
export const researchIdentity = {
  philosophy: {
    statement:
      'Whatever decisions are being taken should be explainable and trustworthy',
    vision:
      'Breaking out of the black box to make AI understandable, interpretable, and beneficial for humanity',
    approach:
      "Focusing on healthcare applications where explainability is not just important - it's essential for saving lives",
  },

  primaryAreas: [
    {
      id: 'healthcare-ai',
      name: 'Healthcare AI',
      description:
        'Developing AI systems for healthcare applications with emphasis on explainability and trustworthiness',
      icon: 'Heart',
      keywords: ['Medical AI', 'Clinical Decision Support', 'Patient Safety'],
    },
    {
      id: 'multimodal-ai',
      name: 'Multimodal AI',
      description:
        'Integrating multiple data modalities to create comprehensive AI solutions',
      icon: 'Layers',
      keywords: [
        'Data Fusion',
        'Multi-source Learning',
        'Cross-modal Analysis',
      ],
    },
    {
      id: 'xai',
      name: 'Explainable AI (XAI)',
      description:
        'Making AI decisions transparent, interpretable, and understandable to stakeholders',
      icon: 'Eye',
      keywords: ['Interpretability', 'Transparency', 'Model Explanation'],
    },
  ],

  currentFocus: {
    primary: 'Stroke-related problems using AI/ML approaches',
    domains: ['Healthcare', 'Remote Sensing', 'Signal Processing'],
    methodology: 'Methodological research with emphasis on explainability',
  },

  goals: {
    shortTerm: 'Advance explainable AI techniques in healthcare applications',
    longTerm:
      'Become an expert in the field working towards innovations that benefit humanity',
    impact:
      'Making AI decisions in critical domains transparent and trustworthy',
  },

  libraries: [
    {
      name: 'SortyPy',
      description: 'Python sorting algorithms library',
      status: 'In Development',
      github: 'https://github.com/mdasifbinkhaled/SortyPy',
    },
    {
      name: 'SearchyPy',
      description: 'Python search algorithms library',
      status: 'In Development',
      github: 'https://github.com/mdasifbinkhaled/SearchyPy',
    },
  ],
} as const;

// Academic profiles & metrics
export const academicProfiles = {
  profiles: [
    {
      platform: 'Google Scholar',
      url: siteConfig.links.googleScholar,
      icon: 'GraduationCap',
      primary: true,
    },
    {
      platform: 'ORCID',
      id: siteConfig.links.orcid.split('/').pop() || '',
      url: siteConfig.links.orcid,
      icon: 'Award',
      primary: true,
    },
    {
      platform: 'ResearchGate',
      url: siteConfig.links.researchGate,
      icon: 'Network',
      primary: true,
    },
    {
      platform: 'Academia.edu',
      url: 'https://iub-bd.academia.edu/mdasifbinkhaled',
      icon: 'BookOpen',
      primary: false,
    },
  ],

  github: {
    username: siteConfig.links.github.split('/').pop() || 'mdasifbinkhaled',
    url: siteConfig.links.github,
  },

  // Private metrics (not displayed publicly)
  metrics: {
    citations: 39,
    hIndex: 3,
    i10Index: 2,
    lastUpdated: '2025-10-26',
  },
} as const;

// Teaching philosophy
export const teachingPhilosophy = {
  core: 'Teach that inspires and makes students capable, impactful, and honest',
  approach: 'Outcome-Based Education (OBE) with focus on practical application',
  values: [
    'Inspiration',
    'Capability Building',
    'Real-world Impact',
    'Integrity',
  ],
  commitment:
    'Fostering an environment where students develop both technical skills and ethical responsibility',
} as const;

// Key learnings & insights
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
  featured: [
    {
      id: 'stroke-research',
      title: 'AI-Powered Stroke Analysis and Prediction',
      tagline: 'Explainable AI for critical healthcare decisions',
      description:
        'Developing interpretable machine learning models for stroke-related problems, focusing on early detection and outcome prediction.',
      status: 'Ongoing',
      domain: 'Healthcare AI',
      technologies: [],
      methodologies: [],
      outcomes: {
        publications: [],
        datasets: [],
        code: null,
      },
      impact: 'Improving stroke diagnosis and treatment through explainable AI',
      featured: true,
      placeholder: true,
    },
    {
      id: 'multimodal-healthcare',
      title: 'Multimodal AI for Healthcare Diagnostics',
      tagline: 'Integrating diverse data sources for comprehensive analysis',
      description:
        'Research on combining multiple data modalities for enhanced healthcare diagnostics.',
      status: 'Ongoing',
      domain: 'Multimodal AI',
      technologies: [],
      methodologies: [],
      outcomes: {
        publications: [],
        datasets: [],
        code: null,
      },
      featured: true,
      placeholder: true,
    },
    {
      id: 'remote-sensing-signal',
      title: 'Remote Sensing and Signal Processing Applications',
      tagline: 'Advanced signal analysis for real-world applications',
      description:
        'Applying signal processing and remote sensing techniques to solve practical problems.',
      status: 'Ongoing',
      domain: 'Signal Processing',
      technologies: [],
      methodologies: [],
      outcomes: {
        publications: [],
        datasets: [],
        code: null,
      },
      featured: true,
      placeholder: true,
    },
  ],
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
export const phdInterests = {
  timeline: {
    targetStart: 'Fall 2026',
    applicationPeriod: '2025-2026',
  },
  targetLocations: ['Europe', 'Australia', 'Saudi Arabia'],
  researchFocus: ['Healthcare AI', 'AI/ML', 'Explainable AI'],
  supervisorPreferences: {},
  isPrivate: true,
} as const;

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

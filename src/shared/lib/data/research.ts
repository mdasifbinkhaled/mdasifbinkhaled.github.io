/**
 * Research Data
 * Projects, areas, and methodology.
 */

import { siteConfig } from '@/shared/config/site';

export const researchData = {
  philosophy: {
    statement:
      'Whatever decisions are being taken should be explainable and trustworthy',
    vision:
      'Breaking out of the black box to make AI understandable, interpretable, and beneficial for humanity',
    approach:
      "Focusing on healthcare applications where explainability is not just important - it's essential for saving lives",
  },
  areas: [
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
  focus: {
    primary: 'Stroke-related problems using AI/ML approaches',
    domains: ['Healthcare', 'Remote Sensing', 'Signal Processing'],
    methodology: 'Methodological research with emphasis on explainability',
  },
  projects: [
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
  grants: [
    {
      id: 'vcrf-2024-013',
      title: 'Unveiling the Linguistic Diversity of Bangla',
      role: "Principal Investigator, VC's Research Fund 2024-2025 (No. VCRF-SETS:24-013)",
      description:
        "Leading research on enhancing dialect detection through AI and Machine Learning techniques, contributing to the preservation and understanding of Bangladesh's rich linguistic heritage.",
      featured: true,
    },
  ],
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

// Academic profiles
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
} as const;

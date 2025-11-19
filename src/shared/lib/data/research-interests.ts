/**
 * Research Interests Data
 * Central repository for research areas and interests
 */

import type { LucideIcon } from 'lucide-react';
import { Activity, Brain, Code2, Eye, Leaf, Satellite } from 'lucide-react';

export interface ResearchInterest {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

/**
 * Primary research interests
 */
export const researchInterests: ResearchInterest[] = [
  {
    id: 'ai-healthcare',
    title: 'AI in Healthcare',
    icon: Activity,
    description:
      'Developing AI-powered diagnostic systems for disease detection, medical imaging analysis, and clinical decision support to improve patient outcomes and healthcare delivery.',
  },
  {
    id: 'ai-environment',
    title: 'AI in Environment',
    icon: Leaf,
    description:
      'Applying machine learning to environmental monitoring, climate modeling, ecosystem conservation, and sustainable resource management for a greener future.',
  },
  {
    id: 'explainable-ai',
    title: 'Explainable AI (XAI)',
    icon: Brain,
    description:
      'Creating transparent AI systems that clinicians and users can trust. Focus on interpretable models for critical applications with clear reasoning and decision pathways.',
  },
  {
    id: 'multimodal-ai',
    title: 'Multimodal AI',
    icon: Eye,
    description:
      'Integrating imaging, text, clinical records, and sensor data for comprehensive analysis. Building systems that leverage diverse data modalities for holistic insights.',
  },
  {
    id: 'remote-sensing',
    title: 'Remote Sensing',
    icon: Satellite,
    description:
      'Analyzing satellite, drone, and aerial imagery for land use classification, disaster monitoring, agricultural assessment, and environmental change detection.',
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Data Structures',
    icon: Code2,
    description:
      'Researching efficient sorting, searching, and optimization algorithms. Exploring novel data structures and computational approaches for solving complex problems.',
  },
];

/**
 * Get all research interests
 */
export function getResearchInterests(): ResearchInterest[] {
  return researchInterests;
}

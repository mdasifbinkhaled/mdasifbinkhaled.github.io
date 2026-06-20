import type { Metadata } from 'next';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { ContentColumn } from '@/shared/components/layout/content-column';
import { siteConfig } from '@/shared/config/site';
import { researchIdentity } from '@/shared/lib/data/researcher-profile';
import { assetPaths } from '@/shared/config/assets';

import {
  ResearchHero,
  ResearchVision,
  PrimaryAreas,
  CurrentFocus,
  ResearchTimeline,
  FeaturedProjects,
  OpenSource,
  LookingAhead,
  ResearchCTA,
} from '@/features/research';

export const metadata: Metadata = {
  title: 'Research',
  description: `${siteConfig.author}'s research in Explainable AI, Healthcare AI, and Multimodal AI. ${researchIdentity.philosophy.statement}`,
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: `Research - ${siteConfig.author}`,
    description: researchIdentity.philosophy.statement,
    images: [assetPaths.ogImage],
  },
};

export default function ResearchPage() {
  return (
    <ContentColumn width="wide" gap="space-y-20">
      <Breadcrumbs />
      <ResearchHero />

      <h2 className="sr-only">Vision & Direction</h2>
      <ResearchVision />
      <PrimaryAreas />
      <CurrentFocus />
      <ResearchTimeline />
      <FeaturedProjects />
      <OpenSource />
      <LookingAhead />
      <ResearchCTA />
    </ContentColumn>
  );
}

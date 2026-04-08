import type { Metadata } from 'next';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { siteConfig } from '@/shared/config/site';
import { researchIdentity } from '@/shared/lib/data/researcher-profile';
import { assetPaths } from '@/shared/config/assets';

import {
  ResearchHero,
  ResearchVision,
  PrimaryAreas,
  CurrentFocus,
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
    <div className="container-responsive space-y-20">
      <div className="max-w-7xl mx-auto space-y-20">
        <Breadcrumbs />
        <ResearchHero />
        <ResearchVision />
        <PrimaryAreas />
        <CurrentFocus />
        <FeaturedProjects />
        <OpenSource />
        <LookingAhead />
        <ResearchCTA />
      </div>
    </div>
  );
}

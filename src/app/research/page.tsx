import type { Metadata } from 'next';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import { siteConfig } from '@/shared/config/site';
import { researchIdentity } from '@/shared/lib/data/researcher-profile';
import { assetPaths } from '@/shared/config/assets';

import { ResearchHero } from '@/features/research/components/research-hero';
import { ResearchVision } from '@/features/research/components/research-vision';
import { PrimaryAreas } from '@/features/research/components/primary-areas';
import { CurrentFocus } from '@/features/research/components/current-focus';
import { FeaturedProjects } from '@/features/research/components/featured-projects';
import { OpenSource } from '@/features/research/components/open-source';
import { LookingAhead } from '@/features/research/components/looking-ahead';
import { ResearchCTA } from '@/features/research/components/research-cta';

export const metadata: Metadata = {
  title: 'Research',
  description: `${siteConfig.author}'s research in Explainable AI, Healthcare AI, and Multimodal AI. ${researchIdentity.philosophy.statement}`,
  alternates: {
    canonical: `${siteConfig.url}/research`,
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

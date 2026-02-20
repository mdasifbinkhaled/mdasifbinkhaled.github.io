import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import {
  HeroSection,
  QuickFacts,
  HighlightsSection,
  ResearchPhilosophy,
  SkillsSection,
  BeyondAcademia,
  CertificationsSection,
  AwardsSection,
  CtaSection,
} from '@/features/about/components';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${siteConfig.author}, his academic background, research philosophy, skills, and professional journey as a Senior Lecturer and Researcher.`,
  openGraph: {
    title: `About ${siteConfig.author}`,
    description: `Learn more about ${siteConfig.author}'s academic journey, research interests, and professional background.`,
    images: [assetPaths.ogImage],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    mainEntity: {
      '@type': 'Person',
      name: siteConfig.author,
      description: siteConfig.description,
      image: `${siteConfig.url}${assetPaths.profile}`,
    },
  };

  return (
    <div className="container-responsive py-10 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto space-y-16">
        <Breadcrumbs />

        <HeroSection />
        <QuickFacts />
        <HighlightsSection />
        <ResearchPhilosophy />

        <div className="space-y-16">
          <h2 className="sr-only">Professional Details</h2>
          {/* Biography Section removed as redundant with Hero + QuickFacts */}

          {/* 
            Education & Experience moved to CV page as per new IA 
            However, keeping brief highlights or skills here is good.
          */}

          <SkillsSection />
          <BeyondAcademia />
          <CertificationsSection />
          <AwardsSection />
        </div>

        <CtaSection />
      </div>
    </div>
  );
}

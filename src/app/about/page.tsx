import type { Metadata } from 'next';
import { siteConfig } from '@/shared/config/site';
import { assetPaths } from '@/shared/config/assets';
import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import {
  HeroSection,
  QuickFacts,
  HighlightsSection,
  ResearchPhilosophy,
  BiographySection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
  BeyondAcademia,
  CertificationsSection,
  AwardsSection,
  CtaSection,
} from '@/features/about/components';

export const metadata: Metadata = {
  title: 'About Me',
  description: `Learn more about ${siteConfig.author}'s academic journey, research interests, and professional background. ${siteConfig.description}`,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: `About ${siteConfig.author}`,
    description: `Learn more about ${siteConfig.author}'s academic journey, research interests, and professional background.`,
    images: [assetPaths.ogImage],
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <Breadcrumbs />
      <HeroSection />
      <QuickFacts />
      <HighlightsSection />
      <ResearchPhilosophy />
      <BiographySection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <BeyondAcademia />
      <CertificationsSection />
      <AwardsSection />
      <CtaSection />
    </div>
  );
}

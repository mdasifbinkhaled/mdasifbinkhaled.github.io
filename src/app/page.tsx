/**
 * Homepage
 *
 * Key Features:
 * - Semantic sections for improved maintainability
 * - Data layer separation for content management
 * - Modular component architecture
 */

import type { Metadata } from 'next';
import {
  HeroSection,
  NewsSection,
  ResearchHighlights,
  PublicationsPreview,
  ExperiencePreview,
  FeaturedGrant,
  ConnectSection,
} from '@/features/home/components';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <NewsSection />
      <ResearchHighlights />
      <PublicationsPreview />
      <ExperiencePreview />
      <FeaturedGrant />
      <ConnectSection />
    </div>
  );
}

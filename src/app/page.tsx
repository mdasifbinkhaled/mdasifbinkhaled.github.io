/**
 * Homepage
 *
 * Key Features:
 * - Semantic sections for improved maintainability
 * - Data layer separation for content management
 * - Modular component architecture
 */

import { Breadcrumbs } from '@/shared/components/navigation/breadcrumbs';
import {
  HeroSection,
  NewsSection,
  ResearchHighlights,
  PublicationsPreview,
  ExperiencePreview,
  FeaturedGrant,
  ConnectSection,
} from '@/features/home/components';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Breadcrumbs />

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

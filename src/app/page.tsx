/**
 * Homepage - Refactored from 508 lines to ~50 lines
 * Following audit recommendations from Antigravity (Google Deepmind)
 *
 * Key Improvements:
 * - Decomposed God Component into semantic sections
 * - Moved hardcoded data to data layer (news, research interests)
 * - Improved maintainability and testability
 * - Reduced component complexity from 508 to 50 lines (90% reduction)
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

import type { Metadata } from 'next';
import { TeachingIndex } from '@/features/teaching/components/teaching-revamp/teaching-index';

export const metadata: Metadata = {
  title: 'Teaching — preview',
  robots: { index: false, follow: false },
};

/**
 * Non-destructive preview of the revamped `/teaching` index. The live
 * `/teaching` page is untouched; this route exists only to review the redesign.
 */
export default function TeachingPreviewPage() {
  return (
    <>
      <p className="container-responsive mb-6 text-xs text-muted-foreground">
        Preview — a non-destructive draft of the revamped teaching index. Not
        linked from navigation and excluded from search.
      </p>
      <TeachingIndex />
    </>
  );
}

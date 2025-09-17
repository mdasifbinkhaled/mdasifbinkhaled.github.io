import type { PublicationItem } from '@/types';
import React from 'react';
import { PublicationCard } from '@/features/publications/publication-card';
import { BackToTop } from '@/shared/components/common/back-to-top';

interface PublicationListProps {
  initialPublications: PublicationItem[];
}

export const PublicationListServer = React.memo(function PublicationListServer({
  initialPublications,
}: PublicationListProps) {
  if (!initialPublications || initialPublications.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        No publications to display.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialPublications.map((pub) => (
          <PublicationCard key={pub.id} publication={pub} />
        ))}
      </div>
      <BackToTop />
    </div>
  );
});

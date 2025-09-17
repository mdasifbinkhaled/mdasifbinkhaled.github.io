'use client';

import dynamic from 'next/dynamic';
import type { PublicationItem } from '@/types';
import { Skeleton } from '@/shared/components/ui/skeleton';

const PublicationList = dynamic(
  () =>
    import('@/shared/components/common/publication-list').then(
      (mod) => mod.PublicationList
    ),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" /> {/* Filter section skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[280px] w-full" />
          ))}
        </div>
      </div>
    ),
  }
);

interface PublicationListClientProps {
  initialPublications: PublicationItem[];
}

export function PublicationListClient({
  initialPublications,
}: PublicationListClientProps) {
  return <PublicationList initialPublications={initialPublications} />;
}

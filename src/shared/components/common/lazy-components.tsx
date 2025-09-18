'use client';

import { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/components/ui/skeleton';
import type { PublicationItem } from '@/shared/types';

// Lazy load heavy components
export const LazyPublicationList = lazy(() =>
  import('./publication-list').then((module) => ({
    default: module.PublicationList,
  }))
);

// Props interfaces
interface PublicationListProps {
  initialPublications: PublicationItem[];
}

// Skeleton loaders for better UX
export function PublicationListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 space-y-3">
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex space-x-2 pt-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Wrapper components with Suspense
export function LazyPublicationListWithSuspense(props: PublicationListProps) {
  return (
    <Suspense fallback={<PublicationListSkeleton />}>
      <LazyPublicationList {...props} />
    </Suspense>
  );
}

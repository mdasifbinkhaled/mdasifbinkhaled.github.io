"use client";

import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
export const LazyExperienceTimeline = lazy(() => 
  import('./experience-timeline').then(module => ({ 
    default: module.ExperienceTimeline 
  }))
);

export const LazyPublicationList = lazy(() => 
  import('./publication-list').then(module => ({ 
    default: module.PublicationList 
  }))
);

// Skeleton loaders for better UX
export function ExperienceTimelineSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-start space-x-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

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
export function LazyExperienceTimelineWithSuspense(props: any) {
  return (
    <Suspense fallback={<ExperienceTimelineSkeleton />}>
      <LazyExperienceTimeline {...props} />
    </Suspense>
  );
}

export function LazyPublicationListWithSuspense(props: any) {
  return (
    <Suspense fallback={<PublicationListSkeleton />}>
      <LazyPublicationList {...props} />
    </Suspense>
  );
}

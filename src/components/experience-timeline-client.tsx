"use client";

import dynamic from 'next/dynamic';
import type { ExperienceItem } from '@/types';
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper';

const ExperienceTimeline = dynamic(() => import('@/components/experience-timeline').then(mod => mod.ExperienceTimeline), {
  ssr: false,
  loading: () => (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <SkeletonWrapper isLoading className="h-10 w-10 rounded-full" />
          <SkeletonWrapper isLoading className="h-40 w-full" />
        </div>
      ))}
    </div>
  ),
});

interface ExperienceTimelineClientProps {
  experiences: ExperienceItem[];
}

export function ExperienceTimelineClient({ experiences }: ExperienceTimelineClientProps) {
  return <ExperienceTimeline experiences={experiences} />;
}
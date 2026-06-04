'use client';

import { Badge } from '@/shared/components/ui/badge';

interface CoursePlanStatsProps {
  courseCount: number;
  completedCredits: number;
  totalCredits: number;
  unlockedCount: number;
}

export function CoursePlanStats({
  courseCount,
  completedCredits,
  totalCredits,
  unlockedCount,
}: CoursePlanStatsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="outline" className="text-sm px-3 py-1">
        {courseCount} courses
      </Badge>
      <Badge variant="outline" className="text-sm px-3 py-1">
        {completedCredits}/{totalCredits} credits completed
      </Badge>
      <Badge
        variant="outline"
        className="text-sm px-3 py-1 border-emerald-500/50 text-emerald-700 font-bold dark:text-emerald-400"
      >
        {unlockedCount} available now
      </Badge>
    </div>
  );
}

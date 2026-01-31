import { Calendar } from 'lucide-react';
import { CollapsibleSection } from '@/shared/components/ui/collapsible-section';
import { ScheduleTable } from '@/features/teaching/components/schedule-table';
import { ExamSchedule } from '@/features/teaching/components/exam-schedule';
import type { CourseData } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

export function ScheduleSection({ course }: { course: CourseData }) {
  const hasSchedule = course.classSchedule && course.classSchedule.length > 0;
  const hasExams = !!course.exams;

  if (!hasSchedule && !hasExams) return null;

  return (
    <CollapsibleSection
      title="Class Schedule"
      icon={Calendar}
      defaultOpen={false}
    >
      <div className="p-6">
        {hasSchedule && (
          <div className="mb-0">
            <ScheduleTable schedule={course.classSchedule!} />
          </div>
        )}

        {hasExams && (
          <div
            className={cn(
              'pt-8',
              hasSchedule && 'mt-8 border-t border-border/40'
            )}
          >
            <ExamSchedule exams={course.exams!} />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}

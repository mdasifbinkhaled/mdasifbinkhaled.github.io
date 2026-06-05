'use client';

import { CalendarDays } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useExamCountdown } from './use-exam-countdown';
import { ExamCountdownToolbar } from './exam-countdown-toolbar';
import { ExamTimerCard } from './exam-timer-card';

export function ExamCountdown() {
  const {
    exams,
    now,
    mounted,
    importOpen,
    setImportOpen,
    handleAdd,
    handleRemove,
    handleChange,
    handleExportICS,
    handleImportExams,
    handleReset,
  } = useExamCountdown();

  if (!mounted) return null;

  // Sort exams by chronological proximity
  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-8">
      <ExamCountdownToolbar
        exams={exams}
        importOpen={importOpen}
        setImportOpen={setImportOpen}
        handleAdd={handleAdd}
        handleExportICS={handleExportICS}
        handleImportExams={handleImportExams}
        handleReset={handleReset}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedExams.map((exam, i) => (
          <ExamTimerCard
            key={exam.id}
            exam={exam}
            index={i}
            now={now}
            onRemove={handleRemove}
            onChange={handleChange}
          />
        ))}

        {exams.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl border-border">
            <CalendarDays className="mx-auto h-8 w-8 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium text-foreground">
              No Exams Tracked
            </h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              You have no upcoming exams. Add one to start the countdown.
            </p>
            <Button onClick={handleAdd} variant="outline">
              Add First Exam
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

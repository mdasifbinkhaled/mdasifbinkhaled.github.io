'use client';

// ────────────────────────────────────────────────
// Exam Countdown — per-exam timer card
// ────────────────────────────────────────────────

import { Trash2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import {
  computeTimeRemaining,
  getUrgencyClasses,
  type ExamEvent,
} from './exam-countdown.utils';

interface ExamTimerCardProps {
  exam: ExamEvent;
  index: number;
  now: number;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof ExamEvent, value: string) => void;
}

export function ExamTimerCard({
  exam,
  index,
  now,
  onRemove,
  onChange,
}: ExamTimerCardProps) {
  const { days, hours, mins, secs, isPassed } = computeTimeRemaining(
    exam.date,
    now
  );
  const { urgencyClass, accentColor, countdownColor } = getUrgencyClasses(
    isPassed,
    days
  );

  const secsColor = isPassed
    ? 'text-muted-foreground'
    : days <= 1
      ? 'text-red-500'
      : 'text-primary';

  return (
    <Card
      className={cn('relative overflow-hidden transition-all', urgencyClass)}
    >
      {!isPassed && (
        <div className={cn('absolute top-0 right-0 w-1 h-full', accentColor)} />
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Input
            value={exam.course}
            placeholder="Course Code"
            aria-label={`Course code for exam ${index + 1}`}
            onChange={(e) => onChange(exam.id, 'course', e.target.value)}
            className="font-bold border-transparent px-0 h-7 text-lg bg-transparent focus-visible:ring-0 focus-visible:border-input shadow-none"
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Remove ${exam.course || 'exam'}`}
            onClick={() => onRemove(exam.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Input
          value={exam.title}
          placeholder="Exam Title"
          aria-label={`Exam title for ${exam.course || `exam ${index + 1}`}`}
          onChange={(e) => onChange(exam.id, 'title', e.target.value)}
          className="border-transparent px-0 h-6 text-sm text-muted-foreground bg-transparent focus-visible:ring-0 focus-visible:border-input shadow-none"
        />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-muted/30 border border-border/50">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            {isPassed ? 'Concluded' : 'Time Remaining'}
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center w-full">
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-2xl sm:text-3xl font-bold tabular-nums',
                  countdownColor
                )}
              >
                {days}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase mt-1">
                Days
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-2xl sm:text-3xl font-bold tabular-nums',
                  countdownColor
                )}
              >
                {hours.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase mt-1">
                Hours
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-2xl sm:text-3xl font-bold tabular-nums',
                  countdownColor
                )}
              >
                {mins.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase mt-1">
                Mins
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-2xl sm:text-3xl font-bold tabular-nums',
                  secsColor
                )}
              >
                {secs.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase mt-1">
                Secs
              </span>
            </div>
          </div>
        </div>

        <div className="grid space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Target Date & Time
          </label>
          <Input
            type="datetime-local"
            aria-label={`Target date and time for ${exam.course || `exam ${index + 1}`}`}
            value={exam.date.slice(0, 16)} // format: YYYY-MM-DDThh:mm
            onChange={(e) =>
              onChange(exam.id, 'date', new Date(e.target.value).toISOString())
            }
            className="text-sm h-9"
          />
        </div>
      </CardContent>
    </Card>
  );
}

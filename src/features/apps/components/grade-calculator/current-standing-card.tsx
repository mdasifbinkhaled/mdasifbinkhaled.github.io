'use client';

// ────────────────────────────────────────────────
// Grade Calculator — Current Standing card
// ────────────────────────────────────────────────

import { Calculator as CalculatorIcon, Copy } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { STANDARD_GRADING_SCALE } from '@/shared/lib/data/grading';
import { GRADE_SCALE_SEGMENT_WIDTH_CLASS } from './grade-calculator.utils';

interface CurrentStandingCardProps {
  currentPercentage: number;
  currentPoints: number;
  totalPossiblePoints: number;
  currentGradeMatch: string;
  gradeMarkerPoints: string;
  onCopyResult: () => void;
}

export function CurrentStandingCard({
  currentPercentage,
  currentPoints,
  totalPossiblePoints,
  currentGradeMatch,
  gradeMarkerPoints,
  onCopyResult,
}: CurrentStandingCardProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CalculatorIcon className="mr-2 h-5 w-5" />
          Current Standing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-6 bg-background rounded-xl border">
          <span className="text-5xl font-bold tabular-nums tracking-tighter text-primary">
            {currentPercentage.toFixed(1)}%
          </span>
          <span className="text-muted-foreground mt-2 font-medium">
            Current Calculated Grade:{' '}
            <strong className="text-foreground">{currentGradeMatch}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg border p-4 text-center">
            <span className="block text-2xl font-bold">
              {currentPoints.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">Points Earned</span>
          </div>
          <div className="bg-background rounded-lg border p-4 text-center">
            <span className="block text-2xl font-bold">
              {totalPossiblePoints.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              Points Counted
            </span>
          </div>
        </div>

        {/* Grade Scale Bar */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">
            Grade Scale
          </span>
          <div className="relative w-full h-6 rounded-full overflow-hidden bg-muted flex">
            {[...STANDARD_GRADING_SCALE].reverse().map((scale, i, arr) => {
              const nextMin = arr[i + 1]?.minPercentage ?? 100;
              const width = nextMin - scale.minPercentage;
              const isCurrentGrade = scale.label === currentGradeMatch;

              return (
                <div
                  key={scale.label}
                  className={cn(
                    'h-full grow-0 shrink-0 flex items-center justify-center text-[9px] font-bold border-r border-background/40 last:border-0',
                    GRADE_SCALE_SEGMENT_WIDTH_CLASS[scale.label],
                    isCurrentGrade
                      ? 'bg-primary text-primary-foreground opacity-100'
                      : 'opacity-50'
                  )}
                >
                  {width >= 6 ? scale.label : ''}
                </div>
              );
            })}
          </div>
          <svg
            className="-mt-0.5 block h-2 w-full text-primary"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points={gradeMarkerPoints} fill="currentColor" />
          </svg>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={onCopyResult}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Results
        </Button>
      </CardContent>
    </Card>
  );
}

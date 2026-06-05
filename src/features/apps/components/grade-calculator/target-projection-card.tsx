'use client';

// ────────────────────────────────────────────────
// Grade Calculator — Target Projection card
// ────────────────────────────────────────────────

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { STANDARD_GRADING_SCALE } from '@/shared/lib/data/grading';
import type { TargetRequirement } from './grade-calculator.utils';

interface TargetProjectionCardProps {
  targetGrade: string;
  setTargetGrade: (value: string) => void;
  targetRequirement: TargetRequirement;
  currentGradeMatch: string;
}

export function TargetProjectionCard({
  targetGrade,
  setTargetGrade,
  targetRequirement,
  currentGradeMatch,
}: TargetProjectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Target Projection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="desired-grade" className="text-sm font-medium">
            Desired Grade
          </label>
          <Select value={targetGrade} onValueChange={setTargetGrade}>
            <SelectTrigger id="desired-grade">
              <SelectValue placeholder="Select target grade" />
            </SelectTrigger>
            <SelectContent>
              {STANDARD_GRADING_SCALE.map((scale) => (
                <SelectItem key={scale.label} value={scale.label}>
                  {scale.label} ({scale.minPercentage}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 border-t">
          {targetRequirement.weightRemaining <= 0 ? (
            <div className="bg-muted p-4 rounded-lg text-sm text-center">
              100% of the course weight has been evaluated.
              <br />
              Final grade: <strong>{currentGradeMatch}</strong>
            </div>
          ) : targetRequirement.requiredAverage !== null &&
            targetRequirement.requiredAverage > 100 ? (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm font-medium">
              Status: Impossible. You need an average of{' '}
              {targetRequirement.requiredAverage.toFixed(1)}% on your remaining
              assignments to hit this target.
            </div>
          ) : targetRequirement.requiredAverage !== null &&
            targetRequirement.requiredAverage <= 0 ? (
            <div className="bg-green-100 text-green-700 dark:bg-green-900/30 p-4 rounded-lg text-sm font-medium">
              Status: Secured! You have already acquired enough points for this
              target.
            </div>
          ) : (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Points Still Needed:
                </span>
                <span className="font-medium">
                  {targetRequirement.pointsRemaining.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Weight Remaining:</span>
                <span className="font-medium">
                  {targetRequirement.weightRemaining.toFixed(1)}%
                </span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between items-center">
                <span className="font-semibold text-sm">Required Average:</span>
                <span className="text-xl font-bold tabular-nums tracking-tighter">
                  {targetRequirement.requiredAverage?.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

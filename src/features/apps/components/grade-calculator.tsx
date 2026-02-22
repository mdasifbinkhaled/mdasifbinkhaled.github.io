'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Plus, Trash2, Calculator as CalculatorIcon } from 'lucide-react';
import type { GradeComponent } from '@/shared/types/tools';
import { STANDARD_GRADING_SCALE } from '@/shared/types/tools';

export function GradeCalculator() {
  const [components, setComponents] = useState<GradeComponent[]>([
    { id: '1', name: 'Midterm', weight: 30, score: 0, maxScore: 100 },
    { id: '2', name: 'Final', weight: 40, score: 0, maxScore: 100 },
    { id: '3', name: 'Assignments', weight: 30, score: 0, maxScore: 100 },
  ]);

  const [targetGrade, setTargetGrade] = useState<string>('A');

  const { totalWeight, currentPercentage, currentPoints, totalPossiblePoints } =
    useMemo(() => {
      let tWeight = 0;
      let cPoints = 0;
      let pPoints = 0; // The max points possible relative to weight

      components.forEach((c) => {
        tWeight += Number(c.weight) || 0;

        const parsedScore = Number(c.score) || 0;
        const parsedMax = Number(c.maxScore) || 100;
        const parsedWeight = Number(c.weight) || 0;

        if (parsedMax > 0) {
          cPoints += (parsedScore / parsedMax) * parsedWeight;
          pPoints += parsedWeight;
        }
      });

      const currentPercentage = pPoints > 0 ? (cPoints / pPoints) * 100 : 0;

      return {
        totalWeight: tWeight,
        currentPercentage,
        currentPoints: cPoints,
        totalPossiblePoints: pPoints,
      };
    }, [components]);

  const handleAddComponent = () => {
    setComponents([
      ...components,
      {
        id: Math.random().toString(36).substring(7),
        name: `Component ${components.length + 1}`,
        weight: 0,
        score: 0,
        maxScore: 100,
      },
    ]);
  };

  const handleRemoveComponent = (id: string) => {
    setComponents(components.filter((c) => c.id !== id));
  };

  const handleChange = (
    id: string,
    field: keyof GradeComponent,
    value: number | string
  ) => {
    setComponents(
      components.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  // Determine required remaining points to hit target
  const targetRequirement = useMemo(() => {
    const scale = STANDARD_GRADING_SCALE.find((s) => s.label === targetGrade);
    const targetPercentage = scale
      ? scale.minPercentage
      : (STANDARD_GRADING_SCALE[0]?.minPercentage ?? 90);

    // Total points needed in the course (out of 100)
    const pointsNeeded = targetPercentage;
    // Points we still need to acquire
    const pointsRemaining = pointsNeeded - currentPoints;
    // Weights we haven't acquired yet
    const weightRemaining = 100 - totalPossiblePoints;

    return {
      pointsRemaining,
      weightRemaining,
      // What percentage do we need to average on the remaining weight?
      requiredAverage:
        weightRemaining > 0 ? (pointsRemaining / weightRemaining) * 100 : null,
    };
  }, [currentPoints, totalPossiblePoints, targetGrade]);

  const currentGradeMatch = useMemo(() => {
    return (
      STANDARD_GRADING_SCALE.find((s) => currentPercentage >= s.minPercentage)
        ?.label || 'F'
    );
  }, [currentPercentage]);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Calculator Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Course Components</CardTitle>
                <CardDescription>
                  Enter the weights and scores for your syllabus items.
                </CardDescription>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  totalWeight === 100
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30'
                    : totalWeight > 100
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30'
                }`}
              >
                Total Weight: {totalWeight}%
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 shadow-none">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[1fr_80px_80px_80px_40px] gap-4 mb-2 px-2 text-sm font-medium text-muted-foreground">
              <div>Component Name</div>
              <div>Weight %</div>
              <div>Score</div>
              <div>Max Score</div>
              <div></div>
            </div>

            {components.map((component) => (
              <div
                key={component.id}
                className="grid sm:grid-cols-[1fr_80px_80px_80px_40px] gap-4 items-center bg-muted/30 p-4 sm:p-2 rounded-xl sm:rounded-lg border sm:border-transparent"
              >
                <div className="space-y-2 sm:space-y-0">
                  <span className="text-xs font-semibold text-muted-foreground uppercase sm:hidden block">
                    Name
                  </span>
                  <Input
                    value={component.name}
                    onChange={(e) =>
                      handleChange(component.id, 'name', e.target.value)
                    }
                    aria-label={`Component name for index ${component.id}`}
                    placeholder="E.g., Midterm"
                  />
                </div>
                <div className="space-y-2 sm:space-y-0">
                  <span className="text-xs font-semibold text-muted-foreground uppercase sm:hidden block">
                    Weight (%)
                  </span>
                  <Input
                    type="number"
                    aria-label={`Weight percentage for ${component.name || component.id}`}
                    value={isNaN(component.weight) ? '' : component.weight}
                    onChange={(e) =>
                      handleChange(component.id, 'weight', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2 sm:space-y-0">
                  <span className="text-xs font-semibold text-muted-foreground uppercase sm:hidden block">
                    Score
                  </span>
                  <Input
                    aria-label={`Score for ${component.name || component.id}`}
                    type="number"
                    value={isNaN(component.score) ? '' : component.score}
                    onChange={(e) =>
                      handleChange(component.id, 'score', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2 sm:space-y-0">
                  <span className="text-xs font-semibold text-muted-foreground uppercase sm:hidden block">
                    Max Score
                  </span>
                  <Input
                    type="number"
                    aria-label={`Max score for ${component.name || component.id}`}
                    value={isNaN(component.maxScore) ? '' : component.maxScore}
                    onChange={(e) =>
                      handleChange(component.id, 'maxScore', e.target.value)
                    }
                  />
                </div>
                <div className="pt-6 sm:pt-0 flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveComponent(component.id)}
                    disabled={components.length <= 1}
                    aria-label={`Remove component ${component.name || component.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove Component</span>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleAddComponent}
              variant="outline"
              className="w-full border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Component
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Projection Panel */}
      <div className="space-y-6">
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
                <span className="text-xs text-muted-foreground">
                  Points Earned
                </span>
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
          </CardContent>
        </Card>

        {/* Projection Machine */}
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
                  {targetRequirement.requiredAverage.toFixed(1)}% on your
                  remaining assignments to hit this target.
                </div>
              ) : targetRequirement.requiredAverage !== null &&
                targetRequirement.requiredAverage <= 0 ? (
                <div className="bg-green-100 text-green-700 dark:bg-green-900/30 p-4 rounded-lg text-sm font-medium">
                  Status: Secured! You have already acquired enough points for
                  this target.
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
                    <span className="text-muted-foreground">
                      Weight Remaining:
                    </span>
                    <span className="font-medium">
                      {targetRequirement.weightRemaining.toFixed(1)}%
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between items-center">
                    <span className="font-semibold text-sm">
                      Required Average:
                    </span>
                    <span className="text-xl font-bold tabular-nums tracking-tighter">
                      {targetRequirement.requiredAverage?.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

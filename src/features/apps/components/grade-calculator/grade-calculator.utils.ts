// ────────────────────────────────────────────────
// Grade Calculator — pure helpers + constants
// (no 'use client' — this file has zero side-effects)
// ────────────────────────────────────────────────

import type { GradeComponent } from '@/shared/types/tools';
import { STANDARD_GRADING_SCALE } from '@/shared/lib/data/grading';

export const GRADE_TOOL_SLUG = 'grade-calculator';

export const DEFAULT_COMPONENTS: GradeComponent[] = [
  { id: '1', name: 'Midterm', weight: 30, score: 0, maxScore: 100 },
  { id: '2', name: 'Final', weight: 40, score: 0, maxScore: 100 },
  { id: '3', name: 'Assignments', weight: 30, score: 0, maxScore: 100 },
];

export const GRADE_SCALE_SEGMENT_WIDTH_CLASS: Record<string, string> = {
  A: 'basis-[10%]',
  'A-': 'basis-[5%]',
  'B+': 'basis-[5%]',
  B: 'basis-[5%]',
  'B-': 'basis-[5%]',
  'C+': 'basis-[5%]',
  C: 'basis-[5%]',
  'C-': 'basis-[5%]',
  'D+': 'basis-[5%]',
  D: 'basis-[5%]',
  F: 'basis-[45%]',
};

export interface GradeStats {
  totalWeight: number;
  currentPercentage: number;
  currentPoints: number;
  totalPossiblePoints: number;
}

export function computeGradeStats(components: GradeComponent[]): GradeStats {
  let tWeight = 0;
  let cPoints = 0;
  let pPoints = 0;

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
}

export interface TargetRequirement {
  pointsRemaining: number;
  weightRemaining: number;
  requiredAverage: number | null;
}

export function computeTargetRequirement(
  currentPoints: number,
  totalPossiblePoints: number,
  targetGrade: string
): TargetRequirement {
  const scale = STANDARD_GRADING_SCALE.find((s) => s.label === targetGrade);
  const targetPercentage = scale
    ? scale.minPercentage
    : (STANDARD_GRADING_SCALE[0]?.minPercentage ?? 90);

  const pointsNeeded = targetPercentage;
  const pointsRemaining = pointsNeeded - currentPoints;
  const weightRemaining = 100 - totalPossiblePoints;

  return {
    pointsRemaining,
    weightRemaining,
    requiredAverage:
      weightRemaining > 0 ? (pointsRemaining / weightRemaining) * 100 : null,
  };
}

export function computeCurrentGradeLabel(currentPercentage: number): string {
  return (
    STANDARD_GRADING_SCALE.find((s) => currentPercentage >= s.minPercentage)
      ?.label ?? 'F'
  );
}

export function computeGradeMarkerPoints(currentPercentage: number): string {
  const x = Math.min(100, Math.max(0, currentPercentage));
  return `${x},0 ${Math.max(0, x - 1.5)},8 ${Math.min(100, x + 1.5)},8`;
}

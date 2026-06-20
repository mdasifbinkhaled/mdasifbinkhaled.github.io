import { describe, it, expect } from 'vitest';
import {
  computeGradeStats,
  computeTargetRequirement,
  computeCurrentGradeLabel,
} from '@/features/apps/components/grade-calculator/grade-calculator.utils';
import type { GradeComponent } from '@/shared/types/tools';

const comp = (
  weight: number,
  score: number,
  maxScore: number,
  id = 'c'
): GradeComponent => ({ id, name: id, weight, score, maxScore });

describe('computeGradeStats', () => {
  it('is all-zero (except weight) when nothing is scored', () => {
    const r = computeGradeStats([
      comp(30, 0, 100, 'm'),
      comp(40, 0, 100, 'f'),
      comp(30, 0, 100, 'a'),
    ]);
    expect(r.totalWeight).toBe(100);
    expect(r.totalPossiblePoints).toBe(100);
    expect(r.currentPoints).toBe(0);
    expect(r.currentPercentage).toBe(0);
  });

  it('computes a full-marks single component as 100%', () => {
    const r = computeGradeStats([comp(30, 100, 100)]);
    expect(r.currentPoints).toBe(30);
    expect(r.totalPossiblePoints).toBe(30);
    expect(r.currentPercentage).toBe(100);
  });

  it('scales partial marks against max', () => {
    // 45/90 of weight 50 = 25 points; 25/50 → 50%
    const r = computeGradeStats([comp(50, 45, 90)]);
    expect(r.currentPoints).toBe(25);
    expect(r.currentPercentage).toBe(50);
  });

  it('returns zeros for an empty component list', () => {
    expect(computeGradeStats([])).toEqual({
      totalWeight: 0,
      currentPercentage: 0,
      currentPoints: 0,
      totalPossiblePoints: 0,
    });
  });
});

describe('computeTargetRequirement', () => {
  it('computes the required average on remaining weight', () => {
    // target A = 90; need 90 - 30 = 60 over 100 - 50 = 50 weight → 120%
    const r = computeTargetRequirement(30, 50, 'A');
    expect(r.pointsRemaining).toBe(60);
    expect(r.weightRemaining).toBe(50);
    expect(r.requiredAverage).toBe(120);
  });

  it('reports 0 required when the target is already secured', () => {
    const r = computeTargetRequirement(90, 50, 'A');
    expect(r.pointsRemaining).toBe(0);
    expect(r.requiredAverage).toBe(0);
  });

  it('returns null required average when no weight remains', () => {
    const r = computeTargetRequirement(80, 100, 'A');
    expect(r.weightRemaining).toBe(0);
    expect(r.requiredAverage).toBeNull();
  });

  it('falls back to the top grade threshold for an unknown target', () => {
    const r = computeTargetRequirement(0, 0, 'ZZ');
    // top of scale = A @ 90
    expect(r.pointsRemaining).toBe(90);
    expect(r.requiredAverage).toBe(90);
  });
});

describe('computeCurrentGradeLabel (boundary mapping)', () => {
  it.each([
    [90, 'A'],
    [89.99, 'A-'],
    [85, 'A-'],
    [84.99, 'B+'],
    [60, 'C'],
    [0, 'F'],
    [-5, 'F'],
  ])('maps %s%% → %s', (pct, label) => {
    expect(computeCurrentGradeLabel(pct)).toBe(label);
  });
});

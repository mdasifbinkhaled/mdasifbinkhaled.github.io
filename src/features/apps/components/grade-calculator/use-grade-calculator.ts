'use client';

// ────────────────────────────────────────────────
// Grade Calculator — state management hook
// ────────────────────────────────────────────────

import { useMemo, useCallback } from 'react';
import type { GradeComponent } from '@/shared/types/tools';
import { useToolStorage } from '@/shared/lib/storage';
import { toast } from 'sonner';
import {
  GRADE_TOOL_SLUG,
  DEFAULT_COMPONENTS,
  computeGradeStats,
  computeTargetRequirement,
  computeCurrentGradeLabel,
  computeGradeMarkerPoints,
} from './grade-calculator.utils';

export function useGradeCalculator() {
  const [components, setComponents, { ready: cReady }] = useToolStorage<
    GradeComponent[]
  >(GRADE_TOOL_SLUG, 'components', DEFAULT_COMPONENTS);

  const [targetGrade, setTargetGrade, { ready: tReady }] =
    useToolStorage<string>(GRADE_TOOL_SLUG, 'target', 'A');

  const handleResetAll = useCallback(() => {
    setComponents(DEFAULT_COMPONENTS);
    setTargetGrade('A');
  }, [setComponents, setTargetGrade]);

  const { totalWeight, currentPercentage, currentPoints, totalPossiblePoints } =
    useMemo(() => computeGradeStats(components), [components]);

  const handleAddComponent = useCallback(() => {
    setComponents((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: `Component ${prev.length + 1}`,
        weight: 0,
        score: 0,
        maxScore: 100,
      },
    ]);
  }, [setComponents]);

  const handleRemoveComponent = useCallback(
    (id: string) => {
      setComponents((prev) => prev.filter((c) => c.id !== id));
    },
    [setComponents]
  );

  const handleChange = useCallback(
    (id: string, field: keyof GradeComponent, value: string) => {
      setComponents((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          if (field === 'name') return { ...c, [field]: value };
          const num = value === '' ? 0 : Number(value);
          if (isNaN(num)) return c;
          const clamped =
            field === 'weight'
              ? Math.min(100, Math.max(0, num))
              : field === 'maxScore'
                ? Math.max(1, num) // a component must have a positive max
                : Math.max(0, num); // score
          return { ...c, [field]: clamped };
        })
      );
    },
    [setComponents]
  );

  const targetRequirement = useMemo(
    () =>
      computeTargetRequirement(currentPoints, totalPossiblePoints, targetGrade),
    [currentPoints, totalPossiblePoints, targetGrade]
  );

  const currentGradeMatch = useMemo(
    () => computeCurrentGradeLabel(currentPercentage),
    [currentPercentage]
  );

  const gradeMarkerPoints = useMemo(
    () => computeGradeMarkerPoints(currentPercentage),
    [currentPercentage]
  );

  const handleCopyResult = useCallback(() => {
    const lines = components.map(
      (c) => `${c.name}: ${c.score}/${c.maxScore} (weight ${c.weight}%)`
    );
    const text = [
      'Grade Calculator Results',
      '─'.repeat(30),
      ...lines,
      '',
      `Current Grade: ${currentGradeMatch} (${currentPercentage.toFixed(1)}%)`,
      `Total Weight: ${totalWeight}%`,
    ].join('\n');
    navigator.clipboard.writeText(text).then(
      () => toast.success('Results copied to clipboard'),
      () => toast.error('Failed to copy')
    );
  }, [components, currentGradeMatch, currentPercentage, totalWeight]);

  return {
    // storage readiness
    cReady,
    tReady,
    // state
    components,
    targetGrade,
    setTargetGrade,
    // derived
    totalWeight,
    currentPercentage,
    currentPoints,
    totalPossiblePoints,
    targetRequirement,
    currentGradeMatch,
    gradeMarkerPoints,
    // handlers
    handleResetAll,
    handleAddComponent,
    handleRemoveComponent,
    handleChange,
    handleCopyResult,
  };
}

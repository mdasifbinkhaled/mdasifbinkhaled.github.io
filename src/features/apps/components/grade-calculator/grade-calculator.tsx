'use client';

// ────────────────────────────────────────────────
// Grade Calculator — orchestrating component
// ────────────────────────────────────────────────

import { ToolSettings } from '@/shared/components/common/tool-settings';
import { useGradeCalculator } from './use-grade-calculator';
import { GradeComponentsTable } from './grade-components-table';
import { CurrentStandingCard } from './current-standing-card';
import { TargetProjectionCard } from './target-projection-card';
import { GRADE_TOOL_SLUG } from './grade-calculator.utils';

export function GradeCalculator() {
  const {
    cReady,
    tReady,
    components,
    targetGrade,
    setTargetGrade,
    totalWeight,
    currentPercentage,
    currentPoints,
    totalPossiblePoints,
    targetRequirement,
    currentGradeMatch,
    gradeMarkerPoints,
    handleResetAll,
    handleAddComponent,
    handleRemoveComponent,
    handleChange,
    handleCopyResult,
  } = useGradeCalculator();

  if (!cReady || !tReady) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <ToolSettings
          toolName="Grade Calculator"
          toolSlug={GRADE_TOOL_SLUG}
          onReset={handleResetAll}
        />
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Calculator Form */}
        <div className="lg:col-span-2 space-y-6">
          <GradeComponentsTable
            components={components}
            totalWeight={totalWeight}
            onAdd={handleAddComponent}
            onRemove={handleRemoveComponent}
            onChange={handleChange}
          />
        </div>

        {/* Projection Panel */}
        <div className="space-y-6">
          <CurrentStandingCard
            currentPercentage={currentPercentage}
            currentPoints={currentPoints}
            totalPossiblePoints={totalPossiblePoints}
            currentGradeMatch={currentGradeMatch}
            gradeMarkerPoints={gradeMarkerPoints}
            onCopyResult={handleCopyResult}
          />
          <TargetProjectionCard
            targetGrade={targetGrade}
            setTargetGrade={setTargetGrade}
            targetRequirement={targetRequirement}
            currentGradeMatch={currentGradeMatch}
          />
        </div>
      </div>
    </div>
  );
}

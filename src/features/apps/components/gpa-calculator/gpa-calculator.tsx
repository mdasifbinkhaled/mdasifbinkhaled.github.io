'use client';

import { FileUp } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ToolSettings } from '@/shared/components/common/tool-settings';
import { DataImporter } from '@/shared/components/common/data-importer';
import { useGpaCalculator } from './use-gpa-calculator';
import { CourseList } from './course-list';
import { CgpaConfig } from './cgpa-config';
import { GpaResults } from './gpa-results';
import { GPA_TOOL_SLUG, TRANSCRIPT_FIELDS } from './gpa-calculator.utils';

export function GpaCalculator() {
  const {
    courses,
    prevCredits,
    prevCgpa,
    importOpen,
    mounted,
    termGpa,
    termCredits,
    cgpa,
    totalCredits,
    setPrevCredits,
    setPrevCgpa,
    setImportOpen,
    handleResetAll,
    handleImportTranscript,
    handleAddCourse,
    handleRemoveCourse,
    handleCourseChange,
    handleCopyResult,
  } = useGpaCalculator();

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-2 print:hidden">
        <Button size="sm" variant="outline" onClick={() => setImportOpen(true)}>
          <FileUp className="h-4 w-4 mr-1" /> Import transcript
        </Button>
        <ToolSettings
          toolName="GPA Calculator"
          toolSlug={GPA_TOOL_SLUG}
          onReset={handleResetAll}
        />
      </div>
      <DataImporter<(typeof TRANSCRIPT_FIELDS)[number]['key']>
        open={importOpen}
        onOpenChange={setImportOpen}
        defaultTab="upload"
        fields={TRANSCRIPT_FIELDS}
        title="Import transcript"
        description="Paste your transcript rows or upload a CSV/XLSX. Columns: Course, Credits, Grade."
        pastePlaceholder={
          'Course\tCredits\tGrade\nCSE 420\t3\tA\nMAT 216\t3\tB+'
        }
        onCommit={handleImportTranscript}
      />
      <div className="grid gap-6 md:grid-cols-[2fr_1fr] print:block">
        {/* ── Editor Column ── */}
        <div className="space-y-6">
          <CourseList
            courses={courses}
            onAddCourse={handleAddCourse}
            onRemoveCourse={handleRemoveCourse}
            onCourseChange={handleCourseChange}
          />
          <CgpaConfig
            prevCredits={prevCredits}
            prevCgpa={prevCgpa}
            onPrevCreditsChange={setPrevCredits}
            onPrevCgpaChange={setPrevCgpa}
          />
        </div>

        {/* ── Results Column ── */}
        <div className="space-y-6 md:sticky md:top-24 h-fit">
          <GpaResults
            termGpa={termGpa}
            termCredits={termCredits}
            cgpa={cgpa}
            totalCredits={totalCredits}
            prevCredits={prevCredits}
            prevCgpa={prevCgpa}
            onCopyResult={handleCopyResult}
          />
        </div>
      </div>
    </div>
  );
}

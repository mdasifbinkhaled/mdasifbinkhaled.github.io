'use client';

// ────────────────────────────────────────────────
// Exam Countdown — header toolbar (add/import/export + DataImporter dialog)
// ────────────────────────────────────────────────

import { Timer, Plus, Download, FileUp } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ToolSettings } from '@/shared/components/common/tool-settings';
import { DataImporter } from '@/shared/components/common/data-importer';
import {
  EXAM_TOOL_SLUG,
  EXAM_FIELDS,
  type ExamKey,
} from './exam-countdown.utils';
import type { ExamCountdownState } from './use-exam-countdown';

interface ExamCountdownToolbarProps {
  exams: ExamCountdownState['exams'];
  importOpen: ExamCountdownState['importOpen'];
  setImportOpen: ExamCountdownState['setImportOpen'];
  handleAdd: ExamCountdownState['handleAdd'];
  handleExportICS: ExamCountdownState['handleExportICS'];
  handleImportExams: ExamCountdownState['handleImportExams'];
  handleReset: ExamCountdownState['handleReset'];
}

export function ExamCountdownToolbar({
  exams,
  importOpen,
  setImportOpen,
  handleAdd,
  handleExportICS,
  handleImportExams,
  handleReset,
}: ExamCountdownToolbarProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary" />
          Active Timers
        </h2>
        <div className="flex gap-2">
          <Button onClick={handleAdd} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Exam
          </Button>
          <Button
            onClick={() => setImportOpen(true)}
            size="sm"
            variant="outline"
          >
            <FileUp className="mr-2 h-4 w-4" /> Import
          </Button>
          {exams.length > 0 && (
            <Button onClick={handleExportICS} size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export .ics
            </Button>
          )}
          <ToolSettings
            toolName="Exam Countdown"
            toolSlug={EXAM_TOOL_SLUG}
            onReset={handleReset}
          />
        </div>
      </div>
      <DataImporter<ExamKey>
        open={importOpen}
        onOpenChange={setImportOpen}
        defaultTab="upload"
        fields={EXAM_FIELDS}
        title="Import exams"
        description="Paste or upload a CSV/XLSX. Columns: Course, Title, Date (ISO or any parseable date)."
        pastePlaceholder={
          'Course\tTitle\tDate\nCSE 420\tFinal\t2026-05-12T09:00'
        }
        onCommit={handleImportExams}
      />
    </>
  );
}

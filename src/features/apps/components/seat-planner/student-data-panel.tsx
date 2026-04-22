'use client';

// ────────────────────────────────────────────────
// Seat Planner — Student Data panel (v2)
// ────────────────────────────────────────────────

import { useMemo, useState } from 'react';
import { Upload, Trash2, Users, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { DataImporter } from '@/shared/components/common/data-importer';
import type {
  ImportedRow,
  ImportCommitMeta,
  SchemaField,
} from '@/shared/lib/parsers/types';
import {
  buildSeatPlanTableColumns,
  getSeatPlanTableValue,
} from './export-utils';
import { Th } from './shared-ui';
import { inferSectionFromSource } from './import-utils';
import type { Student } from './types';

type StudentKey = 'id' | 'name' | 'section';

const STUDENT_FIELDS: readonly SchemaField<StudentKey>[] = [
  {
    key: 'id',
    label: 'Student ID',
    required: true,
    aliases: ['id', 'student id', 'studentid', 'student_id', 'roll'],
  },
  {
    key: 'name',
    label: 'Name',
    required: true,
    aliases: ['name', 'student name', 'full name', 'studentname'],
  },
  {
    key: 'section',
    label: 'Section',
    required: false,
    aliases: ['section', 'sec', 'group'],
    perFileValue: {
      description:
        'Use file-level values when section is missing from the sheet. Seat Planner will prefill this from filenames like sec-2.csv, section_3.xlsx, 8-section.tsv, or students-8.csv when it can.',
      placeholder: 'e.g. 1',
      inputMode: 'numeric',
      type: 'number',
      infer: inferSectionFromSource,
    },
    parse: (raw) => {
      const n = Number(raw);
      if (!Number.isFinite(n) || n < 1) {
        throw new Error(`invalid section "${raw}"`);
      }
      return Math.floor(n);
    },
  },
];

interface StudentDataPanelProps {
  students: Student[];
  sections: number[];
  onImport: (rows: ImportedRow<StudentKey>[], meta: ImportCommitMeta) => void;
  onRemoveStudent: (id: string) => void;
}

export function StudentDataPanel({
  students,
  sections,
  onImport,
  onRemoveStudent,
}: StudentDataPanelProps) {
  const [importOpen, setImportOpen] = useState(false);
  const tableColumns = useMemo(
    () =>
      buildSeatPlanTableColumns(students, 'master').filter(
        (column) => column.kind !== 'room'
      ),
    [students]
  );
  const extraFieldCount = tableColumns.filter(
    (column) => column.kind === 'extra'
  ).length;

  return (
    <Card className="border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md print:hidden">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <Users className="h-5 w-5" aria-hidden />
          Student Data
          {students.length > 0 && (
            <span className="ml-auto flex items-center gap-2 text-sm font-normal text-muted-foreground">
              <CheckCircle2
                className="h-4 w-4 text-green-600 dark:text-green-400"
                aria-hidden
              />
              {students.length} student{students.length === 1 ? '' : 's'}
              {sections.length > 0 &&
                ` · ${sections.length} section${sections.length === 1 ? '' : 's'}`}
              {extraFieldCount > 0 &&
                ` · ${extraFieldCount} extra field${extraFieldCount === 1 ? '' : 's'}`}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => setImportOpen(true)}
            variant={students.length === 0 ? 'default' : 'outline'}
            size="sm"
          >
            <Upload className="h-4 w-4" aria-hidden />
            <span className="ml-1.5">
              {students.length === 0 ? 'Import students' : 'Import more'}
            </span>
          </Button>
          <p className="text-xs text-muted-foreground">
            Paste from a spreadsheet or upload CSV / TSV / XLSX. Columns: ID,
            Name, Section. Section can also come from each filename, and you can
            keep additional passthrough columns when needed.
          </p>
        </div>

        {students.length > 0 ? (
          <div className="max-h-[28rem] overflow-auto rounded-xl border bg-background/80 shadow-xs">
            <table className="min-w-max text-sm">
              <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                <tr>
                  {tableColumns.map((column) => (
                    <Th
                      key={column.key}
                      className={
                        column.kind === 'sl'
                          ? 'w-12 text-right'
                          : column.kind === 'id'
                            ? 'w-28'
                            : column.kind === 'section'
                              ? 'w-16 text-center'
                              : column.kind === 'extra'
                                ? 'min-w-[8rem]'
                                : undefined
                      }
                    >
                      {column.kind === 'sl' ? '#' : column.label}
                    </Th>
                  ))}
                  <Th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr
                    key={s.id}
                    className="border-t transition-colors hover:bg-muted/25"
                  >
                    {tableColumns.map((column) => (
                      <td
                        key={column.key}
                        className={
                          column.kind === 'sl'
                            ? 'py-1.5 pr-2 text-right font-mono text-xs text-muted-foreground'
                            : column.kind === 'id'
                              ? 'py-1.5 pr-2 font-mono text-xs'
                              : column.kind === 'section'
                                ? 'py-1.5 px-3 text-center tabular-nums'
                                : 'py-1.5 pr-2'
                        }
                      >
                        {getSeatPlanTableValue(s, column, i)}
                      </td>
                    ))}
                    <td className="py-1.5 pr-2 text-right">
                      <button
                        type="button"
                        onClick={() => onRemoveStudent(s.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${s.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-muted/10 p-6 text-center text-sm text-muted-foreground">
            No students yet. Click{' '}
            <span className="font-medium">Import students</span> to begin.
          </div>
        )}
      </CardContent>

      <DataImporter<StudentKey>
        open={importOpen}
        onOpenChange={setImportOpen}
        defaultTab="upload"
        fields={STUDENT_FIELDS}
        title="Import students"
        description="Paste rows from Excel / Google Sheets, or upload a CSV / TSV / XLSX file."
        pastePlaceholder={
          'ID\tName\tSection\n23101001\tAlice Rahman\t1\n23101002\tBob Khan\t2'
        }
        helpText="Each row needs a Student ID and Name. Section can come from a column, from a per-file value inferred from flexible filenames, or it defaults to 1. Additional passthrough columns are preserved and included in CSV export."
        allowExtraColumns
        onCommit={(rows, meta) => onImport(rows, meta)}
      />
    </Card>
  );
}

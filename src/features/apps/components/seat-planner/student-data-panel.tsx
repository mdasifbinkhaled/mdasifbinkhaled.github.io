'use client';

// ────────────────────────────────────────────────
// Seat Planner — Student Data panel (v2)
// ────────────────────────────────────────────────

import { useState } from 'react';
import { Upload, Trash2, Users, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { DataImporter } from '@/shared/components/common/data-importer';
import type { SchemaField, ImportCommitMeta } from '@/shared/lib/parsers/types';
import { Th } from './shared-ui';
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
  onImport: (
    rows: Record<StudentKey, unknown>[],
    meta: ImportCommitMeta
  ) => void;
  onRemoveStudent: (id: string) => void;
}

export function StudentDataPanel({
  students,
  sections,
  onImport,
  onRemoveStudent,
}: StudentDataPanelProps) {
  const [importOpen, setImportOpen] = useState(false);

  return (
    <Card className="print:hidden">
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
            Name, Section.
          </p>
        </div>

        {students.length > 0 ? (
          <div className="max-h-[28rem] overflow-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                <tr>
                  <Th className="w-12 text-right">#</Th>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th className="w-16 text-center">Sec</Th>
                  <Th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} className="border-t">
                    <td className="py-1.5 pr-2 text-right font-mono text-xs text-muted-foreground">
                      {i + 1}
                    </td>
                    <td className="py-1.5 pr-2 font-mono text-xs">{s.id}</td>
                    <td className="py-1.5 pr-2">{s.name}</td>
                    <td className="py-1.5 text-center tabular-nums">
                      {s.section}
                    </td>
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
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No students yet. Click{' '}
            <span className="font-medium">Import students</span> to begin.
          </div>
        )}
      </CardContent>

      <DataImporter<StudentKey>
        open={importOpen}
        onOpenChange={setImportOpen}
        fields={STUDENT_FIELDS}
        title="Import students"
        description="Paste rows from Excel / Google Sheets, or upload a CSV / TSV / XLSX file."
        pastePlaceholder={
          'ID\tName\tSection\n23101001\tAlice Rahman\t1\n23101002\tBob Khan\t2'
        }
        helpText="Each row needs a Student ID and Name. Section is optional (defaults to 1)."
        onCommit={(rows, meta) => onImport(rows, meta)}
      />
    </Card>
  );
}

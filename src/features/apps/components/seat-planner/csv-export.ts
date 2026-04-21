// ────────────────────────────────────────────────
// Seat Planner — CSV / Excel‑compatible export
// ────────────────────────────────────────────────

import type { Student, ExamDetails } from './types';
import { downloadFile as download } from '@/shared/lib/download-file';
import {
  buildSeatPlanExportFilename,
  getStudentExtraKeys,
} from './export-utils';

// ── CSV value escaping ──────────────────────────

/** Wrap value in quotes if it contains commas, quotes, or newlines */
function csvCell(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

// ── master list CSV ─────────────────────────────

export function exportMasterListCSV(
  students: Student[],
  details: ExamDetails
): void {
  const extraKeys = getStudentExtraKeys(students);
  const header = [
    'SL',
    'Student ID',
    'Student Name',
    'Section',
    'Room Number',
    ...extraKeys,
  ].join(',');
  const rows = students.map((s, i) =>
    [
      i + 1,
      csvCell(s.id),
      csvCell(s.name),
      s.section,
      csvCell(s.room ?? 'Unassigned'),
      ...extraKeys.map((key) => csvCell(s.extras?.[key] ?? '')),
    ].join(',')
  );

  download(
    `\uFEFF${[header, ...rows].join('\n')}`,
    buildSeatPlanExportFilename(details, 'master-list', 'csv'),
    'text/csv'
  );
}

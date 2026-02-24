// ────────────────────────────────────────────────
// Seat Planner — CSV / Excel‑compatible export
// ────────────────────────────────────────────────

import type { Student, ExamDetails } from './types';

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
  const header = 'SL,Student ID,Student Name,Section,Room Number';
  const rows = students.map(
    (s, i) =>
      `${i + 1},${csvCell(s.id)},${csvCell(s.name)},${s.section},${csvCell(s.room ?? 'Unassigned')}`
  );

  download(
    [header, ...rows].join('\n'),
    csvFilename(details, 'Master_List'),
    'text/csv'
  );
}

// ── helpers ─────────────────────────────────────

function download(content: string, name: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function csvFilename(d: ExamDetails, suffix: string): string {
  const base = (d.courseCodes || 'seat-plan')
    .replace(/\//g, '-')
    .replace(/\s+/g, '_');
  return `${base}_${suffix}.csv`;
}

// ────────────────────────────────────────────────
// Seat Planner — CSV / Excel‑compatible export
// ────────────────────────────────────────────────

import type { Student, ExamDetails, RoomAllocation } from './types';

// ── master list CSV ─────────────────────────────

export function exportMasterListCSV(
  students: Student[],
  details: ExamDetails
): void {
  const header = 'SL,Student ID,Student Name,Section,Room Number';
  const rows = students.map(
    (s, i) =>
      `${i + 1},${s.id},"${s.name}",${s.section},${s.room ?? 'Unassigned'}`
  );

  download(
    [header, ...rows].join('\n'),
    csvFilename(details, 'Master_List'),
    'text/csv'
  );
}

// ── per‑room CSV ────────────────────────────────

export function exportRoomCSV(
  alloc: RoomAllocation,
  details: ExamDetails
): void {
  const meta = [
    `"Room: ${alloc.room.name}"`,
    `"${details.courseCodes}${details.courseTitle ? ` — ${details.courseTitle}` : ''}"`,
    '',
  ];
  const header = 'SL,Student ID,Student Name,Section';
  const rows = alloc.students.map(
    (s, i) => `${i + 1},${s.id},"${s.name}",${s.section}`
  );

  download(
    [...meta, header, ...rows].join('\n'),
    csvFilename(details, alloc.room.name),
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

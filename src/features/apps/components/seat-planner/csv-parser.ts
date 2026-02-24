// ────────────────────────────────────────────────
// Seat Planner — CSV / TSV paste/upload parser
// ────────────────────────────────────────────────

import type { Student } from './types';

export interface ParseResult {
  students: Student[];
  errors: string[];
}

/**
 * Parse tab‑ or comma‑separated student data.
 *
 * Supported column Orders (auto‑detected via headers or column count):
 *   3 cols → ID, Name, Section
 *   4 cols → SL, ID, Name, Section
 *   5 cols → SL, ID, Name, Section, Room  (Room is ignored)
 *
 * If a header row is detected the column indices are read from it.
 */
export function parseStudentData(text: string): ParseResult {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.trim());

  if (lines.length === 0) return { students: [], errors: [] };

  const students: Student[] = [];
  const errors: string[] = [];

  // ── detect delimiter ────────────────────────
  const firstLine = lines[0] ?? '';
  const delimiter = firstLine.includes('\t') ? '\t' : ',';

  // ── detect header row ───────────────────────
  const firstCols = firstLine
    .split(delimiter)
    .map((s) => s.trim().toLowerCase());

  const HEADER_TOKENS = [
    'id',
    'student id',
    'studentid',
    'name',
    'student name',
    'section',
    'sec',
    'sl',
    'serial',
  ];
  const hasHeader = firstCols.some((h) => HEADER_TOKENS.includes(h));

  // ── resolve column positions ────────────────
  let idCol = -1;
  let nameCol = -1;
  let secCol = -1;

  if (hasHeader) {
    for (let i = 0; i < firstCols.length; i++) {
      const h = firstCols[i] ?? '';
      if (idCol === -1 && h.includes('id') && !h.startsWith('sl')) idCol = i;
      if (nameCol === -1 && h.includes('name')) nameCol = i;
      if (secCol === -1 && (h.includes('section') || h === 'sec')) secCol = i;
    }
  }

  // fallback: infer from column count
  if (idCol === -1 || nameCol === -1 || secCol === -1) {
    const numCols = firstCols.length;
    if (numCols >= 4) {
      // SL, ID, Name, Section [, Room]
      idCol = 1;
      nameCol = 2;
      secCol = 3;
    } else if (numCols >= 3) {
      // ID, Name, Section
      idCol = 0;
      nameCol = 1;
      secCol = 2;
    } else {
      errors.push(
        'Data must have at least 3 columns: Student ID, Name, Section'
      );
      return { students, errors };
    }
  }

  const startIdx = hasHeader ? 1 : 0;
  const maxCol = Math.max(idCol, nameCol, secCol);

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const cols = line.split(delimiter).map((s) => s.trim());
    const row = i + 1;

    if (cols.length <= maxCol) {
      if (cols.join('').trim()) errors.push(`Row ${row}: not enough columns`);
      continue;
    }

    const id = cols[idCol] ?? '';
    const name = cols[nameCol] ?? '';
    const sectionStr = cols[secCol] ?? '';
    const section = parseInt(sectionStr, 10);

    if (!id) {
      errors.push(`Row ${row}: missing student ID`);
      continue;
    }
    if (!name) {
      errors.push(`Row ${row}: missing student name`);
      continue;
    }
    if (isNaN(section)) {
      errors.push(`Row ${row}: invalid section "${sectionStr}"`);
      continue;
    }

    students.push({ id, name, section });
  }

  // duplicate‑ID check — keep only the first occurrence
  const seen = new Set<string>();
  const deduped: Student[] = [];
  for (const s of students) {
    if (seen.has(s.id)) {
      errors.push(`Duplicate student ID "${s.id}" — keeping first occurrence`);
    } else {
      seen.add(s.id);
      deduped.push(s);
    }
  }

  return { students: deduped, errors };
}

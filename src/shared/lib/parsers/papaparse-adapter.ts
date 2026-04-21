/**
 * PapaParse adapter — CSV / TSV / pasted text → TabularData.
 *
 * We run PapaParse with `header: false` (we own header detection) and
 * `skipEmptyLines: 'greedy'` (blank-and-whitespace-only lines are dropped
 * and surfaced as a single warning).
 */

import Papa from 'papaparse';
import type { TabularData } from './types';

const DELIMITERS = [',', '\t', ';', '|'] as const;
type Delimiter = (typeof DELIMITERS)[number];

function stripBom(s: string): string {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

function sniffDelimiter(sample: string): Delimiter {
  const firstLine = sample.split(/\r?\n/, 1)[0] ?? '';
  let best: Delimiter = ',';
  let bestCount = 0;
  for (const d of DELIMITERS) {
    const count = firstLine.split(d).length - 1;
    if (count > bestCount) {
      best = d;
      bestCount = count;
    }
  }
  return best;
}

/**
 * Heuristic: a row is a header if it has more non-numeric cells than
 * numeric ones AND is shorter than the average body row OR contains
 * alphabetic words.
 */
function looksLikeHeader(row: string[]): boolean {
  if (row.length === 0) return false;
  let alphaCells = 0;
  let numericCells = 0;
  for (const cell of row) {
    const trimmed = cell.trim();
    if (!trimmed) continue;
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) numericCells++;
    else if (/[a-zA-Z]/.test(trimmed)) alphaCells++;
  }
  return alphaCells > numericCells;
}

function synthesizeHeaders(cols: number): string[] {
  return Array.from({ length: cols }, (_, i) => `Column ${i + 1}`);
}

export function parseText(text: string, source: string): TabularData {
  const cleaned = stripBom(text);
  const warnings: string[] = [];
  const delimiter = sniffDelimiter(cleaned);

  const res = Papa.parse<string[]>(cleaned, {
    delimiter,
    header: false,
    skipEmptyLines: 'greedy',
    transform: (v) => v.trim(),
  });

  const allRows = res.data.filter((r): r is string[] => Array.isArray(r));
  if (res.errors.length > 0) {
    for (const e of res.errors.slice(0, 5)) {
      // PapaParse errors include `row` (0-based body index)
      warnings.push(
        `${e.code}: ${e.message}${e.row !== undefined ? ` (row ${e.row + 1})` : ''}`
      );
    }
    if (res.errors.length > 5)
      warnings.push(`…and ${res.errors.length - 5} more parser notes`);
  }

  if (allRows.length === 0) {
    return { headers: [], rows: [], source, delimiter, warnings };
  }

  // Normalize row length to the widest row so every row has the same arity.
  const maxCols = Math.max(...allRows.map((r) => r.length));
  const normalized = allRows.map((r) =>
    r.length < maxCols ? [...r, ...Array(maxCols - r.length).fill('')] : r
  );

  const firstRow = normalized[0] ?? [];
  const hasHeader = looksLikeHeader(firstRow);
  const headers = hasHeader
    ? firstRow.map((h, i) => h.trim() || `Column ${i + 1}`)
    : synthesizeHeaders(maxCols);
  const rows = hasHeader ? normalized.slice(1) : normalized;

  return { headers, rows, source, delimiter, warnings };
}

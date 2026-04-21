/**
 * XLSX / XLS adapter — wraps `read-excel-file` via a lazy dynamic import.
 *
 * We intentionally use `read-excel-file` (Apache-2.0, no known advisories)
 * in place of the npm `xlsx` package (which has unresolved HIGH-severity
 * CVEs; see ADR-007). Read-only is all we need for the importer.
 *
 * The library is loaded **only** when a `.xlsx` / `.xls` file is handed
 * to `parseSpreadsheet()` — never eagerly — so it does not impact the
 * base bundle of users who never import a spreadsheet.
 */

import type { TabularData } from './types';

export async function parseSpreadsheet(file: File): Promise<TabularData> {
  const { readSheet } = await import('read-excel-file/browser');
  const warnings: string[] = [];

  // `readSheet` returns the first sheet's rows as `(string|number|boolean|Date|null)[][]`.
  const raw = (await readSheet(file)) as unknown as (
    | string
    | number
    | boolean
    | Date
    | null
  )[][];

  if (!raw || raw.length === 0) {
    return {
      headers: [],
      rows: [],
      source: file.name,
      warnings: ['Spreadsheet contained no readable data.'],
    };
  }

  const stringify = (cell: unknown): string => {
    if (cell === null || cell === undefined) return '';
    if (cell instanceof Date) return cell.toISOString();
    if (typeof cell === 'number' && Number.isFinite(cell)) return String(cell);
    return String(cell).trim();
  };

  const stringRows = raw.map((r) => r.map(stringify));
  const maxCols = Math.max(...stringRows.map((r) => r.length));
  const normalized = stringRows.map((r) =>
    r.length < maxCols ? [...r, ...Array(maxCols - r.length).fill('')] : r
  );

  // `read-excel-file` does not detect headers; treat the first row as the
  // header row when it contains any alphabetic content.
  const firstRow = normalized[0] ?? [];
  const hasHeader = firstRow.some((c) => /[a-zA-Z]/.test(c));
  const headers = hasHeader
    ? firstRow.map((h, i) => h || `Column ${i + 1}`)
    : Array.from({ length: maxCols }, (_, i) => `Column ${i + 1}`);
  const rows = hasHeader ? normalized.slice(1) : normalized;

  return { headers, rows, source: file.name, warnings };
}

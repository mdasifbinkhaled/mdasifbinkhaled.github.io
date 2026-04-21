/**
 * Unified tabular parsing entry point.
 *
 *   parseFile(file)   — dispatches on extension to PapaParse or XLSX
 *   parseText(text)   — always PapaParse
 *   parseFiles(files) — convenience multi-file loader, concatenates rows
 *
 * This layer is parser-agnostic from the caller's perspective; tools
 * depend on `TabularData`, not the adapter implementations.
 */

import { parseText as parseTextImpl } from './papaparse-adapter';
import { parseSpreadsheet } from './xlsx-adapter';
import type { TabularData } from './types';

const SPREADSHEET_EXT = /\.(xlsx|xls)$/i;

export function parseText(text: string, source = 'Pasted text'): TabularData {
  return parseTextImpl(text, source);
}

export async function parseFile(file: File): Promise<TabularData> {
  if (SPREADSHEET_EXT.test(file.name)) {
    return parseSpreadsheet(file);
  }
  const text = await file.text();
  return parseTextImpl(text, file.name);
}

/**
 * Parse multiple files and concatenate their rows. The header set is taken
 * from the **first file**; subsequent files must have the same column
 * arity, else extra cells are dropped and shorter rows are padded. A
 * warning is emitted for every header mismatch.
 */
export async function parseFiles(files: File[]): Promise<TabularData> {
  if (files.length === 0) {
    return { headers: [], rows: [], source: '', warnings: [] };
  }
  if (files.length === 1 && files[0]) {
    return parseFile(files[0]);
  }

  const parsed: TabularData[] = [];
  for (const f of files) parsed.push(await parseFile(f));

  const base = parsed[0];
  if (!base) return { headers: [], rows: [], source: '', warnings: [] };

  const combinedWarnings: string[] = [...base.warnings];
  combinedWarnings.push(
    `Merging ${files.length} files (${files.map((f) => f.name).join(', ')}).`
  );
  const combinedRows: string[][] = [...base.rows];

  for (let i = 1; i < parsed.length; i++) {
    const p = parsed[i];
    if (!p) continue;
    // Warn on column-count mismatch and skip the file (do not silently corrupt).
    if (p.headers.length !== base.headers.length) {
      combinedWarnings.push(
        `Skipped "${p.source}": ${p.headers.length} columns vs first file's ${base.headers.length}.`
      );
      continue;
    }
    combinedRows.push(...p.rows);
    combinedWarnings.push(...p.warnings);
  }

  return {
    headers: base.headers,
    rows: combinedRows,
    source: files.map((f) => f.name).join(', '),
    delimiter: base.delimiter,
    warnings: combinedWarnings,
  };
}

export type { TabularData } from './types';

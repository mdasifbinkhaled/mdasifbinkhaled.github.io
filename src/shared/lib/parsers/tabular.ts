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

function normalizeHeader(value: string): string {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
}

function relabelParsedSource(data: TabularData, source: string): TabularData {
  return {
    ...data,
    source,
    rowSources: data.rows.map(() => source),
    files: [{ source, rowCount: data.rows.length }],
  };
}

function createAlignedRows(
  baseHeaders: string[],
  incoming: TabularData
): string[][] | null {
  const normalizedBase = baseHeaders.map(normalizeHeader);
  const normalizedIncoming = incoming.headers.map(normalizeHeader);

  if (
    normalizedIncoming.length !== normalizedBase.length ||
    normalizedIncoming.every(
      (header, index) => header === normalizedBase[index]
    )
  ) {
    return incoming.rows;
  }

  if (
    new Set(normalizedBase).size !== normalizedBase.length ||
    new Set(normalizedIncoming).size !== normalizedIncoming.length
  ) {
    return null;
  }

  const incomingIndexByHeader = new Map(
    normalizedIncoming.map((header, index) => [header, index])
  );
  const reorderIndices = normalizedBase.map((header) =>
    incomingIndexByHeader.get(header)
  );

  if (reorderIndices.some((index) => index === undefined)) {
    return null;
  }

  return incoming.rows.map((row) =>
    reorderIndices.map((index) => row[index ?? 0] ?? '')
  );
}

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
    return {
      headers: [],
      rows: [],
      source: '',
      rowSources: [],
      files: [],
      warnings: [],
    };
  }
  if (files.length === 1 && files[0]) {
    return parseFile(files[0]);
  }

  const sourceCounts = new Map<string, number>();
  const parsed: TabularData[] = [];
  for (const file of files) {
    const count = (sourceCounts.get(file.name) ?? 0) + 1;
    sourceCounts.set(file.name, count);
    const source = count === 1 ? file.name : `${file.name} (${count})`;
    parsed.push(relabelParsedSource(await parseFile(file), source));
  }

  const base = parsed[0];
  if (!base) {
    return {
      headers: [],
      rows: [],
      source: '',
      rowSources: [],
      files: [],
      warnings: [],
    };
  }

  const combinedWarnings: string[] = [...base.warnings];
  combinedWarnings.push(
    `Merging ${files.length} files (${files.map((f) => f.name).join(', ')}).`
  );
  const combinedRows: string[][] = [...base.rows];
  const combinedRowSources: string[] = [...(base.rowSources ?? [])];
  const combinedFiles = [...(base.files ?? [])];

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

    const alignedRows = createAlignedRows(base.headers, p);
    if (!alignedRows) {
      combinedWarnings.push(
        `Skipped "${p.source}": headers do not match the first file.`
      );
      continue;
    }

    if (
      p.headers.some(
        (header, index) =>
          normalizeHeader(header) !== normalizeHeader(base.headers[index] ?? '')
      )
    ) {
      combinedWarnings.push(
        `Reordered columns from "${p.source}" to match the first file.`
      );
    }

    combinedRows.push(...alignedRows);
    combinedRowSources.push(
      ...(p.rowSources ?? alignedRows.map(() => p.source))
    );
    combinedFiles.push(
      ...(p.files ?? [{ source: p.source, rowCount: alignedRows.length }])
    );
    combinedWarnings.push(...p.warnings);
  }

  return {
    headers: base.headers,
    rows: combinedRows,
    source: files.map((f) => f.name).join(', '),
    rowSources: combinedRowSources,
    files: combinedFiles,
    delimiter: base.delimiter,
    warnings: combinedWarnings,
  };
}

export type { TabularData } from './types';

/**
 * Shared types for the tabular data ingestion pipeline.
 *
 * The pipeline is:
 *
 *   file | text | paste  →  parseTabular()  →  TabularData
 *   TabularData + schema →  mapAndValidate() →  Result<T[]>
 *
 * `TabularData` is the intermediate representation — parser-agnostic,
 * normalized to string cells, with header detection already resolved.
 */

import type { Result } from '@/shared/lib/validation';

export interface TabularData {
  /** Headers detected or synthesized (e.g. ["Column 1", "Column 2"]). */
  headers: string[];
  /** Rows as string arrays, aligned to `headers.length`. */
  rows: string[][];
  /** Human-readable source label (filename or "Pasted text"). */
  source: string;
  /** Detected delimiter — informational only. */
  delimiter?: ',' | '\t' | ';' | '|';
  /** Parse warnings (non-fatal). */
  warnings: string[];
}

/**
 * A field in the caller's schema. The importer looks for a header that
 * matches any of `aliases` (case-insensitive substring match). The user
 * can override the inferred mapping via the column-mapper chips.
 */
export interface SchemaField<TKey extends string = string> {
  /** Property name on the resulting object. */
  key: TKey;
  /** Label shown in the column-mapper chip. */
  label: string;
  /** Required for commit. Rows missing this field become row-level errors. */
  required: boolean;
  /** Case-insensitive header substrings that map to this field. */
  aliases: string[];
  /**
   * Optional cell-level validator — return a normalized value, or throw
   * with a human-readable message to produce a row-level error.
   */
  parse?: (raw: string) => unknown;
}

export type ColumnMapping<TKey extends string = string> = Record<
  TKey,
  number | null
>;

export interface ImportOptions<TKey extends string = string> {
  fields: readonly SchemaField<TKey>[];
  /** Called when user hits "Commit". */
  onCommit: (rows: Record<TKey, unknown>[], meta: ImportCommitMeta) => void;
}

export type MergeStrategy = 'replace' | 'merge' | 'append';

export interface ImportCommitMeta {
  source: string;
  mergeStrategy: MergeStrategy;
  warnings: string[];
  rowsSkipped: number;
}

/** The signature tools receive from their importer invocation. */
export type ImportResult<TKey extends string = string> = Result<
  Record<TKey, unknown>[]
>;

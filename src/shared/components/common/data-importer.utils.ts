// ─────────────────────────────────────────────────────────────────────
// DataImporter — pure helpers
// ─────────────────────────────────────────────────────────────────────
// Stateless utilities shared by the DataImporter component and its hook.
// Pure file — no React runtime, no 'use client'.
// ─────────────────────────────────────────────────────────────────────

import type {
  AdditionalPerFileField,
  ParsedTabularFile,
  SchemaField,
  TabularData,
} from '@/shared/lib/parsers/types';

export const DEFAULT_ACCEPT = '.csv,.tsv,.txt,.xlsx,.xls';
export const PREVIEW_ROWS = 20;

export interface ExtraColumnDraft {
  id: string;
  key: string;
  columnIndex: number | null;
}

export function createDraftId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `extra-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getParsedFiles(data: TabularData | null): ParsedTabularFile[] {
  if (!data) return [];
  if (data.files && data.files.length > 0) return data.files;
  if (!data.source) return [];
  return [{ source: data.source, rowCount: data.rows.length }];
}

export function buildInitialPerFileValues<TFieldKey extends string>(
  data: TabularData,
  fields: readonly {
    key: TFieldKey;
    infer?: (source: string) => string | undefined;
  }[]
): Partial<Record<TFieldKey, Record<string, string>>> {
  const defaults = {} as Partial<Record<TFieldKey, Record<string, string>>>;

  for (const field of fields) {
    defaults[field.key] = Object.fromEntries(
      getParsedFiles(data).map((file) => [
        file.source,
        field.infer?.(file.source)?.trim() ?? '',
      ])
    ) as Record<string, string>;
  }

  return defaults;
}

export function buildInitialFileDefaults<TKey extends string>(
  data: TabularData,
  fields: readonly SchemaField<TKey>[]
): Partial<Record<TKey, Record<string, string>>> {
  return buildInitialPerFileValues(
    data,
    fields
      .filter((field) => field.perFileValue)
      .map((field) => ({
        key: field.key,
        infer: field.perFileValue?.infer,
      }))
  );
}

export function buildInitialAdditionalFileDefaults(
  data: TabularData,
  fields: readonly AdditionalPerFileField[]
): Record<string, Record<string, string>> {
  return buildInitialPerFileValues(
    data,
    fields.map((field) => ({ key: field.key, infer: field.infer }))
  ) as Record<string, Record<string, string>>;
}

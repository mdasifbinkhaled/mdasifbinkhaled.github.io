/**
 * Map a `TabularData` preview + user-supplied column mapping into the
 * caller's typed row shape and run per-field validation.
 *
 * The result is always partial — `data` holds the rows that parsed
 * cleanly, `errors` holds rows that failed validation (with the 1-based
 * row number preserved), and `warnings` surfaces pre-parse warnings from
 * the source.
 */

import type { Result } from '@/shared/lib/validation';
import { ok } from '@/shared/lib/validation';
import type { ColumnMapping, SchemaField, TabularData } from './types';

export function applySchema<TKey extends string>(
  data: TabularData,
  fields: readonly SchemaField<TKey>[],
  mapping: ColumnMapping<TKey>
): Result<Record<TKey, unknown>[]> {
  const errors: { row: number; code: string; message: string }[] = [];
  const warnings = data.warnings.map((m) => ({
    code: 'parse.warning',
    message: m,
  }));
  const out: Record<TKey, unknown>[] = [];

  data.rows.forEach((row, idx) => {
    const record = {} as Record<TKey, unknown>;
    let hasError = false;

    for (const field of fields) {
      const colIdx = mapping[field.key];
      const raw =
        colIdx === null || colIdx === undefined
          ? ''
          : (row[colIdx] ?? '').trim();

      if (!raw) {
        if (field.required) {
          errors.push({
            row: idx + 1,
            code: 'field.required',
            message: `Row ${idx + 1}: missing required "${field.label}".`,
          });
          hasError = true;
        }
        record[field.key] = '';
        continue;
      }

      if (field.parse) {
        try {
          record[field.key] = field.parse(raw);
        } catch (e) {
          errors.push({
            row: idx + 1,
            code: 'field.invalid',
            message: `Row ${idx + 1}: ${field.label} — ${
              e instanceof Error ? e.message : String(e)
            }`,
          });
          hasError = true;
        }
      } else {
        record[field.key] = raw;
      }
    }

    if (!hasError) out.push(record);
  });

  return ok(out, warnings, errors);
}

/**
 * Infer a column mapping by matching header text against each field's
 * aliases (case-insensitive substring). Fields with no match get `null`.
 */
export function inferMapping<TKey extends string>(
  headers: string[],
  fields: readonly SchemaField<TKey>[]
): ColumnMapping<TKey> {
  const mapping = {} as ColumnMapping<TKey>;
  const lower = headers.map((h) => h.toLowerCase().trim());

  for (const field of fields) {
    let match: number | null = null;
    for (const alias of field.aliases) {
      const needle = alias.toLowerCase();
      const idx = lower.findIndex((h) => h === needle);
      if (idx !== -1) {
        match = idx;
        break;
      }
    }
    if (match === null) {
      for (const alias of field.aliases) {
        const needle = alias.toLowerCase();
        const idx = lower.findIndex((h) => h.includes(needle));
        if (idx !== -1) {
          match = idx;
          break;
        }
      }
    }
    mapping[field.key] = match;
  }
  return mapping;
}

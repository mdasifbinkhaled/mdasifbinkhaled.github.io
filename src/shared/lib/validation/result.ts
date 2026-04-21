/**
 * Discriminated result type used across parsers, validators, and importers.
 *
 * Shape intentionally mirrors the Rust `Result` / `neverthrow` idiom:
 *   - `ok: true`  → `data` is present
 *   - `ok: false` → `data` is absent; inspect `errors`
 *
 * `warnings` are non-fatal issues that should surface to the user but do NOT
 * block commit (e.g. skipped blank rows, BOM stripped, trailing whitespace).
 *
 * `errors` are fatal issues for the individual item (e.g. malformed row that
 * could not be parsed). A result can be `ok: true` even with non-empty
 * `errors` when the issues are row-scoped and partial data is still useful.
 */
export interface ResultMessage {
  /** 1-based source location (row, line, or record index) when available. */
  row?: number;
  /** Machine-readable code for downstream handling. */
  code: string;
  /** Human-readable message. */
  message: string;
}

export interface OkResult<T> {
  ok: true;
  data: T;
  errors: ResultMessage[];
  warnings: ResultMessage[];
}

export interface ErrResult {
  ok: false;
  data?: never;
  errors: ResultMessage[];
  warnings: ResultMessage[];
}

export type Result<T> = OkResult<T> | ErrResult;

export const ok = <T>(
  data: T,
  warnings: ResultMessage[] = [],
  errors: ResultMessage[] = []
): OkResult<T> => ({
  ok: true,
  data,
  warnings,
  errors,
});

export const err = (
  errors: ResultMessage[],
  warnings: ResultMessage[] = []
): ErrResult => ({
  ok: false,
  errors,
  warnings,
});

/** Convenience helper for a single-error failure. */
export const errMsg = (
  code: string,
  message: string,
  row?: number
): ErrResult => err([{ code, message, row }]);

/** Convenience helper for a single warning. */
export const warn = (
  code: string,
  message: string,
  row?: number
): ResultMessage => ({ code, message, row });

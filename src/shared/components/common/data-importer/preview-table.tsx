'use client';

import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type {
  ColumnMapping,
  ParsedTabularFile,
  TabularData,
} from '@/shared/lib/parsers/types';
import { PREVIEW_ROWS } from '@/shared/components/common/data-importer.utils';
import type {
  ExtraColumnState,
  ImportValidation,
  PreviewColumn,
  StatusItem,
} from '@/shared/components/common/use-data-importer';

interface PreviewTableProps<TKey extends string> {
  tabular: TabularData;
  mapping: ColumnMapping<TKey>;
  fileDefaults: Partial<Record<TKey, Record<string, string>>>;
  parsedFiles: ParsedTabularFile[];
  previewColumns: PreviewColumn<TKey>[];
  validation: ImportValidation<TKey> | null;
  statusItems: StatusItem[];
  parseWarnings: string[];
  extraColumnState: ExtraColumnState;
}

export function PreviewTable<TKey extends string>({
  tabular,
  mapping,
  fileDefaults,
  parsedFiles,
  previewColumns,
  validation,
  statusItems,
  parseWarnings,
  extraColumnState,
}: PreviewTableProps<TKey>) {
  return (
    <div className="min-w-0 space-y-4 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
      <section className="rounded-xl border bg-muted/15">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold">Preview</h3>
            <p className="text-xs text-muted-foreground">
              Review the first {PREVIEW_ROWS} imported rows with the current
              mapping.
            </p>
          </div>
          {statusItems.length > 0 ? (
            <div className="flex flex-wrap gap-2 text-xs">
              {statusItems.map((item) => (
                <span
                  key={item.label}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-1',
                    item.tone
                  )}
                >
                  <CheckCircle2
                    className={cn(
                      'h-3 w-3',
                      item.label.includes('note') && 'hidden'
                    )}
                    aria-hidden
                  />
                  {item.label.includes('note') ? (
                    <AlertTriangle className="h-3 w-3" aria-hidden />
                  ) : null}
                  {item.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="max-h-[22rem] overflow-auto">
          <table className="w-full border-collapse text-xs">
            <thead className="sticky top-0 bg-background/95 backdrop-blur">
              <tr>
                <th className="px-2 py-2 text-left font-semibold text-muted-foreground">
                  #
                </th>
                {previewColumns.map((column) => (
                  <th
                    key={column.key}
                    className="px-2 py-2 text-left font-semibold"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabular.rows.slice(0, PREVIEW_ROWS).map((row, idx) => {
                const rowError = validation?.errors.some(
                  (e) => e.row === idx + 1
                );
                return (
                  <tr
                    key={idx}
                    className={cn(
                      'border-t border-border/70',
                      rowError && 'bg-destructive/10'
                    )}
                  >
                    <td className="px-2 py-1.5 text-muted-foreground">
                      {idx + 1}
                    </td>
                    {previewColumns.map((column) => {
                      const rowSource =
                        tabular.rowSources?.[idx] ??
                        parsedFiles[0]?.source ??
                        tabular.source;
                      const val =
                        column.kind === 'schema'
                          ? (() => {
                              const ci = mapping[column.field.key];
                              const raw =
                                ci === null || ci === undefined
                                  ? ''
                                  : (row[ci] ?? '');
                              return (
                                raw ||
                                fileDefaults[column.field.key]?.[rowSource] ||
                                ''
                              );
                            })()
                          : (row[column.extraColumn.columnIndex] ?? '');
                      const missing =
                        column.kind === 'schema' &&
                        column.field.required &&
                        !val;
                      return (
                        <td
                          key={column.key}
                          className={cn(
                            'px-2 py-1.5 align-top',
                            missing && 'text-destructive'
                          )}
                        >
                          {val || (missing ? '— missing —' : '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {tabular.rows.length > PREVIEW_ROWS ? (
          <div className="border-t px-4 py-2 text-[11px] text-muted-foreground">
            Showing the first {PREVIEW_ROWS} of {tabular.rows.length} rows.
          </div>
        ) : null}
      </section>

      {(parseWarnings.length > 0 || validation) && (
        <section className="rounded-xl border bg-muted/15 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold">Diagnostics</h3>
              <p className="text-xs text-muted-foreground">
                Non-fatal import notes and validation feedback.
              </p>
            </div>
          </div>
          <div className="mt-3 max-h-[20rem] space-y-2 overflow-y-auto pr-1 text-xs">
            {parseWarnings.map((warning, index) => (
              <div
                key={`${warning}-${index}`}
                className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-warning-emphasis"
              >
                <AlertTriangle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                <span>{warning}</span>
              </div>
            ))}
            {validation?.warnings.map((warning, index) => (
              <div
                key={`${warning.message}-${index}`}
                className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-warning-emphasis"
              >
                <AlertTriangle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                <span>{warning.message}</span>
              </div>
            ))}
            {extraColumnState.issues.map((issue, index) => (
              <div
                key={`${issue}-${index}`}
                className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-destructive"
              >
                <AlertTriangle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                <span>{issue}</span>
              </div>
            ))}
            {validation?.errors.slice(0, 5).map((error, index) => (
              <div
                key={`${error.row}-${index}`}
                className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-destructive"
              >
                <AlertTriangle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                <span>
                  Row {error.row}: {error.message}
                </span>
              </div>
            ))}
            {validation && validation.errors.length > 5 ? (
              <p className="text-muted-foreground">
                Showing the first 5 row errors. Remaining rows will still be
                skipped on commit.
              </p>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}

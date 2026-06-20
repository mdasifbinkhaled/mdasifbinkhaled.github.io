'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';
import type {
  ColumnMapping,
  MergeStrategy,
  ParsedTabularFile,
  SchemaField,
  TabularData,
} from '@/shared/lib/parsers/types';
import {
  PREVIEW_ROWS,
  createDraftId,
} from '@/shared/components/common/data-importer.utils';
import type { ExtraColumnDraft } from '@/shared/components/common/data-importer.utils';
import type {
  ColumnOption,
  ExtraColumnState,
  ImportValidation,
  MergeOption,
  PerFileField,
} from '@/shared/components/common/use-data-importer';

interface ColumnMappingPanelProps<TKey extends string> {
  fields: readonly SchemaField<TKey>[];
  tabular: TabularData;
  mapping: ColumnMapping<TKey>;
  setMapping: Dispatch<SetStateAction<ColumnMapping<TKey>>>;
  columnOptions: ColumnOption[];
  parsedFiles: ParsedTabularFile[];
  perFileFields: PerFileField<TKey>[];
  fileDefaults: Partial<Record<TKey, Record<string, string>>>;
  setFileDefaults: Dispatch<
    SetStateAction<Partial<Record<TKey, Record<string, string>>>>
  >;
  additionalFileDefaults: Record<string, Record<string, string>>;
  setAdditionalFileDefaults: Dispatch<
    SetStateAction<Record<string, Record<string, string>>>
  >;
  allowExtraColumns: boolean;
  extraColumns: ExtraColumnDraft[];
  setExtraColumns: Dispatch<SetStateAction<ExtraColumnDraft[]>>;
  extraColumnState: ExtraColumnState;
  validation: ImportValidation<TKey> | null;
  mergeStrategy: MergeStrategy;
  setMergeStrategy: Dispatch<SetStateAction<MergeStrategy>>;
  mergeOptions: readonly MergeOption[];
}

export function ColumnMappingPanel<TKey extends string>({
  fields,
  tabular,
  mapping,
  setMapping,
  columnOptions,
  parsedFiles,
  perFileFields,
  fileDefaults,
  setFileDefaults,
  additionalFileDefaults,
  setAdditionalFileDefaults,
  allowExtraColumns,
  extraColumns,
  setExtraColumns,
  extraColumnState,
  validation,
  mergeStrategy,
  setMergeStrategy,
  mergeOptions,
}: ColumnMappingPanelProps<TKey>) {
  return (
    <div className="space-y-4 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
      <fieldset className="rounded-xl border bg-muted/15 p-4">
        <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Column mapping
        </legend>
        <div className="mt-2 space-y-3">
          {fields.map((field) => {
            const value = mapping[field.key];
            const isUnmappedRequired =
              field.required && (value === null || value === undefined);

            return (
              <div
                key={field.key}
                className={cn(
                  'rounded-lg border bg-background/80 p-3',
                  isUnmappedRequired &&
                    'border-destructive/40 bg-destructive/10'
                )}
              >
                <div className="mb-2 min-w-0">
                  <p
                    className={cn(
                      'truncate text-xs font-semibold',
                      isUnmappedRequired && 'text-destructive'
                    )}
                  >
                    {field.label}
                    {field.required ? (
                      <span className="ml-0.5 text-destructive">*</span>
                    ) : null}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Choose the source column for this field.
                  </p>
                </div>
                <Select
                  value={
                    value === null || value === undefined
                      ? '__none'
                      : String(value)
                  }
                  onValueChange={(v) =>
                    setMapping((m) => ({
                      ...m,
                      [field.key]: v === '__none' ? null : Number(v),
                    }))
                  }
                >
                  <SelectTrigger className="h-9 w-full text-left text-xs font-medium">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none">(none)</SelectItem>
                    {columnOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>
      </fieldset>

      {parsedFiles.length > 0 && perFileFields.length > 0 ? (
        <fieldset className="rounded-xl border bg-muted/15 p-4">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Per-file values
          </legend>
          <div className="mt-2 rounded-lg border bg-background/70 p-3 text-[11px] text-muted-foreground">
            File-level defaults stay contained inside this panel. They work best
            when each uploaded file represents one section.
          </div>
          <div className="mt-3 max-h-[24rem] space-y-3 overflow-y-auto pr-1">
            {parsedFiles.map((file) => (
              <div
                key={file.source}
                className="rounded-lg border bg-background/80 p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="max-w-full truncate text-xs font-medium sm:max-w-[16rem]">
                    {file.source}
                  </p>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    {file.rowCount} row
                    {file.rowCount === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {perFileFields.map((field) => {
                    const value =
                      field.kind === 'schema'
                        ? (fileDefaults[field.fieldKey]?.[file.source] ?? '')
                        : (additionalFileDefaults[field.key]?.[file.source] ??
                          '');
                    const inferred =
                      field.config.infer?.(file.source)?.trim() ?? '';
                    const isAutofill = !!inferred && value.trim() === inferred;
                    const selectedHeader =
                      field.kind === 'schema'
                        ? (() => {
                            const selectedColumn = mapping[field.fieldKey];
                            return selectedColumn === null ||
                              selectedColumn === undefined
                              ? null
                              : (tabular?.headers[selectedColumn] ?? null);
                          })()
                        : null;
                    const helperText =
                      field.kind === 'schema'
                        ? selectedHeader
                          ? `${field.label} uses “${selectedHeader}” when present and falls back to this file value when blank.`
                          : `No source column selected. Set ${field.label.toLowerCase()} once for this file.`
                        : field.config.description;

                    return (
                      <label
                        key={`${field.key}-${file.source}`}
                        className="space-y-1 rounded-lg border border-border/70 bg-muted/10 p-2"
                      >
                        <span className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span>{field.label}</span>
                          {isAutofill ? (
                            <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success-emphasis">
                              Auto-detected
                            </span>
                          ) : null}
                        </span>
                        {helperText ? (
                          <span className="block text-[11px] text-muted-foreground">
                            {helperText}
                          </span>
                        ) : null}
                        <Input
                          type={field.config.type}
                          inputMode={field.config.inputMode}
                          placeholder={
                            field.config.placeholder ??
                            `Set ${field.label.toLowerCase()}`
                          }
                          value={value}
                          onChange={(event) => {
                            const nextValue = event.target.value;

                            if (field.kind === 'schema') {
                              setFileDefaults((current) => ({
                                ...current,
                                [field.fieldKey]: {
                                  ...(current[field.fieldKey] ?? {}),
                                  [file.source]: nextValue,
                                },
                              }));
                              return;
                            }

                            setAdditionalFileDefaults((current) => ({
                              ...current,
                              [field.key]: {
                                ...(current[field.key] ?? {}),
                                [file.source]: nextValue,
                              },
                            }));
                          }}
                          className="h-9"
                          aria-label={`${field.label} for ${file.source}`}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      ) : null}

      {allowExtraColumns ? (
        <fieldset className="rounded-xl border bg-muted/15 p-4">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Additional columns
          </legend>
          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setExtraColumns((current) => [
                  ...current,
                  {
                    id: createDraftId(),
                    key: '',
                    columnIndex: null,
                  },
                ])
              }
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              <span className="ml-1">Add column</span>
            </Button>
          </div>

          <div className="mt-3 space-y-2">
            {extraColumns.length === 0 ? (
              <p className="rounded-lg border border-dashed bg-background/70 px-3 py-2 text-[11px] text-muted-foreground">
                Optional passthrough columns are preserved on imported rows and
                included in CSV export.
              </p>
            ) : null}

            {extraColumns.map((extraColumn) => (
              <div
                key={extraColumn.id}
                className="grid gap-2 rounded-lg border bg-background/80 p-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
              >
                <Input
                  value={extraColumn.key}
                  onChange={(event) =>
                    setExtraColumns((current) =>
                      current.map((column) =>
                        column.id === extraColumn.id
                          ? {
                              ...column,
                              key: event.target.value,
                            }
                          : column
                      )
                    )
                  }
                  placeholder="Field name (e.g. Program)"
                  aria-label="Additional column field name"
                />
                <Select
                  value={
                    extraColumn.columnIndex === null
                      ? '__none'
                      : String(extraColumn.columnIndex)
                  }
                  onValueChange={(value) =>
                    setExtraColumns((current) =>
                      current.map((column) =>
                        column.id === extraColumn.id
                          ? {
                              ...column,
                              columnIndex:
                                value === '__none' ? null : Number(value),
                            }
                          : column
                      )
                    )
                  }
                >
                  <SelectTrigger className="h-10 w-full text-left text-xs font-medium">
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none">Select source column</SelectItem>
                    {columnOptions.map((option) => (
                      <SelectItem
                        key={`${extraColumn.id}-${option.value}`}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() =>
                    setExtraColumns((current) =>
                      current.filter((column) => column.id !== extraColumn.id)
                    )
                  }
                  aria-label={`Remove additional column ${extraColumn.key || extraColumn.id}`}
                >
                  <X className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            ))}

            {extraColumnState.issues.length > 0 ? (
              <div className="space-y-1 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[11px] text-destructive">
                {extraColumnState.issues.map((issue) => (
                  <p key={issue}>{issue}</p>
                ))}
              </div>
            ) : null}
          </div>
        </fieldset>
      ) : null}

      <section className="rounded-xl border bg-muted/15 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold">Import summary</h3>
            <p className="text-xs text-muted-foreground">
              Review the loaded files before committing.
            </p>
          </div>
          <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {tabular.headers.length} column
            {tabular.headers.length === 1 ? '' : 's'}
          </span>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border bg-background/80 p-3">
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Ready
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">
              {validation?.data?.length ?? 0}
            </dd>
          </div>
          <div className="rounded-lg border bg-background/80 p-3">
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Skipped
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">
              {validation?.errors?.length ?? 0}
            </dd>
          </div>
          <div className="rounded-lg border bg-background/80 p-3">
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Files
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">
              {parsedFiles.length || 1}
            </dd>
          </div>
          <div className="rounded-lg border bg-background/80 p-3">
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Preview rows
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">
              {Math.min(tabular.rows.length, PREVIEW_ROWS)}
            </dd>
          </div>
        </dl>

        {parsedFiles.length > 0 ? (
          <div className="mt-3 rounded-lg border bg-background/80 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Source files
            </p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {parsedFiles.map((file) => (
                <li key={file.source} className="truncate">
                  {file.source}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <fieldset className="rounded-xl border bg-muted/15 p-4">
        <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          On commit
        </legend>
        <div className="mt-2 space-y-2">
          {mergeOptions.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-lg border bg-background/80 p-3 transition-colors hover:border-primary/40',
                mergeStrategy === opt.value && 'border-primary bg-primary/5'
              )}
            >
              <input
                type="radio"
                name="merge-strategy"
                value={opt.value}
                checked={mergeStrategy === opt.value}
                onChange={() => setMergeStrategy(opt.value)}
                className="mt-1"
              />
              <span className="space-y-1">
                <span className="block text-sm font-medium">{opt.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {opt.hint}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

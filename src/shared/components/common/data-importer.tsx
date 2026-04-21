'use client';

// ─────────────────────────────────────────────────────────────────────
// DataImporter
// ─────────────────────────────────────────────────────────────────────
// A reusable Radix Dialog importer that:
//   1. Collects input via a Paste tab (textarea) and an Upload tab
//      (CSV/TSV/XLSX file picker).
//   2. Parses to a normalized `TabularData` using the shared parser
//      pipeline.
//   3. Lets the user override column-to-field mapping via structured
//      per-field selectors when auto-detection is wrong or ambiguous.
//   4. Shows a preview of the first 20 rows with inline validation
//      badges for missing/invalid fields.
//   5. Asks for a merge strategy (Replace / Merge / Append — default
//      Merge) and commits.
//
// Callers pass `fields` (a schema) and `onCommit`. The component is
// stateless w.r.t. the tool's own data — it only returns the parsed rows.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileUp,
  Loader2,
  Plus,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';
import { parseFiles, parseText } from '@/shared/lib/parsers/tabular';
import { applySchema, inferMapping } from '@/shared/lib/parsers/schema';
import type {
  ColumnMapping,
  ExtraColumnSelection,
  ImportedRow,
  ImportCommitMeta,
  MergeStrategy,
  ParsedTabularFile,
  SchemaField,
  TabularData,
} from '@/shared/lib/parsers/types';

export interface DataImporterProps<TKey extends string> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Initial tab shown when the dialog opens. */
  defaultTab?: 'paste' | 'upload';
  /** Allow selecting and merging multiple files from the upload picker. */
  allowMultiple?: boolean;
  /** Schema that the parsed rows must conform to. */
  fields: readonly SchemaField<TKey>[];
  /** Title of the dialog (e.g. "Import students"). */
  title: string;
  /** Short description shown beneath the title. */
  description?: string;
  /** Placeholder shown in the paste textarea. */
  pastePlaceholder?: string;
  /** Accepted file extensions (default: .csv,.tsv,.txt,.xlsx,.xls). */
  accept?: string;
  /** Optional: help text rendered above the preview. */
  helpText?: string;
  /** Allow optional passthrough columns beyond the fixed schema. */
  allowExtraColumns?: boolean;
  /** Called with the mapped/validated rows + chosen merge strategy. */
  onCommit: (rows: ImportedRow<TKey>[], meta: ImportCommitMeta) => void;
}

const DEFAULT_ACCEPT = '.csv,.tsv,.txt,.xlsx,.xls';
const PREVIEW_ROWS = 20;

interface ExtraColumnDraft {
  id: string;
  key: string;
  columnIndex: number | null;
}

function createDraftId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `extra-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getParsedFiles(data: TabularData | null): ParsedTabularFile[] {
  if (!data) return [];
  if (data.files && data.files.length > 0) return data.files;
  if (!data.source) return [];
  return [{ source: data.source, rowCount: data.rows.length }];
}

function buildInitialFileDefaults<TKey extends string>(
  data: TabularData,
  fields: readonly SchemaField<TKey>[]
): Partial<Record<TKey, Record<string, string>>> {
  const defaults = {} as Partial<Record<TKey, Record<string, string>>>;

  for (const field of fields) {
    if (!field.perFileValue) continue;
    defaults[field.key] = Object.fromEntries(
      getParsedFiles(data).map((file) => [
        file.source,
        field.perFileValue?.infer?.(file.source)?.trim() ?? '',
      ])
    ) as Record<string, string>;
  }

  return defaults;
}

export function DataImporter<TKey extends string>({
  open,
  onOpenChange,
  defaultTab = 'paste',
  allowMultiple = true,
  fields,
  title,
  description,
  pastePlaceholder,
  accept = DEFAULT_ACCEPT,
  helpText,
  allowExtraColumns = false,
  onCommit,
}: DataImporterProps<TKey>) {
  // ── tab state ─────────────────────────────────────────────────────
  const [tab, setTab] = useState<'paste' | 'upload'>(defaultTab);
  const [pasted, setPasted] = useState('');
  const [loading, setLoading] = useState(false);

  // ── parsed data + mapping ─────────────────────────────────────────
  const [tabular, setTabular] = useState<TabularData | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping<TKey>>(
    {} as ColumnMapping<TKey>
  );
  const [fileDefaults, setFileDefaults] = useState<
    Partial<Record<TKey, Record<string, string>>>
  >({});
  const [extraColumns, setExtraColumns] = useState<ExtraColumnDraft[]>([]);
  const [mergeStrategy, setMergeStrategy] = useState<MergeStrategy>('merge');

  // reset state whenever the dialog closes
  useEffect(() => {
    if (!open) {
      setTab(defaultTab);
      setPasted('');
      setTabular(null);
      setMapping({} as ColumnMapping<TKey>);
      setFileDefaults({});
      setExtraColumns([]);
      setMergeStrategy('merge');
    }
  }, [defaultTab, open]);

  // ── actions ───────────────────────────────────────────────────────
  const handlePasteParse = () => {
    if (!pasted.trim()) {
      setTabular(null);
      return;
    }
    const data = parseText(pasted, 'Pasted text');
    setTabular(data);
    setMapping(inferMapping(data.headers, fields));
    setFileDefaults(buildInitialFileDefaults(data, fields));
    setExtraColumns([]);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setLoading(true);
    try {
      const data = await parseFiles(files);
      setTabular(data);
      setMapping(inferMapping(data.headers, fields));
      setFileDefaults(buildInitialFileDefaults(data, fields));
      setExtraColumns([]);
    } finally {
      setLoading(false);
      // Allow re-selecting the same file name.
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const parsedFiles = useMemo(() => getParsedFiles(tabular), [tabular]);

  const extraColumnState = useMemo(() => {
    const reserved = new Set(
      fields.map((field) => String(field.key).trim().toLocaleLowerCase())
    );
    const issues: string[] = [];
    const valid: ExtraColumnSelection[] = [];
    const seen = new Set(reserved);

    for (const extraColumn of extraColumns) {
      const key = extraColumn.key.trim();
      const normalizedKey = key.toLocaleLowerCase();
      const blank = !key && extraColumn.columnIndex === null;

      if (blank) continue;
      if (!key) {
        issues.push('Each additional column needs a field name.');
        continue;
      }
      if (extraColumn.columnIndex === null || extraColumn.columnIndex < 0) {
        issues.push(`Choose a source column for "${key}".`);
        continue;
      }
      if (seen.has(normalizedKey)) {
        issues.push(`Additional column "${key}" duplicates an existing field.`);
        continue;
      }

      seen.add(normalizedKey);
      valid.push({
        key,
        columnIndex: extraColumn.columnIndex,
        header: tabular?.headers[extraColumn.columnIndex] ?? key,
      });
    }

    return { issues, valid };
  }, [extraColumns, fields, tabular?.headers]);

  // ── derived: validation snapshot for preview ──────────────────────
  const validation = useMemo(() => {
    if (!tabular) return null;
    return applySchema(tabular, fields, mapping, {
      fileDefaults,
      extraColumns: extraColumnState.valid,
    });
  }, [tabular, fields, mapping, fileDefaults, extraColumnState.valid]);

  const commitDisabled =
    !validation ||
    !validation.ok ||
    validation.data.length === 0 ||
    extraColumnState.issues.length > 0;

  const parseWarnings = tabular?.warnings ?? [];
  const statusItems = [
    validation?.ok && validation.data.length > 0
      ? {
          tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
          label: `${validation.data.length} row${validation.data.length === 1 ? '' : 's'} ready`,
        }
      : null,
    validation && validation.errors.length > 0
      ? {
          tone: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300',
          label: `${validation.errors.length} row${validation.errors.length === 1 ? '' : 's'} skipped`,
        }
      : null,
    parseWarnings.length > 0
      ? {
          tone: 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
          label: `${parseWarnings.length} import note${parseWarnings.length === 1 ? '' : 's'}`,
        }
      : null,
  ].filter(Boolean) as { tone: string; label: string }[];

  const handleCommit = () => {
    if (!validation || !validation.ok) return;
    onCommit(validation.data, {
      source: tabular?.source ?? '',
      sourceFiles: parsedFiles.map((file) => file.source),
      mergeStrategy,
      warnings: validation.warnings.map((w) => w.message),
      rowsSkipped: validation.errors.length,
      extraColumns: extraColumnState.valid.map((column) => column.key),
    });
    onOpenChange(false);
  };

  // ── render helpers ────────────────────────────────────────────────
  const columnOptions =
    tabular?.headers.map((h, i) => ({ label: h, value: String(i) })) ?? [];

  const mergeOptions = [
    {
      value: 'merge',
      label: 'Merge',
      hint: 'Keep existing rows and update duplicates.',
    },
    {
      value: 'append',
      label: 'Append',
      hint: 'Always add imported rows as new records.',
    },
    {
      value: 'replace',
      label: 'Replace',
      hint: 'Discard existing data and keep only the import.',
    },
  ] as const satisfies readonly {
    value: MergeStrategy;
    label: string;
    hint: string;
  }[];

  const previewColumns = [
    ...fields.map((field) => ({
      kind: 'schema' as const,
      key: String(field.key),
      label: field.label,
      field,
    })),
    ...extraColumnState.valid.map((extraColumn) => ({
      kind: 'extra' as const,
      key: extraColumn.key,
      label: extraColumn.key,
      extraColumn,
    })),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(96vw,72rem)] max-w-5xl overflow-hidden p-0 sm:rounded-2xl">
        <div className="flex max-h-[88vh] min-h-0 flex-col">
          <DialogHeader className="border-b px-6 py-5">
            <DialogTitle>{title}</DialogTitle>
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">
              <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as 'paste' | 'upload')}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="paste">Paste</TabsTrigger>
                  <TabsTrigger value="upload">Upload file</TabsTrigger>
                </TabsList>

                <TabsContent value="paste" className="mt-3 space-y-2">
                  <textarea
                    value={pasted}
                    onChange={(e) => setPasted(e.target.value)}
                    onBlur={handlePasteParse}
                    placeholder={
                      pastePlaceholder ??
                      'Paste CSV, TSV, or spreadsheet text here…'
                    }
                    rows={7}
                    className="w-full rounded-xl border bg-background p-3 font-mono text-xs leading-relaxed focus:border-ring focus:outline-none"
                    spellCheck={false}
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handlePasteParse}
                    >
                      Parse
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="mt-3">
                  <label
                    htmlFor="data-importer-file"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-9 text-center transition hover:bg-accent/30"
                  >
                    {loading ? (
                      <Loader2
                        className="mb-2 h-6 w-6 animate-spin text-muted-foreground"
                        aria-hidden
                      />
                    ) : (
                      <FileUp
                        className="mb-2 h-6 w-6 text-muted-foreground"
                        aria-hidden
                      />
                    )}
                    <span className="text-sm font-medium">
                      {loading
                        ? 'Parsing…'
                        : allowMultiple
                          ? 'Click to choose one or more files'
                          : 'Click to choose a file'}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Accepts {accept.replace(/\./g, '').replace(/,/g, ', ')}
                      {allowMultiple ? ' · multi-file upload enabled' : ''}
                    </span>
                    {tabular?.source ? (
                      <span className="mt-2 max-w-full truncate text-[11px] text-muted-foreground">
                        Parsed from {tabular.source}
                      </span>
                    ) : null}
                    <input
                      id="data-importer-file"
                      ref={fileInputRef}
                      type="file"
                      accept={accept}
                      multiple={allowMultiple}
                      onChange={handleFileChange}
                      disabled={loading}
                      className="sr-only"
                    />
                  </label>
                </TabsContent>
              </Tabs>

              {helpText ? (
                <p className="rounded-xl bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  {helpText}
                </p>
              ) : null}

              {tabular && tabular.headers.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[22rem_minmax(0,1fr)]">
                  <div className="space-y-4">
                    <fieldset className="rounded-xl border bg-muted/15 p-4">
                      <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Column mapping
                      </legend>
                      <div className="mt-2 space-y-3">
                        {fields.map((field) => {
                          const value = mapping[field.key];
                          const isUnmappedRequired =
                            field.required &&
                            (value === null || value === undefined);

                          return (
                            <div
                              key={field.key}
                              className={cn(
                                'rounded-lg border bg-background/80 p-3',
                                isUnmappedRequired &&
                                  'border-red-300 bg-red-50/40 dark:border-red-900 dark:bg-red-950/20'
                              )}
                            >
                              <div className="mb-2 min-w-0">
                                <p
                                  className={cn(
                                    'truncate text-xs font-semibold',
                                    isUnmappedRequired &&
                                      'text-red-600 dark:text-red-400'
                                  )}
                                >
                                  {field.label}
                                  {field.required ? (
                                    <span className="ml-0.5 text-red-500">
                                      *
                                    </span>
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
                                    [field.key]:
                                      v === '__none' ? null : Number(v),
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

                    {parsedFiles.length > 0 &&
                    fields.some((field) => field.perFileValue) ? (
                      <fieldset className="rounded-xl border bg-muted/15 p-4">
                        <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Per-file values
                        </legend>
                        <div className="mt-2 space-y-4">
                          {fields
                            .filter((field) => field.perFileValue)
                            .map((field) => {
                              const selectedColumn = mapping[field.key];
                              const selectedHeader =
                                selectedColumn === null ||
                                selectedColumn === undefined
                                  ? null
                                  : (tabular?.headers[selectedColumn] ?? null);

                              return (
                                <div
                                  key={`${String(field.key)}-file-defaults`}
                                  className="rounded-lg border bg-background/80 p-3"
                                >
                                  <div className="mb-3 space-y-1">
                                    <p className="text-xs font-semibold">
                                      {field.label}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground">
                                      {field.perFileValue?.description ??
                                        (selectedHeader
                                          ? `${field.label} is mapped to “${selectedHeader}”. File values are used when that cell is blank.`
                                          : `No source column selected. Set a value for each file to populate ${field.label.toLowerCase()}.`)}
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    {parsedFiles.map((file) => {
                                      const inferred =
                                        field.perFileValue
                                          ?.infer?.(file.source)
                                          ?.trim() ?? '';
                                      const value =
                                        fileDefaults[field.key]?.[
                                          file.source
                                        ] ?? '';
                                      const isAutofill =
                                        !!inferred && value === inferred;

                                      return (
                                        <div
                                          key={`${String(field.key)}-${file.source}`}
                                          className="grid gap-2 rounded-lg border border-border/70 bg-muted/10 p-2 sm:grid-cols-[minmax(0,1fr)_10rem] sm:items-center"
                                        >
                                          <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                              <p className="truncate text-xs font-medium">
                                                {file.source}
                                              </p>
                                              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                                {file.rowCount} row
                                                {file.rowCount === 1 ? '' : 's'}
                                              </span>
                                              {isAutofill ? (
                                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                                                  Auto-detected
                                                </span>
                                              ) : null}
                                            </div>
                                          </div>
                                          <Input
                                            type={field.perFileValue?.type}
                                            inputMode={
                                              field.perFileValue?.inputMode
                                            }
                                            placeholder={
                                              field.perFileValue?.placeholder ??
                                              `Set ${field.label.toLowerCase()}`
                                            }
                                            value={value}
                                            onChange={(event) =>
                                              setFileDefaults((current) => ({
                                                ...current,
                                                [field.key]: {
                                                  ...(current[field.key] ?? {}),
                                                  [file.source]:
                                                    event.target.value,
                                                },
                                              }))
                                            }
                                            className="h-9"
                                            aria-label={`${field.label} for ${file.source}`}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
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
                              Optional passthrough columns are preserved on
                              imported rows and included in CSV export.
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
                                              value === '__none'
                                                ? null
                                                : Number(value),
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
                                  <SelectItem value="__none">
                                    Select source column
                                  </SelectItem>
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
                                    current.filter(
                                      (column) => column.id !== extraColumn.id
                                    )
                                  )
                                }
                                aria-label={`Remove additional column ${extraColumn.key || extraColumn.id}`}
                              >
                                <X className="h-4 w-4" aria-hidden />
                              </Button>
                            </div>
                          ))}

                          {extraColumnState.issues.length > 0 ? (
                            <div className="space-y-1 rounded-lg border border-red-200 bg-red-50/70 px-3 py-2 text-[11px] text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
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
                          <h3 className="text-sm font-semibold">
                            Import summary
                          </h3>
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
                              mergeStrategy === opt.value &&
                                'border-primary bg-primary/5'
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
                              <span className="block text-sm font-medium">
                                {opt.label}
                              </span>
                              <span className="block text-xs text-muted-foreground">
                                {opt.hint}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className="min-w-0 space-y-4">
                    <section className="rounded-xl border bg-muted/15">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
                        <div>
                          <h3 className="text-sm font-semibold">Preview</h3>
                          <p className="text-xs text-muted-foreground">
                            Review the first {PREVIEW_ROWS} imported rows with
                            the current mapping.
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
                                  <AlertTriangle
                                    className="h-3 w-3"
                                    aria-hidden
                                  />
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
                            {tabular.rows
                              .slice(0, PREVIEW_ROWS)
                              .map((row, idx) => {
                                const rowError = validation?.errors.some(
                                  (e) => e.row === idx + 1
                                );
                                return (
                                  <tr
                                    key={idx}
                                    className={cn(
                                      'border-t border-border/70',
                                      rowError &&
                                        'bg-red-50/60 dark:bg-red-950/30'
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
                                              const ci =
                                                mapping[column.field.key];
                                              const raw =
                                                ci === null || ci === undefined
                                                  ? ''
                                                  : (row[ci] ?? '');
                                              return (
                                                raw ||
                                                fileDefaults[
                                                  column.field.key
                                                ]?.[rowSource] ||
                                                ''
                                              );
                                            })()
                                          : (row[
                                              column.extraColumn.columnIndex
                                            ] ?? '');
                                      const missing =
                                        column.kind === 'schema' &&
                                        column.field.required &&
                                        !val;
                                      return (
                                        <td
                                          key={column.key}
                                          className={cn(
                                            'px-2 py-1.5 align-top',
                                            missing &&
                                              'text-red-600 dark:text-red-400'
                                          )}
                                        >
                                          {val ||
                                            (missing ? '— missing —' : '')}
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
                          Showing the first {PREVIEW_ROWS} of{' '}
                          {tabular.rows.length} rows.
                        </div>
                      ) : null}
                    </section>

                    {(parseWarnings.length > 0 || validation) && (
                      <section className="rounded-xl border bg-muted/15 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-semibold">
                              Diagnostics
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              Non-fatal import notes and validation feedback.
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2 text-xs">
                          {parseWarnings.map((warning, index) => (
                            <div
                              key={`${warning}-${index}`}
                              className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
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
                              className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
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
                              className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/70 px-3 py-2 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200"
                            >
                              <AlertTriangle
                                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                                aria-hidden
                              />
                              <span>{issue}</span>
                            </div>
                          ))}
                          {validation?.errors
                            .slice(0, 5)
                            .map((error, index) => (
                              <div
                                key={`${error.row}-${index}`}
                                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/70 px-3 py-2 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200"
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
                              Showing the first 5 row errors. Remaining rows
                              will still be skipped on commit.
                            </p>
                          ) : null}
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <DialogFooter className="border-t px-6 py-4 sm:items-center sm:justify-between sm:space-x-0">
            <div className="text-xs text-muted-foreground">
              {validation?.ok && validation.data.length
                ? `${validation.data.length} row${validation.data.length === 1 ? '' : 's'} ready to commit`
                : 'Review the import before committing'}
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleCommit} disabled={commitDisabled}>
                Commit
                {validation?.ok && validation.data.length
                  ? ` (${validation.data.length})`
                  : ''}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

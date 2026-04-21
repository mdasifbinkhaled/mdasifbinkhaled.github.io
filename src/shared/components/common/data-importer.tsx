'use client';

// ─────────────────────────────────────────────────────────────────────
// DataImporter
// ─────────────────────────────────────────────────────────────────────
// A reusable Radix Dialog importer that:
//   1. Collects input via a Paste tab (textarea) and an Upload tab
//      (CSV/TSV/XLSX file picker).
//   2. Parses to a normalized `TabularData` using the shared parser
//      pipeline.
//   3. Lets the user override column-to-field mapping via chip dropdowns
//      when auto-detection is wrong or ambiguous.
//   4. Shows a preview of the first 20 rows with inline validation
//      badges for missing/invalid fields.
//   5. Asks for a merge strategy (Replace / Merge / Append — default
//      Merge) and commits.
//
// Callers pass `fields` (a schema) and `onCommit`. The component is
// stateless w.r.t. the tool's own data — it only returns the parsed rows.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, FileUp, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
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
import { parseFile, parseText } from '@/shared/lib/parsers/tabular';
import { applySchema, inferMapping } from '@/shared/lib/parsers/schema';
import type {
  ColumnMapping,
  ImportCommitMeta,
  MergeStrategy,
  SchemaField,
  TabularData,
} from '@/shared/lib/parsers/types';

export interface DataImporterProps<TKey extends string> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  /** Called with the mapped/validated rows + chosen merge strategy. */
  onCommit: (rows: Record<TKey, unknown>[], meta: ImportCommitMeta) => void;
}

const DEFAULT_ACCEPT = '.csv,.tsv,.txt,.xlsx,.xls';
const PREVIEW_ROWS = 20;

export function DataImporter<TKey extends string>({
  open,
  onOpenChange,
  fields,
  title,
  description,
  pastePlaceholder,
  accept = DEFAULT_ACCEPT,
  helpText,
  onCommit,
}: DataImporterProps<TKey>) {
  // ── tab state ─────────────────────────────────────────────────────
  const [tab, setTab] = useState<'paste' | 'upload'>('paste');
  const [pasted, setPasted] = useState('');
  const [loading, setLoading] = useState(false);

  // ── parsed data + mapping ─────────────────────────────────────────
  const [tabular, setTabular] = useState<TabularData | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping<TKey>>(
    {} as ColumnMapping<TKey>
  );
  const [mergeStrategy, setMergeStrategy] = useState<MergeStrategy>('merge');

  // reset state whenever the dialog closes
  useEffect(() => {
    if (!open) {
      setTab('paste');
      setPasted('');
      setTabular(null);
      setMapping({} as ColumnMapping<TKey>);
      setMergeStrategy('merge');
    }
  }, [open]);

  // ── actions ───────────────────────────────────────────────────────
  const handlePasteParse = () => {
    if (!pasted.trim()) {
      setTabular(null);
      return;
    }
    const data = parseText(pasted, 'Pasted text');
    setTabular(data);
    setMapping(inferMapping(data.headers, fields));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const data = await parseFile(file);
      setTabular(data);
      setMapping(inferMapping(data.headers, fields));
    } finally {
      setLoading(false);
      // Allow re-selecting the same file name.
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ── derived: validation snapshot for preview ──────────────────────
  const validation = useMemo(() => {
    if (!tabular) return null;
    return applySchema(tabular, fields, mapping);
  }, [tabular, fields, mapping]);

  const commitDisabled =
    !validation || !validation.ok || validation.data.length === 0;

  const handleCommit = () => {
    if (!validation || !validation.ok) return;
    onCommit(validation.data, {
      source: tabular?.source ?? '',
      mergeStrategy,
      warnings: validation.warnings.map((w) => w.message),
      rowsSkipped: validation.errors.length,
    });
    onOpenChange(false);
  };

  // ── render helpers ────────────────────────────────────────────────
  const columnOptions =
    tabular?.headers.map((h, i) => ({ label: h, value: String(i) })) ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>

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
                pastePlaceholder ?? 'Paste CSV, TSV, or spreadsheet text here…'
              }
              rows={7}
              className="w-full rounded-md border bg-background p-2 font-mono text-xs leading-relaxed focus:border-ring focus:outline-none"
              spellCheck={false}
            />
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={handlePasteParse}>
                Parse
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-3">
            <label
              htmlFor="data-importer-file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-background/50 p-8 text-center transition hover:bg-accent/30"
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
                {loading ? 'Parsing…' : 'Click to choose a file'}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                Accepts {accept.replace(/\./g, '').replace(/,/g, ', ')}
              </span>
              <input
                id="data-importer-file"
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                disabled={loading}
                className="sr-only"
              />
            </label>
          </TabsContent>
        </Tabs>

        {helpText ? (
          <p className="rounded-md bg-muted/40 p-2 text-xs text-muted-foreground">
            {helpText}
          </p>
        ) : null}

        {tabular && tabular.headers.length > 0 ? (
          <div className="space-y-3">
            {/* Column mapping chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Columns
              </span>
              {fields.map((field) => {
                const value = mapping[field.key];
                return (
                  <div
                    key={field.key}
                    className="flex items-center gap-1.5 rounded-full border bg-card px-2 py-1 text-xs"
                  >
                    <span
                      className={cn(
                        'font-medium',
                        field.required &&
                          value === null &&
                          'text-red-600 dark:text-red-400'
                      )}
                    >
                      {field.label}
                      {field.required ? (
                        <span className="text-red-500">*</span>
                      ) : null}
                    </span>
                    <span className="text-muted-foreground">→</span>
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
                      <SelectTrigger className="h-6 border-0 bg-transparent p-0 text-xs font-semibold">
                        <SelectValue placeholder="—" />
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

            {/* Preview table */}
            <div className="max-h-64 overflow-auto rounded-md border">
              <table className="w-full border-collapse text-xs">
                <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                  <tr>
                    <th className="px-2 py-1.5 text-left font-semibold text-muted-foreground">
                      #
                    </th>
                    {fields.map((f) => (
                      <th
                        key={f.key}
                        className="px-2 py-1.5 text-left font-semibold"
                      >
                        {f.label}
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
                          'border-t',
                          rowError && 'bg-red-50/60 dark:bg-red-950/30'
                        )}
                      >
                        <td className="px-2 py-1 text-muted-foreground">
                          {idx + 1}
                        </td>
                        {fields.map((f) => {
                          const ci = mapping[f.key];
                          const val =
                            ci === null || ci === undefined
                              ? ''
                              : (row[ci] ?? '');
                          const missing = f.required && !val;
                          return (
                            <td
                              key={f.key}
                              className={cn(
                                'px-2 py-1',
                                missing && 'text-red-600 dark:text-red-400'
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
              {tabular.rows.length > PREVIEW_ROWS ? (
                <div className="border-t bg-muted/30 px-2 py-1 text-center text-[11px] text-muted-foreground">
                  Showing first {PREVIEW_ROWS} of {tabular.rows.length} rows.
                </div>
              ) : null}
            </div>

            {/* Warnings + error count */}
            {validation ? (
              <div className="flex flex-wrap gap-2 text-xs">
                {validation.ok && validation.data.length > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" aria-hidden />
                    {validation.data.length} row
                    {validation.data.length === 1 ? '' : 's'} ready
                  </span>
                ) : null}
                {validation.errors.length > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-red-700 dark:bg-red-950/50 dark:text-red-300">
                    <AlertTriangle className="h-3 w-3" aria-hidden />
                    {validation.errors.length} row
                    {validation.errors.length === 1 ? '' : 's'} skipped
                  </span>
                ) : null}
                {validation.warnings.map((w, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                    title={w.message}
                  >
                    <AlertTriangle className="h-3 w-3" aria-hidden />
                    {w.message.length > 60
                      ? `${w.message.slice(0, 60)}…`
                      : w.message}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Merge strategy */}
            <fieldset className="rounded-md border p-3">
              <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                On commit
              </legend>
              <div className="flex flex-wrap gap-4 text-sm">
                {(
                  [
                    {
                      value: 'merge',
                      label: 'Merge',
                      hint: 'Keep existing; update duplicates.',
                    },
                    {
                      value: 'append',
                      label: 'Append',
                      hint: 'Always add, allow duplicates.',
                    },
                    {
                      value: 'replace',
                      label: 'Replace',
                      hint: 'Discard existing data.',
                    },
                  ] as { value: MergeStrategy; label: string; hint: string }[]
                ).map((opt) => (
                  <label key={opt.value} className="flex items-start gap-1.5">
                    <input
                      type="radio"
                      name="merge-strategy"
                      value={opt.value}
                      checked={mergeStrategy === opt.value}
                      onChange={() => setMergeStrategy(opt.value)}
                      className="mt-0.5"
                    />
                    <span>
                      <span className="font-medium">{opt.label}</span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        {opt.hint}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCommit} disabled={commitDisabled}>
            Commit
            {validation?.ok && validation.data.length
              ? ` (${validation.data.length})`
              : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

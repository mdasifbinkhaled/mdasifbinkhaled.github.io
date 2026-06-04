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
//
// This file is the public entry point: it owns `DataImporter` and the
// exported `DataImporterProps` type and composes the import hook with the
// focused panel sub-components. The heavy lifting lives in:
//   - `use-data-importer.ts`        — state, effects, derived selectors
//   - `data-importer.utils.ts`      — pure helpers
//   - `data-importer/*.tsx`         — paste / upload / mapping / preview UI
// ─────────────────────────────────────────────────────────────────────

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import type {
  AdditionalPerFileField,
  ImportedRow,
  ImportCommitMeta,
  SchemaField,
  TabularData,
} from '@/shared/lib/parsers/types';
import { DEFAULT_ACCEPT } from '@/shared/components/common/data-importer.utils';
import { useDataImporter } from '@/shared/components/common/use-data-importer';
import { PastePanel } from '@/shared/components/common/data-importer/paste-panel';
import { UploadPanel } from '@/shared/components/common/data-importer/upload-panel';
import { ColumnMappingPanel } from '@/shared/components/common/data-importer/column-mapping-panel';
import { PreviewTable } from '@/shared/components/common/data-importer/preview-table';

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
  /** Optional extra metadata inputs collected once per imported file. */
  extraPerFileFields?: readonly AdditionalPerFileField[];
  /** Optional pasted-text parser override for domain-specific import formats. */
  parsePastedText?: (text: string, source: string) => TabularData;
  /** Called with the mapped/validated rows + chosen merge strategy. */
  onCommit: (rows: ImportedRow<TKey>[], meta: ImportCommitMeta) => void;
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
  extraPerFileFields = [],
  parsePastedText,
  onCommit,
}: DataImporterProps<TKey>) {
  const {
    tab,
    setTab,
    pasted,
    setPasted,
    loading,
    tabular,
    mapping,
    setMapping,
    fileDefaults,
    setFileDefaults,
    additionalFileDefaults,
    setAdditionalFileDefaults,
    extraColumns,
    setExtraColumns,
    mergeStrategy,
    setMergeStrategy,
    handleOpenChange,
    handlePasteParse,
    fileInputRef,
    handleFileChange,
    parsedFiles,
    perFileFields,
    extraColumnState,
    validation,
    commitDisabled,
    parseWarnings,
    statusItems,
    handleCommit,
    columnOptions,
    mergeOptions,
    previewColumns,
  } = useDataImporter<TKey>({
    defaultTab,
    fields,
    extraPerFileFields,
    parsePastedText,
    onOpenChange,
    onCommit,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] w-[min(98vw,76rem)] max-w-6xl overflow-hidden p-0 sm:rounded-2xl">
        <div className="flex max-h-[92vh] min-h-0 flex-col">
          <DialogHeader className="border-b px-6 py-5">
            <DialogTitle>{title}</DialogTitle>
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:overflow-hidden">
            <div className="space-y-5">
              <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as 'paste' | 'upload')}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="paste">Paste</TabsTrigger>
                  <TabsTrigger value="upload">Upload file</TabsTrigger>
                </TabsList>

                <PastePanel
                  pasted={pasted}
                  setPasted={setPasted}
                  handlePasteParse={handlePasteParse}
                  pastePlaceholder={pastePlaceholder}
                />

                <UploadPanel
                  loading={loading}
                  allowMultiple={allowMultiple}
                  accept={accept}
                  tabular={tabular}
                  fileInputRef={fileInputRef}
                  handleFileChange={handleFileChange}
                />
              </Tabs>

              {helpText ? (
                <p className="rounded-xl bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  {helpText}
                </p>
              ) : null}

              {tabular && tabular.headers.length > 0 ? (
                <div className="grid gap-5 lg:min-h-0 lg:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[22rem_minmax(0,1fr)]">
                  <ColumnMappingPanel<TKey>
                    fields={fields}
                    tabular={tabular}
                    mapping={mapping}
                    setMapping={setMapping}
                    columnOptions={columnOptions}
                    parsedFiles={parsedFiles}
                    perFileFields={perFileFields}
                    fileDefaults={fileDefaults}
                    setFileDefaults={setFileDefaults}
                    additionalFileDefaults={additionalFileDefaults}
                    setAdditionalFileDefaults={setAdditionalFileDefaults}
                    allowExtraColumns={allowExtraColumns}
                    extraColumns={extraColumns}
                    setExtraColumns={setExtraColumns}
                    extraColumnState={extraColumnState}
                    validation={validation}
                    mergeStrategy={mergeStrategy}
                    setMergeStrategy={setMergeStrategy}
                    mergeOptions={mergeOptions}
                  />

                  <PreviewTable<TKey>
                    tabular={tabular}
                    mapping={mapping}
                    fileDefaults={fileDefaults}
                    parsedFiles={parsedFiles}
                    previewColumns={previewColumns}
                    validation={validation}
                    statusItems={statusItems}
                    parseWarnings={parseWarnings}
                    extraColumnState={extraColumnState}
                  />
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

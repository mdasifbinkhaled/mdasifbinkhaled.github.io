'use client';

// ─────────────────────────────────────────────────────────────────────
// useDataImporter
// ─────────────────────────────────────────────────────────────────────
// Owns all DataImporter state, effects, derived selectors and handlers.
// The component renders the values this hook returns; behavior is
// identical to the original inline implementation.
// ─────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { parseFiles, parseText } from '@/shared/lib/parsers/tabular';
import { applySchema, inferMapping } from '@/shared/lib/parsers/schema';
import type {
  AdditionalPerFileField,
  ColumnMapping,
  ExtraColumnSelection,
  ImportedRow,
  ImportCommitMeta,
  MergeStrategy,
  SchemaField,
  TabularData,
} from '@/shared/lib/parsers/types';
import {
  buildInitialAdditionalFileDefaults,
  buildInitialFileDefaults,
  getParsedFiles,
} from '@/shared/components/common/data-importer.utils';
import type { ExtraColumnDraft } from '@/shared/components/common/data-importer.utils';

/** Upper bound for a single imported file — these are browser-local tools. */
const MAX_IMPORT_FILE_MB = 10;
const MAX_IMPORT_FILE_BYTES = MAX_IMPORT_FILE_MB * 1024 * 1024;

interface UseDataImporterArgs<TKey extends string> {
  defaultTab: 'paste' | 'upload';
  fields: readonly SchemaField<TKey>[];
  extraPerFileFields: readonly AdditionalPerFileField[];
  parsePastedText?: (text: string, source: string) => TabularData;
  onOpenChange: (open: boolean) => void;
  onCommit: (rows: ImportedRow<TKey>[], meta: ImportCommitMeta) => void;
}

/** A unified per-file value descriptor (schema-backed or additional). */
export type PerFileField<TKey extends string> =
  | {
      kind: 'schema';
      key: string;
      fieldKey: TKey;
      label: string;
      config: NonNullable<SchemaField<TKey>['perFileValue']>;
    }
  | {
      kind: 'additional';
      key: string;
      label: string;
      config: AdditionalPerFileField;
    };

/** Derived validation result of the active import draft. */
export type ImportValidation<TKey extends string> = ReturnType<
  typeof applySchema<TKey>
>;

/** A preview/render column (schema-backed or extra passthrough). */
export type PreviewColumn<TKey extends string> =
  | { kind: 'schema'; key: string; label: string; field: SchemaField<TKey> }
  | {
      kind: 'extra';
      key: string;
      label: string;
      extraColumn: ExtraColumnSelection;
    };

export interface MergeOption {
  value: MergeStrategy;
  label: string;
  hint: string;
}

export interface ColumnOption {
  label: string;
  value: string;
}

export interface StatusItem {
  tone: string;
  label: string;
}

export interface ExtraColumnState {
  issues: string[];
  valid: ExtraColumnSelection[];
}

export function useDataImporter<TKey extends string>({
  defaultTab,
  fields,
  extraPerFileFields,
  parsePastedText,
  onOpenChange,
  onCommit,
}: UseDataImporterArgs<TKey>) {
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
  const [additionalFileDefaults, setAdditionalFileDefaults] = useState<
    Record<string, Record<string, string>>
  >({});
  const [extraColumns, setExtraColumns] = useState<ExtraColumnDraft[]>([]);
  const [mergeStrategy, setMergeStrategy] = useState<MergeStrategy>('merge');

  const resetDraft = () => {
    setTab(defaultTab);
    setPasted('');
    setTabular(null);
    setMapping({} as ColumnMapping<TKey>);
    setFileDefaults({});
    setAdditionalFileDefaults({});
    setExtraColumns([]);
    setMergeStrategy('merge');
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetDraft();
    onOpenChange(nextOpen);
  };

  // ── actions ───────────────────────────────────────────────────────
  const handlePasteParse = () => {
    if (!pasted.trim()) {
      setTabular(null);
      return;
    }
    const data = (parsePastedText ?? parseText)(pasted, 'Pasted text');
    setTabular(data);
    setMapping(inferMapping(data.headers, fields));
    setFileDefaults(buildInitialFileDefaults(data, fields));
    setAdditionalFileDefaults(
      buildInitialAdditionalFileDefaults(data, extraPerFileFields)
    );
    setExtraColumns([]);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    // Guard against accidentally importing a huge file (these are browser-local
    // tools — a multi-hundred-MB sheet would freeze the tab / exhaust memory).
    const tooBig = files.find((f) => f.size > MAX_IMPORT_FILE_BYTES);
    if (tooBig) {
      toast.error(
        `"${tooBig.name}" is too large (max ${MAX_IMPORT_FILE_MB} MB).`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setLoading(true);
    try {
      const data = await parseFiles(files);
      setTabular(data);
      setMapping(inferMapping(data.headers, fields));
      setFileDefaults(buildInitialFileDefaults(data, fields));
      setAdditionalFileDefaults(
        buildInitialAdditionalFileDefaults(data, extraPerFileFields)
      );
      setExtraColumns([]);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Could not read that file.'
      );
    } finally {
      setLoading(false);
      // Allow re-selecting the same file name.
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const parsedFiles = useMemo(() => getParsedFiles(tabular), [tabular]);
  const perFileFields = useMemo(
    () => [
      ...fields
        .filter((field) => field.perFileValue)
        .map((field) => ({
          kind: 'schema' as const,
          key: String(field.key),
          fieldKey: field.key,
          label: field.label,
          config: field.perFileValue!,
        })),
      ...extraPerFileFields.map((field) => ({
        kind: 'additional' as const,
        key: field.key,
        label: field.label,
        config: field,
      })),
    ],
    [extraPerFileFields, fields]
  );

  const commitPerFileValues = useMemo(() => {
    if (parsedFiles.length === 0 || perFileFields.length === 0) {
      return undefined;
    }

    const entries = perFileFields
      .map((field) => {
        const values = Object.fromEntries(
          parsedFiles
            .map((file) => {
              const rawValue =
                field.kind === 'schema'
                  ? (fileDefaults[field.fieldKey]?.[file.source] ?? '')
                  : (additionalFileDefaults[field.key]?.[file.source] ?? '');
              const value = rawValue.trim();
              return value ? ([file.source, value] as const) : null;
            })
            .filter(
              (entry): entry is readonly [string, string] => entry !== null
            )
        );

        return Object.keys(values).length > 0
          ? ([field.key, values] as const)
          : null;
      })
      .filter(
        (entry): entry is readonly [string, Record<string, string>] =>
          entry !== null
      );

    return entries.length > 0 ? Object.fromEntries(entries) : undefined;
  }, [additionalFileDefaults, fileDefaults, parsedFiles, perFileFields]);

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
      perFileValues: commitPerFileValues,
    });
    handleOpenChange(false);
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

  return {
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
  };
}

# ADR-007: Apps Hub I/O Redesign — Shared Primitives + Spreadsheet Imports

**Date**: 2025-04-21
**Status**: Accepted
**Deciders**: mdasifbinkhaled

## Context

The Apps Hub (`/apps`) tools — Seat Planner, Grade Calculator, GPA Calculator,
Exam Countdown, Course Planner, Study Timer — grew independently. Each tool
shipped its own CSV parser, its own export buttons, its own settings menu,
its own `localStorage` key scheme, and its own back-up/reset UX (where it
existed at all). Consequences:

- **Divergent data ingress.** Seat Planner had a bespoke `parseStudentData`
  function that only accepted specific column orders; other tools had none.
  Users asked repeatedly for spreadsheet paste/upload across all tools.
- **No migration story.** Keys lived in an ad-hoc flat namespace
  (`seatPlannerStudents`, `gradeCalc_components`, …) with no versioning,
  no back-up, no reset.
- **Inconsistent UX.** Stats, exports, and settings were rendered inline per
  tool with duplicated markup, inconsistent language, and inconsistent
  keyboard/accessibility semantics.
- **Security.** `xlsx@0.18.5` (SheetJS CE on npm) has two unpatched HIGH CVEs
  as of 2025-04 — GHSA-4r6h-8v6p-xvw6 (prototype pollution) and
  GHSA-5pgg-2g8v-p4x9 (ReDoS). SheetJS moved fixed versions to sheetjs.com
  CDN and no longer publishes to npm.

We want every tool to share the same import → preview → commit flow, the
same storage/back-up semantics, the same stats surface, and the same export
menu, without rewriting each tool from scratch.

## Decision

Introduce a cross-cutting primitives layer under `src/shared/` that every
tool composes.

### 1. Validation `Result<T>`

`src/shared/lib/validation/` — a discriminated-union result type:

```ts
type Result<T> =
  | { ok: true; data: T; errors?: ValError[]; warnings?: ValWarn[] }
  | { ok: false; errors: ValError[]; warnings?: ValWarn[] };
```

All parsers, schema applicators, and importers return `Result<T>`. The UI
narrows on `ok` before accessing `data`.

### 2. Namespaced storage

`src/shared/lib/storage/` — all tool state persists under the key shape
`abk:v1:<tool-slug>:<key>` (e.g. `abk:v1:seat-planner:students`).

- `buildKey`, `readValue`, `writeValue`, `removeValue` — safe JSON round-trip
  on a namespaced key.
- `purgeToolData(tool)` — iterates `localStorage` by prefix and removes all
  keys for a tool (used by the Reset flow).
- `snapshotToolData(tool)` — returns a plain object of all the tool's
  persisted data (used by the Back-up flow).
- `migrateTool(tool, mapping[])` — idempotent, sentinel-guarded migration
  of legacy flat keys into the namespaced scheme. Reads legacy JSON,
  validates shape, moves to the new key on success, keeps the legacy key on
  failure, and writes `abk:v1:_migrated:<tool>=true` when done so the
  migration is only attempted once.
- `useToolStorage<T>(tool, key, default)` — a `usePersistedState` replacement
  that runs the migration once on mount.

`LEGACY_MIGRATIONS` ships with mappings for Seat Planner, Grade Calculator,
GPA Calculator, Exam Countdown, Course Planner, and Study Timer.

### 3. Spreadsheet parsers

`src/shared/lib/parsers/` — a single ingestion pipeline for all tools:

- **CSV / TSV / paste** via `papaparse@^5.4` (~15 KB, eager).
  - `parseText(text)` strips BOM, sniffs the delimiter (`,\t;|`), parses
    with quote awareness, normalises short rows to the widest, and
    heuristically detects a header row (alpha > numeric in row 0).
- **XLSX / XLS** via `read-excel-file@^9.0.6` (~35 KB, lazy
  `await import('read-excel-file/browser')`).
  - Uses the named `readSheet` export (returns a flat `Row[][]`, not the
    sheets-wrapper returned by the `default` export).
  - Stringifies `Date → ISO`, finite numbers → `String(n)`, null → `''`.
- **Schema application**
  - `SchemaField<TKey>` — `{ key, label, required, aliases[], parse? }`.
  - `applySchema(data, fields, mapping)` — per-row validation; rows with
    errors are omitted from `data` and reported in `errors` with a 1-based
    row number. Required-but-empty cells and invalid `parse()` results are
    both surfaced this way.
  - `inferMapping(headers, fields)` — case-insensitive exact match first,
    then substring fallback.

### 4. UI primitives

`src/shared/components/common/` — three composable surfaces:

- `<DataImporter<TKey>>` — Radix Dialog hosting Paste / Upload tabs, a
  live column mapper, a preview table (first 20 rows; red rows with errors;
  "— missing —" for required blanks), an error/warning pill row, and a
  merge-strategy radio (`merge` default, `append`, `replace`). Commit is
  disabled until validation succeeds. All state is torn down when the
  dialog closes.
- `<StatsPanel>` — `items: StatItem[]` with `label`, `value`, optional
  `hint`, tone (`default | success | warning | danger`). Vertical variant
  is a sticky right-rail card (`top-24`); horizontal variant is a
  scrollable chip strip for mobile.
- `<ExportBar>` — dropdown with groups `copy | file | other`. Handlers are
  a partial dictionary keyed on `copy | csv | tsv | json | pdf | png |
print | ics`; missing handlers are omitted. Separators are only rendered
  between non-empty groups.
- `<ToolSettings>` — dropdown with **Export backup** and **Reset** (the
  Reset item is destructive-coloured and opens a confirmation dialog that
  explicitly names the tool).

### 5. Shared ICS writer

`src/shared/lib/ics/write.ts` — minimal RFC 5545 writer used by Exam
Countdown today and Course Planner in Phase 3. Handles UID / DTSTAMP /
DTSTART / DTEND / SUMMARY / DESCRIPTION / LOCATION with §3.3.11 TEXT
escaping. CRLF line endings per spec.

## Deviations from the original plan

### Spreadsheet library

The Phase 1 plan called for `xlsx@0.18.5` (SheetJS CE on npm). That version
has two unpatched HIGH-severity CVEs as of 2025-04, and SheetJS has stopped
publishing fixes to npm.

**Chosen instead:** `read-excel-file@^9.0.6` (Apache-2.0, ~35 KB). Read-only
— exactly our use case. The API is a single `readSheet(file)` call. Loaded
lazily via `import('read-excel-file/browser')` so the main bundle is
unaffected.

This makes `npm audit` return 0 vulnerabilities against the app scope.

### XLSX round-trip

The original sketch assumed round-trip support (tools writing `.xlsx`).
Because `read-excel-file` is read-only, XLSX export stays out of scope for
the hub. CSV remains the canonical export format; tools that need a
calendar format use `.ics` (shared writer); no tool needs to emit `.xlsx`.

## Consequences

### Positive

- Every tool gets spreadsheet paste + CSV/TSV/XLSX upload with column
  mapping and row-level preview for free, in one consistent dialog.
- Storage is namespaced, versioned (`abk:v1:*`), and migrated idempotently
  from the old flat keys — no user-visible data loss.
- Every tool has Back-up (JSON) + Reset (confirmed) out of the box.
- Exports are unified behind one menu — no more ad-hoc button strips.
- Right-rail `StatsPanel` turns the tools into proper "dashboards" on
  desktop without cluttering mobile.
- All new code is `Result<T>`-typed; errors surface with row numbers and
  user-readable messages.
- `npm audit` is clean.

### Negative

- Adds ~50 KB of shared code (mostly `papaparse`). `read-excel-file` is
  lazy-loaded and only paid for when a user uploads XLSX.
- All tools now hard-depend on Radix Dialog + Dropdown primitives, which
  were already in the bundle but are now in the critical path for the
  hub.
- Legacy key migration is one-shot — if a user somehow re-writes to a
  legacy key after migration, the sentinel prevents re-migration. This
  is the intended trade-off; the alternative (every-mount migration) is
  wasteful.

### Neutral

- Tools keep their own business logic (allocation algorithms, GPA rules,
  countdown maths). The primitives layer is strictly I/O + state + chrome.

## Rollout (Phases 1–3)

| Phase | Scope                                                                  |
| ----- | ---------------------------------------------------------------------- |
| 1     | Primitives + Seat Planner refactor (this commit)                       |
| 2     | Apply primitives to Grade / GPA / Exam / Course / Study                |
| 3     | Add importers: GPA transcript paste, Course CSV/JSON, Exam `.ics` read |

Each phase runs its own typecheck, tests, build, and e2e before pushing.

## Tests

- `tests/shared/lib/storage.test.ts` — 11 tests (namespacing, round-trip,
  null-safety, purge scope, migration idempotency).
- `tests/shared/lib/parsers.test.ts` — 20 tests (BOM, CRLF, delimiter
  sniffing, synthesised headers, row padding, quoted fields, escaped
  quotes, schema mapping, `parse()` errors).
- `tests/shared/lib/ics.test.ts` — 9 tests (VCALENDAR shape, UTC basic
  format, default duration, TEXT escaping, explicit end, custom PRODID,
  empty input).
- `tests/shared/components/stats-panel.test.tsx` — 4 tests (render, tone,
  horizontal, empty).
- `tests/shared/components/export-bar.test.tsx` — 4 tests (label, default
  label, empty handlers → null, disabled).
- `tests/shared/components/tool-settings.test.tsx` — 2 tests (render,
  custom label).
- `tests/features/apps/seat-planner.test.ts` — 5 allocation tests (CSV
  tests moved to shared parsers tests).

**Total:** 408/408 green after Phase 1.

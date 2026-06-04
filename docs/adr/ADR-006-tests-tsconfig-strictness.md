# ADR-006: Tests tsconfig relaxes `noUncheckedIndexedAccess`

**Date**: 2026-04-17
**Status**: Accepted
**Deciders**: Md Asif Bin Khaled

## Context

The root `tsconfig.json` enables full strict mode plus two extra guards:

- `noUncheckedIndexedAccess`: array/record index access returns `T | undefined`.
- `noImplicitOverride`: explicit `override` keyword required in subclasses.

These flags are load-bearing for production correctness. During the AUD-001..AUD-016
remediation cycle (see commit `f399fca`), the test suite broke under
`noUncheckedIndexedAccess` for a specific reason: test fixtures and helper
assertions routinely reach into arrays by known-good indices
(`courses[0].outcomes`, `rows[1]!.title`, etc.) where asserting `!== undefined`
at every site adds noise without adding safety — the fixture is controlled by
the test itself, and any `undefined` return is a test-author bug that will fail
the assertion on the very next line anyway.

Two options were considered:

1. Sprinkle `!` non-null assertions across test fixtures.
2. Disable `noUncheckedIndexedAccess` in `tests/tsconfig.json` only.

## Decision

Disable `noUncheckedIndexedAccess` in `tests/tsconfig.json` only. Keep every
other strict-mode flag enabled, including `strict: true`, `noImplicitOverride`,
and `noUncheckedIndexedAccess` in the **root** `tsconfig.json` that covers
`src/`.

The `typecheck` npm script runs both projects sequentially:

```json
"typecheck": "tsc --noEmit && tsc --noEmit -p tests/tsconfig.json"
```

Both must pass before commit (enforced in CI and in `husky` pre-commit via
`npm run validate` / `validate:full`).

## Consequences

### Positive

- Test authors can write `fixture[0].field` without `!` assertions on every
  line; readability stays high.
- Production code under `src/` remains protected by the full strict profile —
  the flag where it matters most for runtime safety is untouched.
- Root and tests tsconfigs can diverge deliberately without silent drift: any
  change to tests' strictness is visible in this file and in its own tsconfig.

### Negative

- Tests can hold a latent index bug that only manifests at runtime. Mitigation:
  every test fixture is small and controlled; any missing entry fails the
  assertion immediately on the next line.
- A contributor who assumes tests share the root tsconfig may be surprised.
  Mitigation: this ADR plus a one-line comment in `tests/tsconfig.json`.

### Neutral

- `jspdf-autotable` type augmentation (`src/shared/types/jspdf-autotable.d.ts`)
  is included in both projects' `include` arrays so that tests and source see
  the same `jsPDF.lastAutoTable` surface.

## Supersedes

- None.

## Related

- AUD-002 (forensic audit finding: 4 test-tsconfig errors + CI wiring).
- Commit `f399fca` \u2014 the remediation commit that introduced this split.

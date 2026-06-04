# ADR Template — Architecture Decision Record

## ADR-NNN: [Title]

**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Deprecated | Superseded
**Deciders**: [Names]

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?

### Positive

- ...

### Negative

- ...

### Neutral

- ...

---

## Existing Decisions (Implicit ADRs)

### ADR-001: Static Export over Server-Side Rendering

- **Date**: Phase 4 (Stack Modernization)
- **Status**: Accepted
- **Context**: Academic portfolio has no dynamic server-side needs. GitHub Pages is free and reliable.
- **Decision**: Use `output: 'export'` for fully static site. No API routes, no server components that fetch at request time.
- **Consequences**: (+) Zero hosting cost, maximum performance, CDN-cached. (-) No server-side features (forms, auth, ISR). All data is build-time.

### ADR-002: Plain TypeScript Types (was: Zod-First Type System)

- **Date**: Phase 4 (revised Phase 8)
- **Status**: Accepted (revised)
- **Context**: Originally used Zod schemas for all 28 data files with `z.infer<>` type inference. Zod was later removed — runtime validation unnecessary for a static site with build-time type checking.
- **Decision**: All domain types as plain TypeScript interfaces in `src/shared/types/`. Type-checked via `satisfies` assertions. No runtime schema validation.
- **Consequences**: (+) Simpler, smaller bundle, no Zod dependency. (-) No runtime validation (acceptable for static export).
- **History**: Phase 7 split monolithic 614-line `schemas.ts` into 7 domain files. Phase 8 removed Zod entirely, consolidated types to `src/shared/types/index.ts`.

### ADR-003: 6-Theme System

- **Date**: Phase 3 (revised Phase 7)
- **Status**: Accepted (revised)
- **Context**: Originally 13 themes for rich personalization. Reduced to 6 to balance customization vs. maintenance.
- **Decision**: 6 color themes (light, dark, ocean, forest, lavender, slate) via CSS custom properties + `next-themes`.
- **Consequences**: (+) Personalized experience with manageable maintenance. (-) Removes 7 niche themes.

### ADR-004: Feature Module Architecture

- **Date**: Phase 2-3 (cleaned Phase 7)
- **Status**: Accepted (cleaned)
- **Context**: Growing codebase needed organization beyond flat component directories.
- **Decision**: 4-layer architecture: Data → Shared → Features → App. Features are self-contained modules (teaching, about, home, academic).
- **Consequences**: (+) Clear boundaries, scalable. (-) Need to maintain barrel discipline.
- **Update (Phase 7)**: Removed 10 dead barrel files (18 → 8), deleted empty publications module.

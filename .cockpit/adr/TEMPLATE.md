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

### ADR-002: Zod-First Type System

- **Date**: Phase 4
- **Status**: Accepted
- **Context**: 28 data files need consistent validation. Manual TypeScript interfaces drift from actual data shape.
- **Decision**: Define all domain types as Zod schemas, infer TypeScript types with `z.infer<>`. Validate at import time.
- **Consequences**: (+) Single source of truth, runtime validation, better error messages. (-) Zod 4 is newer/less stable.
- **Update (Phase 7)**: Monolithic 614-line `schemas.ts` split into 7 domain files with barrel re-export.

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

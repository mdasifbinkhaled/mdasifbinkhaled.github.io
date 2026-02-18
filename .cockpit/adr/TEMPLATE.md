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
- **Context**: 29 data files need consistent validation. Manual TypeScript interfaces drift from actual data shape.
- **Decision**: Define all domain types as Zod schemas, infer TypeScript types with `z.infer<>`. Validate at import time.
- **Consequences**: (+) Single source of truth, runtime validation, better error messages. (-) 614-line schemas.ts file, Zod 4 is newer/less stable.

### ADR-003: 13-Theme System

- **Date**: Phase 3
- **Status**: Accepted (may need review)
- **Context**: Wanted rich personalization for visitors.
- **Decision**: 13 color themes via CSS custom properties + `next-themes` for dark/light/system.
- **Consequences**: (+) Highly personalized experience. (-) 485 LOC in tokens.css, complexity vs. usage for an academic portfolio.

### ADR-004: Feature Module Architecture

- **Date**: Phase 2-3
- **Status**: Accepted
- **Context**: Growing codebase needed organization beyond flat component directories.
- **Decision**: 4-layer architecture: Data → Shared → Features → App. Features are self-contained modules (teaching, about, home, academic, publications).
- **Consequences**: (+) Clear boundaries, scalable. (-) 19 barrel files, some modules only re-export shared components (publications/index.ts).

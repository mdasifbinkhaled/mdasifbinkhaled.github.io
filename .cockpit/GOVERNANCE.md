# GOVERNANCE.md — Code Standards & Conventions

## Language & Style

### TypeScript

- **Strict mode**: `strict: true`, `noUncheckedIndexedAccess: true`
- **Path aliases**: `@/*` → `src/*`
- **Types**: Inferred from Zod schemas (`z.infer<typeof Schema>`) — no manual interfaces for domain types
- **No `any`**: ESLint enforced
- **No unused vars**: ESLint enforced (underscore prefix `_` for intentional ignores)

### React

- **Server Components by default** — only add `'use client'` when hooks, events, or browser APIs are needed
- **Functional components only** — no class components
- **Named exports** — no default exports (except Next.js page/layout conventions)
- **Co-located error boundaries** — every route has `error.tsx`

### CSS / Styling

- **Tailwind CSS 3.4** with `darkMode: 'class'`
- **CSS custom properties** for all colors — use `bg-background`, `text-foreground`, etc.
- **Never use hardcoded colors** (e.g., `bg-gray-50`, `text-gray-700`) — always use theme tokens
- **`cn()` utility** from `tailwind-merge` + `clsx` for conditional classes
- **13 themes** via CSS custom properties in `tokens.css`

### Data Layer

- All domain data in `src/shared/lib/data/` as TypeScript objects
- Validated at import time via `validateData()` with Zod schemas
- Tiered course system: summary (inline) → standard (separate file) → detailed (multi-file directory)

## Naming Conventions

| Entity       | Convention                  | Example                               |
| ------------ | --------------------------- | ------------------------------------- |
| Components   | PascalCase                  | `CourseCard`, `HeroSection`           |
| Files        | kebab-case                  | `course-card.tsx`, `hero-section.tsx` |
| Hooks        | camelCase with `use` prefix | `useDebounce`, `useSearchFilter`      |
| Types        | PascalCase                  | `CourseData`, `PublicationType`       |
| Constants    | SCREAMING_SNAKE_CASE        | `ANIMATION_CONFIG`, `SITE_URL`        |
| Data files   | kebab-case                  | `research-interests.ts`               |
| Route params | camelCase in brackets       | `[institution]`, `[courseCode]`       |

## Commit Convention

Conventional Commits enforced by `commitlint`:

```
type(scope): description

feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting (not CSS)
refactor: Code restructuring
perf:     Performance improvement
test:     Adding/updating tests
chore:    Maintenance tasks
```

## File Organization

### Module Structure

```
feature/
├── components/       — UI components
│   └── index.ts      — Barrel export
├── hooks/            — Feature-specific hooks
├── utils/            — Feature-specific utilities
├── types.ts          — Feature types
├── styles.ts         — Feature-specific style constants
└── index.ts          — Public API barrel
```

### Import Order

1. React / Next.js
2. External libraries
3. `@/shared/*` imports
4. `@/features/*` imports
5. Relative imports
6. Type-only imports last

## Quality Gates

All must pass before merge:

| Gate       | Command                | Threshold         |
| ---------- | ---------------------- | ----------------- |
| TypeScript | `npm run typecheck`    | 0 errors          |
| ESLint     | `npm run lint:check`   | 0 errors          |
| Prettier   | `npm run format:check` | All formatted     |
| Tests      | `npm run test:run`     | All pass          |
| Build      | `npm run build`        | Successful export |

## Review Checklist

- [ ] No `'use client'` unless necessary (hooks, events, browser APIs)
- [ ] All `target="_blank"` links have `rel="noopener noreferrer"`
- [ ] No hardcoded colors — use theme tokens
- [ ] No `console.log/warn/error` in production code (guard with `process.env.NODE_ENV`)
- [ ] Error boundary present for new routes
- [ ] Structured data updated if adding new content types
- [ ] Sitemap updated if adding new routes
- [ ] Tests added for new utilities/hooks

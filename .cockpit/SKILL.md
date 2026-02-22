# SKILL.md — Forensic Code Audit

> **Skill ID**: `forensic-code-audit`
> **Version**: 1.0.0
> **Created**: 2026-02-22
> **Owner**: Cockpit System

## Purpose

A systematic, multi-phase audit skill that examines a codebase for inconsistencies, problems, over-engineering, bloating, code smells, and technical debt. Produces a structured forensic report with prioritized, actionable findings.

---

## 1. Smart Depth Control

Adapt audit depth to project scale. Avoid over-auditing small projects or under-auditing large ones.

| Project Size   | Source Files | Depth         | Phases             |
| -------------- | ------------ | ------------- | ------------------ |
| **Micro**      | < 20         | Shallow       | 0, 1, 2            |
| **Small**      | 20–80        | Standard      | 0, 1, 2, 3, 5      |
| **Medium**     | 80–300       | Full          | All (0–6)          |
| **Large**      | 300–1000     | Full + Triage | All + sub-agents   |
| **Enterprise** | 1000+        | Sampled       | All (sampled dirs) |

### Triage Rules

- Always start with **Phase 0** (Reconnaissance) to calibrate depth.
- Skip Phase 4 (Security) for pure static sites with no user input.
- Skip Phase 6 (Ecosystem) if project has no CI/CD.
- Raise depth for files with high churn (git log frequency).
- Lower depth for generated/vendored code.

---

## 2. Phase 0 — Reconnaissance

**Goal**: Understand project shape before auditing code.

### Checklist (12 items)

| #    | Check                                | Tool                          |
| ---- | ------------------------------------ | ----------------------------- |
| 0.01 | Identify framework and language      | `package.json`, config files  |
| 0.02 | Count source files and LOC           | `find + wc -l`                |
| 0.03 | Identify entry points                | Framework conventions         |
| 0.04 | Map directory structure              | `tree` or `list_dir`          |
| 0.05 | Read build/deploy config             | CI files, Dockerfiles         |
| 0.06 | Read existing documentation          | README, CONTRIBUTING, cockpit |
| 0.07 | Check git history shape              | `git log --oneline -20`       |
| 0.08 | Identify dependency count and size   | `package.json`, lock file     |
| 0.09 | Detect monorepo vs single-package    | Workspace config              |
| 0.10 | Identify test framework and coverage | Config files, scripts         |
| 0.11 | Check for linting/formatting config  | `.eslintrc`, `.prettierrc`    |
| 0.12 | Determine deployment target          | CI/CD config, output settings |

### Output

```
PROJECT PROFILE
───────────────
Framework:    [name] [version]
Language:     [lang] [version]
Source Files: [N]
LOC:          [N]
Test Files:   [N]
Dependencies: [N runtime] + [N dev]
Deploy:       [target]
Depth:        [Shallow | Standard | Full]
```

---

## 3. Phase 1 — Architecture & Layering

**Goal**: Validate structural integrity and separation of concerns.

### Checklist (25 items)

| #    | Check                                                 | Severity |
| ---- | ----------------------------------------------------- | -------- |
| 1.01 | Module boundaries respected (no circular deps)        | HIGH     |
| 1.02 | Layer direction enforced (data → shared → feat → app) | HIGH     |
| 1.03 | No business logic in UI components                    | HIGH     |
| 1.04 | No UI components in utility/lib files                 | MEDIUM   |
| 1.05 | Barrel exports are actively imported                  | MEDIUM   |
| 1.06 | Dead barrel files (export nothing useful)             | LOW      |
| 1.07 | Monolithic files > 300 LOC                            | MEDIUM   |
| 1.08 | God components (> 5 responsibilities)                 | HIGH     |
| 1.09 | Feature modules are self-contained                    | MEDIUM   |
| 1.10 | Shared code is truly shared (used by ≥ 2)             | LOW      |
| 1.11 | Config files are in config/, not scattered            | LOW      |
| 1.12 | Types co-located or centralized consistently          | MEDIUM   |
| 1.13 | Dead code (unreachable, unexported, unused)           | MEDIUM   |
| 1.14 | Duplicate code across modules (DRY violations)        | MEDIUM   |
| 1.15 | Error boundaries at appropriate granularity           | HIGH     |
| 1.16 | Route structure matches mental model                  | LOW      |
| 1.17 | Data files separated from components                  | MEDIUM   |
| 1.18 | Hardcoded data in JSX (should be in data layer)       | MEDIUM   |
| 1.19 | Redirect chains (A → B → C)                           | LOW      |
| 1.20 | Missing error boundaries for routes                   | HIGH     |
| 1.21 | Overloaded directories (> 20 files)                   | LOW      |
| 1.22 | Naming consistency (files, exports, components)       | LOW      |
| 1.23 | Over-abstraction (wrapper adds no value)              | MEDIUM   |
| 1.24 | Under-abstraction (inline everything)                 | MEDIUM   |
| 1.25 | Dependency direction violations                       | HIGH     |

---

## 4. Phase 2 — Code Quality & State Management

**Goal**: Identify code smells, anti-patterns, and state management issues.

### Checklist (30 items)

| #    | Check                                                       | Severity |
| ---- | ----------------------------------------------------------- | -------- |
| 2.01 | `useState` + `useEffect` for derived state                  | HIGH     |
| 2.02 | `useEffect` for synchronous computation                     | HIGH     |
| 2.03 | Missing cleanup in `useEffect`                              | HIGH     |
| 2.04 | Uncleaned `setTimeout` / `setInterval`                      | HIGH     |
| 2.05 | `setInterval` frequency vs display precision                | MEDIUM   |
| 2.06 | Stale closures in event handlers                            | HIGH     |
| 2.07 | Re-renders from unstable references                         | MEDIUM   |
| 2.08 | Unnecessary `useMemo` / `useCallback`                       | LOW      |
| 2.09 | Missing `useMemo` / `useCallback` (expensive ops)           | MEDIUM   |
| 2.10 | Context providers too high in tree                          | MEDIUM   |
| 2.11 | Prop drilling > 3 levels deep                               | MEDIUM   |
| 2.12 | Duplicated state logic across components                    | MEDIUM   |
| 2.13 | Boolean state machines (> 2 booleans for 1 flow)            | LOW      |
| 2.14 | Uncontrolled→controlled input warnings                      | HIGH     |
| 2.15 | Console statements in production code                       | LOW      |
| 2.16 | `any` / `unknown` type annotations                          | MEDIUM   |
| 2.17 | Non-null assertions (`!`) without justification             | MEDIUM   |
| 2.18 | Magic numbers and strings                                   | LOW      |
| 2.19 | Inconsistent error handling patterns                        | MEDIUM   |
| 2.20 | Dead imports                                                | LOW      |
| 2.21 | Overly complex conditionals (> 3 branches)                  | MEDIUM   |
| 2.22 | Nested ternaries                                            | LOW      |
| 2.23 | Functions > 50 LOC                                          | MEDIUM   |
| 2.24 | Files > 400 LOC                                             | MEDIUM   |
| 2.25 | Inline styles instead of className                          | LOW      |
| 2.26 | Hardcoded colors bypassing theme system                     | MEDIUM   |
| 2.27 | AI fingerprints in comments (comprehensive, leverage, etc.) | LOW      |
| 2.28 | Stale TODO/FIXME/HACK comments                              | LOW      |
| 2.29 | Inconsistent naming conventions                             | LOW      |
| 2.30 | Missing JSDoc on exported functions                         | INFO     |

---

## 5. Phase 3 — Correctness & Data Integrity

**Goal**: Find bugs, logic errors, and data inconsistencies.

### Checklist (20 items)

| #    | Check                                        | Severity |
| ---- | -------------------------------------------- | -------- |
| 3.01 | Division by zero potential                   | CRITICAL |
| 3.02 | Array index out of bounds                    | HIGH     |
| 3.03 | Null/undefined access without guard          | HIGH     |
| 3.04 | Type coercion bugs (`==` vs `===`)           | MEDIUM   |
| 3.05 | Race conditions in async operations          | HIGH     |
| 3.06 | Stale data after navigation                  | MEDIUM   |
| 3.07 | Hardcoded values that should be dynamic      | MEDIUM   |
| 3.08 | Date/time bugs (timezone, DST)               | MEDIUM   |
| 3.09 | Off-by-one errors in loops/slices            | MEDIUM   |
| 3.10 | Inconsistent data between config and display | MEDIUM   |
| 3.11 | Unused function parameters                   | LOW      |
| 3.12 | Return type mismatches                       | HIGH     |
| 3.13 | Promise chains without error handling        | HIGH     |
| 3.14 | Unreachable code after return/throw          | LOW      |
| 3.15 | Mutation of props or state directly          | HIGH     |
| 3.16 | Build-time vs runtime confusion              | MEDIUM   |
| 3.17 | Environment-dependent behavior not guarded   | MEDIUM   |
| 3.18 | Metadata/SEO data drift from content         | MEDIUM   |
| 3.19 | Structured data (`JSON-LD`) accuracy         | MEDIUM   |
| 3.20 | Sitemap completeness and accuracy            | MEDIUM   |

---

## 6. Phase 4 — Security

**Goal**: Identify security vulnerabilities and data exposure risks.

### Checklist (20 items)

| #    | Check                                              | Severity |
| ---- | -------------------------------------------------- | -------- |
| 4.01 | XSS via `dangerouslySetInnerHTML` or raw injection | CRITICAL |
| 4.02 | XSS via unescaped JSON-LD output                   | CRITICAL |
| 4.03 | PII hardcoded in source code                       | CRITICAL |
| 4.04 | Secrets/API keys in source or config               | CRITICAL |
| 4.05 | Missing `rel="noopener noreferrer"` on `_blank`    | LOW      |
| 4.06 | CSP headers present and correct                    | HIGH     |
| 4.07 | HSTS header present                                | HIGH     |
| 4.08 | X-Frame-Options or frame-ancestors set             | MEDIUM   |
| 4.09 | Error messages leaking stack traces                | HIGH     |
| 4.10 | Client-side data validation only                   | MEDIUM   |
| 4.11 | `eval()` or `new Function()` usage                 | CRITICAL |
| 4.12 | Dependency vulnerabilities (`npm audit`)           | HIGH     |
| 4.13 | Outdated dependencies with known CVEs              | HIGH     |
| 4.14 | CORS misconfiguration                              | HIGH     |
| 4.15 | Insecure cookie settings                           | MEDIUM   |
| 4.16 | Missing CSRF protection                            | HIGH     |
| 4.17 | File upload without validation                     | HIGH     |
| 4.18 | SQL/NoSQL injection vectors                        | CRITICAL |
| 4.19 | Authentication/authorization bypass                | CRITICAL |
| 4.20 | Sensitive data in client bundle                    | HIGH     |

> **Note**: For pure static sites with no user input, server, or database, items 4.10–4.19 are typically N/A.

---

## 7. Phase 5 — Testing & Quality Gates

**Goal**: Assess test coverage, test quality, and CI/CD reliability.

### Checklist (20 items)

| #    | Check                                          | Severity |
| ---- | ---------------------------------------------- | -------- |
| 5.01 | Test count vs source file ratio                | MEDIUM   |
| 5.02 | Coverage thresholds enforced in CI             | HIGH     |
| 5.03 | Tests verify behavior, not implementation      | HIGH     |
| 5.04 | Tests verify mocks instead of real components  | HIGH     |
| 5.05 | Placeholder/trivial tests (`1+1 = 2`)          | MEDIUM   |
| 5.06 | Duplicated test setup across files             | MEDIUM   |
| 5.07 | Missing tests for critical paths               | HIGH     |
| 5.08 | E2E tests for key user flows                   | MEDIUM   |
| 5.09 | Accessibility testing (axe-core, keyboard nav) | MEDIUM   |
| 5.10 | Visual regression testing                      | LOW      |
| 5.11 | Build passes in CI                             | HIGH     |
| 5.12 | Lint passes in CI                              | HIGH     |
| 5.13 | Type checking passes in CI                     | HIGH     |
| 5.14 | CI runs on pull requests                       | HIGH     |
| 5.15 | Security audit in CI                           | MEDIUM   |
| 5.16 | Performance budget (Lighthouse CI)             | MEDIUM   |
| 5.17 | Test environment matches production            | MEDIUM   |
| 5.18 | Flaky tests (pass/fail non-deterministically)  | HIGH     |
| 5.19 | Test data coupled to implementation details    | MEDIUM   |
| 5.20 | Missing error boundary tests                   | MEDIUM   |

---

## 8. Phase 6 — Ecosystem & Developer Experience

**Goal**: Audit dependencies, scripts, documentation, and DX.

### Checklist (20 items)

| #    | Check                                          | Severity |
| ---- | ---------------------------------------------- | -------- |
| 6.01 | Unused dependencies in `package.json`          | MEDIUM   |
| 6.02 | Oversized dependencies (> 1MB for minimal use) | HIGH     |
| 6.03 | Duplicate functionality across dependencies    | MEDIUM   |
| 6.04 | Missing `package-lock.json` or equivalent      | HIGH     |
| 6.05 | `npm install` vs `npm ci` in CI                | MEDIUM   |
| 6.06 | Dev dependencies in production bundle          | HIGH     |
| 6.07 | Scripts reference non-existent files           | MEDIUM   |
| 6.08 | README accuracy (versions, commands, features) | MEDIUM   |
| 6.09 | CONTRIBUTING guide present and accurate        | LOW      |
| 6.10 | License file present                           | LOW      |
| 6.11 | `.gitignore` covers build artifacts            | LOW      |
| 6.12 | Stale build artifacts checked into source      | MEDIUM   |
| 6.13 | Git hooks configured and functional            | MEDIUM   |
| 6.14 | Conventional commits enforced                  | LOW      |
| 6.15 | Dependabot or Renovate configured              | LOW      |
| 6.16 | Unnecessary config files                       | LOW      |
| 6.17 | Version pinning strategy consistent            | MEDIUM   |
| 6.18 | Overrides/resolutions documented               | LOW      |
| 6.19 | Environment variable documentation             | MEDIUM   |
| 6.20 | Development setup requires > 3 manual steps    | LOW      |

---

## 9. Performance & Bundle Audit

**Goal**: Identify performance bottlenecks, bundle bloat, and rendering issues.

### Checklist (25 items)

| #    | Check                                              | Severity |
| ---- | -------------------------------------------------- | -------- |
| 9.01 | Unnecessary `'use client'` directives              | MEDIUM   |
| 9.02 | Large client bundles (> 100KB per route)           | HIGH     |
| 9.03 | Heavy dependencies used minimally                  | HIGH     |
| 9.04 | Images not optimized (format, size, lazy loading)  | MEDIUM   |
| 9.05 | Missing `loading="lazy"` on below-fold images      | LOW      |
| 9.06 | Excessive re-renders (React DevTools profile)      | MEDIUM   |
| 9.07 | Timer frequency exceeds display precision          | MEDIUM   |
| 9.08 | Layout thrashing (read + write DOM in loop)        | HIGH     |
| 9.09 | Missing `will-change` for animated properties      | LOW      |
| 9.10 | CSS not code-split per route                       | MEDIUM   |
| 9.11 | Fonts not preloaded                                | MEDIUM   |
| 9.12 | Third-party scripts blocking render                | HIGH     |
| 9.13 | `content-visibility: auto` for long pages          | LOW      |
| 9.14 | Unnecessary JavaScript shipped to client           | HIGH     |
| 9.15 | Server components rendered as client unnecessarily | MEDIUM   |
| 9.16 | Missing `React.lazy` for heavy client components   | MEDIUM   |
| 9.17 | Bundle analyzer available as script                | LOW      |
| 9.18 | Tree-shaking effective (no side-effect imports)    | MEDIUM   |
| 9.19 | Unused CSS classes                                 | LOW      |
| 9.20 | Excessive DOM nodes (> 1500 per page)              | MEDIUM   |
| 9.21 | Animation library size vs usage ratio              | HIGH     |
| 9.22 | Inline `<script>` or `<style>` blocks              | LOW      |
| 9.23 | Missing `rel="preconnect"` for external origins    | LOW      |
| 9.24 | Service worker cache strategy appropriate          | MEDIUM   |
| 9.25 | Web Vitals (LCP, FID, CLS) within budget           | HIGH     |

---

## 10. Accessibility Audit

**Goal**: Verify WCAG 2.1 AA compliance and inclusive design.

### Checklist (20 items)

| #     | Check                                          | Severity |
| ----- | ---------------------------------------------- | -------- |
| 10.01 | All interactive elements keyboard-accessible   | HIGH     |
| 10.02 | Focus order logical and visible                | HIGH     |
| 10.03 | Skip navigation link present and functional    | MEDIUM   |
| 10.04 | `aria-live` regions for dynamic content        | HIGH     |
| 10.05 | Images have meaningful `alt` text              | MEDIUM   |
| 10.06 | Form inputs have associated labels             | HIGH     |
| 10.07 | Color contrast minimum 4.5:1 (AA)              | HIGH     |
| 10.08 | No color-only information conveyance           | MEDIUM   |
| 10.09 | Touch targets ≥ 44x44 CSS pixels               | MEDIUM   |
| 10.10 | Heading hierarchy sequential (h1→h2→h3)        | MEDIUM   |
| 10.11 | Tables have `<caption>` or `aria-label`        | MEDIUM   |
| 10.12 | ARIA roles, states, and properties correct     | HIGH     |
| 10.13 | No `tabIndex > 0` (WCAG anti-pattern)          | HIGH     |
| 10.14 | Screen reader route announcements              | HIGH     |
| 10.15 | Reduced motion preferences respected           | MEDIUM   |
| 10.16 | Language attribute set on `<html>`             | LOW      |
| 10.17 | Error messages accessible to screen readers    | MEDIUM   |
| 10.18 | Modal focus trapping implemented               | HIGH     |
| 10.19 | Custom components expose semantic roles        | MEDIUM   |
| 10.20 | Text resizable to 200% without loss of content | MEDIUM   |

---

## 11. Language-Specific Checks

### TypeScript / React / Next.js

| #    | Check                                              | Severity |
| ---- | -------------------------------------------------- | -------- |
| L.01 | `strict: true` in `tsconfig.json`                  | HIGH     |
| L.02 | `noUncheckedIndexedAccess` enabled                 | MEDIUM   |
| L.03 | No `as any` type assertions                        | MEDIUM   |
| L.04 | `satisfies` used for config objects                | LOW      |
| L.05 | Server vs client component boundary correct        | HIGH     |
| L.06 | `metadata` export only in server components        | HIGH     |
| L.07 | `generateStaticParams` for dynamic routes          | HIGH     |
| L.08 | `loading.tsx` for expensive pages                  | LOW      |
| L.09 | Radix UI used for complex interactive patterns     | MEDIUM   |
| L.10 | `cn()` utility for conditional classes             | LOW      |
| L.11 | Error boundaries use React error protocol          | HIGH     |
| L.12 | Keys in lists are stable and unique                | HIGH     |
| L.13 | Event handlers use `useCallback` when passed down  | LOW      |
| L.14 | Refs cleaned up in `useEffect` return              | HIGH     |
| L.15 | `useSyncExternalStore` for SSR-safe external state | MEDIUM   |

### CSS / Tailwind

| #    | Check                                    | Severity |
| ---- | ---------------------------------------- | -------- |
| L.16 | Theme tokens via CSS custom properties   | MEDIUM   |
| L.17 | No hardcoded colors outside theme system | MEDIUM   |
| L.18 | `darkMode` config matches theme provider | HIGH     |
| L.19 | Responsive breakpoints consistent        | MEDIUM   |
| L.20 | No duplicate utility classes             | LOW      |

---

## 12. Report Format

Every audit produces a structured report with the following sections.

### Header

```markdown
# Forensic Code Audit Report

| Field    | Value          |
| -------- | -------------- |
| Date     | YYYY-MM-DD     |
| Auditor  | [name/agent]   |
| Project  | [name]         |
| Commit   | [hash]         |
| Depth    | [level]        |
| Duration | [time]         |
| Findings | [N] total      |
| Resolved | [N] in-session |
```

### Finding Format

Each finding follows a consistent format:

```markdown
### F-NNN: [SEVERITY] [Category]: [Title]

**File**: `path/to/file.ext` (line NN)
**Check**: [Phase].[CheckNumber]
**Impact**: [Description of real-world impact]

**Evidence**:
[Code snippet or measurement showing the problem]

**Resolution**:
[What was done to fix it, OR recommendation if deferred]

**Status**: Resolved | Deferred | Won't Fix
```

### Severity Scale

| Level    | Meaning                                    | Action           |
| -------- | ------------------------------------------ | ---------------- |
| CRITICAL | Data loss, security breach, crashes        | Fix NOW          |
| HIGH     | Functional bugs, accessibility barriers    | Fix this session |
| MEDIUM   | Code smells, DRY violations, inconsistency | Fix if time      |
| LOW      | Style, minor DX issues, cosmetic           | Backlog          |
| INFO     | Observations, no action needed             | Document         |

### Dashboard

```
CRITICAL:  [N] ([N] open)
HIGH:      [N] ([N] open)
MEDIUM:    [N] ([N] open)
LOW:       [N] ([N] open)
INFO:      [N] ([N] open)
```

### Summary Table

```markdown
| ID    | Category | Severity | Title | Status |
| ----- | -------- | -------- | ----- | ------ |
| F-001 | ...      | ...      | ...   | ...    |
```

---

## 13. Sub-Agent Routing

For large codebases, distribute audit phases across sub-agents for parallelism.

### Delegation Strategy

| Agent         | Phases     | Focus                            |
| ------------- | ---------- | -------------------------------- |
| **Recon**     | Phase 0    | Project profile, metrics         |
| **Arch**      | Phase 1    | Structure, layering, dead code   |
| **Quality**   | Phase 2, 3 | Code smells, state, correctness  |
| **Security**  | Phase 4    | Vulnerabilities, data exposure   |
| **Testing**   | Phase 5    | Test quality, coverage, CI       |
| **Ecosystem** | Phase 6    | Dependencies, docs, DX           |
| **Perf**      | Phase 9    | Bundle, rendering, client/server |
| **A11y**      | Phase 10   | Accessibility, WCAG compliance   |

### Sub-Agent Prompt Template

```
You are a forensic code audit sub-agent. Your task:

Phase: [N] — [Name]
Project: [name] at [path]
Framework: [framework] [version]
Depth: [level]

Run through the Phase [N] checklist in .cockpit/SKILL.md.
For each check, report: PASS, FAIL (with finding), or N/A.

Return a structured list of findings in the standard format:
F-NNN: [SEVERITY] [Category]: [Title]
File: [path] (line NN)
Impact: [description]
Evidence: [code/measurement]
Recommendation: [fix]

Do NOT fix anything. Report only.
```

---

## 14. Cockpit Integration

After completing the audit, update the cockpit files:

| Cockpit File    | Updates Required                                |
| --------------- | ----------------------------------------------- |
| `INDEX.md`      | Health dashboard, findings count, quality gates |
| `ISSUES.md`     | New findings added to resolved/open tables      |
| `PMD.md`        | Metrics, tech stack, architecture observations  |
| `PACKAGING.md`  | Dependencies added/removed, build changes       |
| `STRUCTURE.md`  | New/deleted files, structural changes           |
| `HISTORY.md`    | New phase entry with date and summary           |
| `ROADMAP.md`    | Items completed or status changes               |
| `RELEASES.md`   | Changelog entries for fixes and improvements    |
| `GOVERNANCE.md` | New conventions or standard changes             |

### Update Sequence

1. Run the audit (Phases 0–6 + 9–10 as applicable)
2. Apply fixes for CRITICAL and HIGH findings
3. Re-run quality gates (`tsc`, `eslint`, `vitest`, `build`)
4. Update `ISSUES.md` with all findings
5. Update `INDEX.md` dashboard
6. Update `PMD.md` metrics
7. Update remaining cockpit files as needed
8. Commit with message: `audit: forensic code audit — [N] findings, [N] resolved`

---

## 15. Rules

1. **Never guess** — verify every finding with evidence (code, measurement, output).
2. **Never fabricate findings** — only report what is actually observed.
3. **Fix in priority order** — CRITICAL → HIGH → MEDIUM → LOW → INFO.
4. **Run quality gates after every batch of fixes** — never leave the codebase broken.
5. **Update the cockpit** — every audit must update the cockpit to reflect truth.
6. **Use finding IDs** — sequential, never reuse (`F-001`, `F-002`, ...).
7. **One finding per issue** — don't bundle unrelated problems.
8. **Include evidence** — code snippets, measurements, or tool output.
9. **Preserve existing findings** — append, never overwrite history.
10. **Be specific** — file paths, line numbers, exact values.
11. **Acknowledge N/A checks** — explicitly mark checks that don't apply and why.
12. **Time-box** — if a phase takes > 30 minutes, summarize progress and move on.

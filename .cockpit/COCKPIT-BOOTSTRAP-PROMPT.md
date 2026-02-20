# Cockpit Bootstrap Prompt

> **Purpose**: Copy the prompt below and paste it into a new LLM conversation for any project to build its own `.cockpit/` project intelligence system from scratch.
>
> **How to use**: Replace `{PLACEHOLDERS}` with your actual values. Remove this header section before pasting.

---

## The Prompt

````
You are an expert software architect and technical auditor. I need you to build a comprehensive project intelligence system called `.cockpit/` for my project. This is a structured documentation suite that serves as the single source of truth for any AI or human working on this codebase — providing instant context about architecture, quality status, open issues, history, and forward plans.

## Project Context

- **Project name**: {PROJECT_NAME}
- **Repository**: {REPO_URL}
- **Tech stack**: {e.g., Next.js 16, React 19, TypeScript 5, Tailwind CSS 3.4, Zod 4}
- **Deployment**: {e.g., GitHub Pages static export, Vercel, AWS}
- **Project type**: {e.g., academic portfolio, SaaS dashboard, e-commerce, CLI tool}
- **Current state**: {e.g., greenfield, mature, mid-development, needs refactoring}

## What to Build

Create a `.cockpit/` directory at the project root with the following documents. Read the ENTIRE codebase first, then produce each document with real, accurate data — never use placeholder content.

### 1. `INDEX.md` — Navigation Hub (Create First)

The entry point. Any AI or human opening `.cockpit/` reads this first.

Required sections:
- **Header**: Last updated date, project name, version, commit hash, tech stack summary (one line)
- **Quick Navigation Table**: Links to every cockpit document with a one-line purpose description
- **Health Dashboard**: Current status of all quality gates (typecheck, lint, tests, build, format) with pass/fail indicators
- **Findings Summary**: Counts by severity (CRITICAL/HIGH/MEDIUM/LOW/INFO) with open vs resolved
- **Next Phase**: What should be worked on next (link to ROADMAP.md)
- **Project Vitals Table**: Source file count, LOC, component count (client vs server if applicable), data files, config files, test files, test count, pages/routes
- **Architecture Summary**: LOC distribution across layers with ASCII bar chart

### 2. `PMD.md` — Project Master Document

The deep technical reference. Captures everything an engineer needs to understand the project.

Required sections:
- **Mission**: One paragraph describing the project's purpose
- **Tech Stack Table**: Every major dependency with version and purpose
- **Architecture Diagram**: ASCII diagram showing the layer/module structure with LOC counts and responsibilities. Identify the actual architectural pattern used (layered, feature-sliced, module-based, etc.)
- **Key Patterns**: Numbered list of the project's core design patterns with one-line explanations (e.g., "Static Export", "Schema-first types", "Import-time validation", "Tiered data model")
- **Metrics Table**: Quantified project stats
- **Largest Files Table**: Top 8 files by LOC with purpose
- **LOC Distribution**: By layer/module with percentages and ASCII bar chart
- **Feature Modules Table**: Each module with file count and purpose
- **Pages/Routes Table**: Every route with type (static/SSR/SSG/redirect) and purpose
- **Quality Status Table**: Pass/fail for each quality gate
- **Architecture Observations**: Split into "Strengths" (what's done well) and "Gaps Identified" (what needs improvement, categorized)
- **ADR Index**: Table of Architecture Decision Records if any exist
- **Concerns**: Bullet list of architectural risks or things to watch

### 3. `ISSUES.md` — Finding Tracker

The central issue registry. Every code quality issue, bug, inconsistency, or improvement opportunity gets tracked here with a unique ID.

Required structure:

```markdown
# ISSUES.md — Finding Tracker

> **Last Audit**: {DATE} | **Auditor**: {SESSION_NAME}
> **Total Findings**: {N} | **Resolved**: {N} | **Open**: {N}

## Dashboard
{Counts by severity with open counts}

## Quality Gates Status
{Current typecheck/lint/test/build status}

## Open Findings

### CRITICAL
{Findings that cause runtime crashes, data corruption, security vulnerabilities, or PII exposure}

### HIGH
{Findings that cause incorrect behavior, broken features, or significant UX/a11y issues}

### MEDIUM
{Architecture violations, DRY violations, type safety gaps, consistency issues}

### LOW
{Code style, minor improvements, deprecated APIs, dead code}

### INFO
{Notes, observations, intentional trade-offs worth documenting}

## Resolved Findings
{Table of resolved findings with ID, category, severity, title, and resolution}
````

Finding format:

```markdown
#### F-{NNN} — {CATEGORY}: {Short Title}

- **Category**: {e.g., Architecture, Accessibility, Data, Testing, Security, DRY, Theme, Deprecated API} | **Severity**: {CRITICAL/HIGH/MEDIUM/LOW/INFO}
- **File(s)**: `{path}`
- **Issue**: {Clear description of what's wrong and why it matters}
- **Fix**: {Concrete, actionable fix recommendation}
```

Audit methodology — check every file for:

- Runtime errors, edge cases, division-by-zero, null access
- Security issues (PII in source, XSS, injection)
- Accessibility (keyboard nav, ARIA, screen reader support, color contrast)
- Type safety (any types, unsafe casts, schema bypasses)
- DRY violations (duplicated code, near-identical files)
- Dead code (unused exports, unreachable code paths, deprecated fields)
- Consistency (naming, patterns, icon systems, color usage)
- Data staleness (hardcoded values that should be computed or data-driven)
- Missing directives ('use client' on components using hooks/browser APIs)
- Test coverage gaps (untested features, tests that verify mocks not components)
- Deprecated APIs
- Performance (unnecessary re-renders, missing memoization, large bundles)
- SEO (missing meta tags, structured data errors)

### 4. `STRUCTURE.md` — Annotated File Tree

An annotated directory tree showing every directory and key file with:

- LOC count for each file
- One-line responsibility description
- Layer/module membership
- Whether it's a client or server component (for React/Next.js)

Format:

```
src/
  app/                          # App Layer — Page routes (2,155 LOC, 15%)
    layout.tsx           (85)   # Root layout — metadata, providers, sidebar  [SERVER]
    page.tsx             (45)   # Homepage — renders home feature components  [SERVER]
    about/
      page.tsx          (120)   # About page — quickFacts, awards, skills     [SERVER]
      error.tsx          (32)   # Error boundary                              [CLIENT]
```

### 5. `HISTORY.md` — Development Timeline

Reconstruct the project's development history from git commits. Organize into logical phases:

- Phase name and description
- Key commits (hash + message)
- What was built/changed in each phase
- Tags and milestones

Use `git log --oneline` and group commits into coherent development phases.

### 6. `GOVERNANCE.md` — Code Standards & Conventions

Document the project's actual conventions (observed from code, not aspirational):

- Language/framework style rules (TypeScript strictness, React patterns, CSS approach)
- Naming conventions table (components, files, hooks, constants, types, etc.)
- Import ordering rules
- Git conventions (branch strategy, commit format, PR process)
- Review checklist
- File organization rules (what goes where)

### 7. `PACKAGING.md` — Dependencies, Build & Deployment

- Runtime dependencies table (package, version, purpose)
- Dev dependencies table
- Build pipeline (scripts from package.json explained)
- Deployment process
- Environment variables
- Engine requirements (Node version, etc.)
- Override/resolution explanations

### 8. `RELEASES.md` — Version History

- Current version
- Changelog organized by version/tag
- What changed in each release
- Breaking changes noted

### 9. `PUBLICATION.md` — Deployment & Hosting

- Where and how the project is deployed
- Domain/URL configuration
- CDN, DNS, SSL details
- CI/CD workflow descriptions
- Monitoring and alerting setup (or lack thereof)

### 10. `ROADMAP.md` — Improvement Plan

Based on your audit findings, create a phased improvement plan:

```markdown
## Phase N: {Phase Name} ({Priority Level})

{One-line description of this phase's goal}

| #   | Item              | Finding | Severity   | Complexity         |
| --- | ----------------- | ------- | ---------- | ------------------ |
| N.1 | **{Action item}** | F-{NNN} | {SEVERITY} | EASY/MODERATE/HARD |
```

Organize phases by priority:

1. **CRITICAL fixes first** — runtime crashes, security, PII
2. **HIGH code quality** — broken features, missing directives, a11y blockers
3. **Architecture cleanup** — DRY violations, layer violations, dead code
4. **Quick wins** — SEO, security headers, monitoring
5. **New features** — planned enhancements
6. **Modern web** — performance, PWA, modern APIs
7. **Testing** — coverage expansion, E2E, a11y testing
8. **Content** — new pages, blog, etc.
9. **Monitoring** — error tracking, analytics, dashboards

End with a summary table showing phase, item count, complexity, and estimated sessions.

### 11. `adr/` — Architecture Decision Records

Create an `adr/` subdirectory with:

- `TEMPLATE.md` — ADR template for future decisions
- One ADR for each major architectural decision observed in the codebase

ADR format:

```markdown
# ADR-{NNN}: {Title}

**Status**: Accepted | Proposed | Deprecated
**Date**: {DATE}
**Context**: {Why this decision was needed}
**Decision**: {What was decided}
**Consequences**: {Trade-offs and implications}
```

## Execution Instructions

1. **Read first, write second**: Read EVERY file in the codebase before writing any cockpit document. Use tools to search, list directories, and read files systematically — layer by layer, module by module.

2. **Validate**: Run typecheck, lint, and tests before writing findings. Record actual pass/fail status.

3. **Be precise**: Use real file paths, real LOC counts, real commit hashes. Never estimate or guess — count and verify.

4. **Be exhaustive on ISSUES.md**: This is the most valuable document. Check every single file. A shallow audit misses the critical findings. Look for subtle issues: edge cases, deprecated APIs, schema mismatches, accessibility gaps, theme inconsistencies, data that can go stale.

5. **Number findings sequentially**: Start at F-001. Never reuse an ID. Resolved findings keep their ID and move to the resolved table.

6. **Cross-reference**: ROADMAP items should reference finding IDs. INDEX.md should reference all other documents. PMD.md should link to ISSUES.md and ROADMAP.md.

7. **Use real data only**: Every metric, every finding, every file path must come from actually reading the code. If you're unsure about something, read the file again.

8. **Create all files in one session**: Build the complete cockpit. Don't leave documents as "TODO" — fill them all with real content from the codebase analysis.

## Output

Create all files under `.cockpit/` at the project root. Start with INDEX.md, then PMD.md, then ISSUES.md (the most critical), then the remaining documents in any order. End with ROADMAP.md (which depends on ISSUES.md findings).

After creating all files, provide a summary of:

- Total files created
- Total findings discovered (by severity)
- Top 3 most critical issues
- Recommended immediate actions

```

---

## Tips for Best Results

1. **Large codebases**: If the project has 200+ files, tell the LLM to use subagents or batch its file reading by module/directory to avoid context overflow.

2. **Monorepos**: Add a note specifying which package/workspace to audit. The cockpit should live at the package root, not the monorepo root.

3. **Existing documentation**: If the project already has docs (README, CONTRIBUTING, etc.), tell the LLM to read those too and cross-reference — don't duplicate, link.

4. **Follow-up sessions**: After the initial cockpit build, use this prompt for maintenance:
```

Read the existing .cockpit/ directory, then audit the codebase for any changes since
the last audit ({DATE}). Update ISSUES.md with new findings, sync INDEX.md and PMD.md
counts, and update ROADMAP.md if priorities changed.

```

5. **Customization**: Remove documents that don't apply to your project type. A CLI tool probably doesn't need PUBLICATION.md. A library doesn't need a ROADMAP for "pages/routes". Adapt the template to your context.
```

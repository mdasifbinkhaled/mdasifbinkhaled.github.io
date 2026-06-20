# DESIGN.md — Visual design contract

The visual source of truth for this academic portfolio. **Any agent or person generating/modifying UI must follow this.** It complements `CLAUDE.md` (behavior/architecture); this file governs _how things look_.

> **Honest scope (evidence-based):** a design doc is a high-leverage _constraint layer_, not magic — it's probabilistic, not deterministic, and most valuable because it documents the semantic tokens already in code so the agent stops inventing values. It does **not** replace the real gates: the 6-theme WCAG E2E suite, typecheck, and visual review. Keep it in sync with `src/styles/tokens.css` or it becomes false confidence. ("Foolproof website" is marketing; this is disciplined defaults.)

## 1. Voice & atmosphere

Academic editorial: calm, credible, precise — closer to a well-set university-press page than a SaaS landing page. Generous whitespace, restrained color, typography that earns trust. Impressions to aim for: **legible, considered, unhurried.** Not flashy or busy. A restrained `primary→primary/70` gradient on a page's **hero `h1`** is the one sanctioned flourish (used sparingly — never on section headings or body); everything below the hero stays calm.

## 2. Color — tokens & roles

**All color is HSL CSS custom properties in `src/styles/tokens.css`, exposed as Tailwind utilities via `@theme` in `src/app/globals.css`. Use the utilities. NEVER hardcode hex/rgb or raw Tailwind palette colors (`bg-gray-50`, `text-zinc-700`, `bg-indigo-500`).** Merge classes with `cn()` (`@/shared/lib/utils`).

| Utility                                  | Role                                                                                                                                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bg-background` / `text-foreground`      | Page canvas + primary text                                                                                                                                                                          |
| `bg-card` / `text-card-foreground`       | Elevated surfaces (cards, panels)                                                                                                                                                                   |
| `bg-popover` / `text-popover-foreground` | Overlays (dropdowns, command palette, tooltips)                                                                                                                                                     |
| `bg-muted` / `text-muted-foreground`     | Subdued surfaces + secondary text (dates, captions, meta)                                                                                                                                           |
| `bg-primary` / `text-primary-foreground` | The one brand/interactive accent: links, primary buttons, active nav, focus ring, "now/active" highlights                                                                                           |
| `bg-secondary`, `bg-accent`              | Subtle fills / hover surfaces (not decorative color)                                                                                                                                                |
| `border-border`, `bg-input`, `ring-ring` | Borders/dividers, inputs, focus rings                                                                                                                                                               |
| `bg-success` + `text-success-emphasis`   | Positive / active / live. **Fill** = `bg-success` (with `text-success-foreground`); **small status text/icons on a tint** = `text-success-emphasis` (the mid-tone `text-success` fails AA as text). |
| `bg-warning` + `text-warning-emphasis`   | Attention / time-sensitive (amber). Same rule: `bg-warning` fills, `text-warning-emphasis` for text.                                                                                                |
| `text-destructive` / `bg-destructive`    | Errors only. `--destructive` is tuned AA both as text and as a fill (white foreground), so no separate emphasis token is needed.                                                                    |
| `hsl(var(--academic-highlight))`         | Subtle primary-tinted highlight (e.g. current-week row). CSS var, used via arbitrary value.                                                                                                         |

**Themes:** 6 runtime themes — `light` (default), `dark`, `ocean`, `forest`, `lavender`, `slate` — set via `data-theme` on `<html>` (`dark` also via the `@custom-variant dark`). Each theme only redefines token _values_; component structure never changes between themes. **Every color decision must hold in all 6 themes + dark** — which is why you use tokens, never literals. Semantic tokens (`success`/`warning`/`info`/`destructive`) stay constant across themes by design.

**Prohibited:** indigo/purple/blue-`500` literals; pure `#000`/`#fff`; any raw palette color in components. _(Gradient text (`bg-clip-text` from `primary`) is permitted on page hero `h1`s only — see §3 — never on section headings or body.)_

## 3. Typography

- **Sans:** Inter, via `--font-sans` (`font-sans`). The default for everything.
- **Mono:** IBM Plex Mono, via `--font-mono` (`font-mono`). For tracked numeric/technical labels only — course codes, week/section numbers, times, percentages, dates, badges (introduced with the course-page redesign). Not for prose. _(This supersedes the earlier "serif planned" note — the course redesign uses Inter + IBM Plex Mono, no serif.)_
- **Scale:** lean on Tailwind's scale. **Section titles are one canonical style — `text-2xl font-semibold tracking-tight text-foreground`** (not `font-bold`, not tinted `text-primary`, no gradient). Body `text-base` (line-height ~1.6); meta/caption `text-sm`/`text-xs` `text-muted-foreground`. Page **hero `h1`**s run larger (`text-3xl`–`text-fluid-heading`, `font-bold`) and may use the sanctioned `primary→primary/70` gradient. (Course pages run a bolder display scale — see §11.)
- **Prose width:** constrain long-form text (publications, about, blog) to ~`max-w-prose` (~65–72ch). Never full-width prose on wide screens.
- **Prohibited:** gradient text on **section headings or body** (hero `h1`s only); all-caps body; font-size below 14px for body; letter-spacing on body (caps labels only).

## 4. Spacing & layout

- **8px base grid** (Tailwind default units; use even multiples). Generous vertical rhythm: large gaps between sections, comfortable padding inside cards.
- **Shell:** fixed left **profile sidebar** + top nav + content column (see `app-sidebar-layout`). Content max-width is constrained and centered; don't let content run full-bleed on large screens. **Exception:** course detail pages hide the profile sidebar and run the full-width "Command Center" layout (top nav retained) — see §11.
- **Patterns in use:** single-column prose; bordered card grids; (planned) scrollspy sub-nav on course pages. **Avoid** a 3-column symmetric icon-card grid as a hero/feature block (the #1 generic-AI tell).

## 5. Components

- **Buttons:** shadcn/`cva` variants. Primary = `bg-primary text-primary-foreground`; ghost/outline use `border-border`/`bg-accent` on hover. Keep radius modest (the project's `--radius`); no `rounded-full` except avatars/tag pills.
- **Cards:** `bg-card border border-border rounded-[--radius]` with a _subtle_ shadow at most. Prefer border + slight surface contrast for elevation over heavy shadows.
- **Links:** `text-primary`, hover underline (`underline-offset`). External links **must** include `target="_blank" rel="noopener noreferrer"`.
- **Badges/tags:** neutral (`bg-muted text-muted-foreground`) unless conveying state (then `success`/`warning`).
- **Navigation:** top nav active item uses `text-primary`; the left sidebar shows identity/contact/social. (Both exist — don't remove them.)
- Keep any component file **under ~300 LOC**; extract a `use-*` hook + `*.utils.ts` + sub-components (see `seat-planner/`, `study-timer/`).

## 6. Depth & motion

- **Elevation:** border + subtle background/shadow at rest. `shadow-lg`/`shadow-xl` (and a small `hover:scale`/`-translate-y`) are allowed as a **hover/interactive** affordance on cards and on hero/feature surfaces; static resting content stays subtle. No stacked shadows; no `text-shadow`.
- **Motion:** subtle, purposeful (`transition-colors`, small opacity/translate). All animation must respect `prefers-reduced-motion` (already globally handled in `tokens.css`). No parallax, autoplay loops, or load-time hero animations.

## 7. Accessibility (enforced)

- **WCAG 2.x AA** is gated by the Playwright axe + theme-contrast E2E suite across all 6 themes — keep it green.
- Visible `focus-visible` ring (`ring-ring`) on every interactive element.
- Strict heading hierarchy (one `h1`/page); semantic HTML; `alt` text; color never the _sole_ signal (pair with text/icon).
- **CSP:** strict inline CSP (no `unsafe-eval`/inline scripts) — don't introduce violations.

## 8. Do / Don't (the high-signal guardrails)

**Do:** semantic tokens only · `cn()` for class merging · constrain prose width · `focus-visible` rings · `rel="noopener noreferrer"` on `_blank` · keep components <300 LOC · verify in light **and** dark before claiming done.

**Don't:** `bg-indigo-*`/`bg-purple-*`/raw `bg-gray-*` · gradient text on section headings or body (hero `h1`s only) · `font-bold`/`text-primary` on section headings (use the canonical §3 style) · stacked shadows · 3-column icon-card hero · `rounded-2xl` on cards · new deps/animation libs without asking · hardcoded hex/HSL in components. _(Course pages carry a few scoped exceptions — see §11.)_

## 9. Content voice

First-person, precise, unembellished. Specific over vague ("Principal Investigator, VCRF 2024–25" not "extensive grant experience"). Avoid marketing words ("world-class", "cutting-edge", "passionate", "leverage"). Keep self-reported stats **consistent across pages** (grants, publications, students — single source of truth in `src/shared/lib/data/`).

## 10. Using this file with an agent

- It's referenced from `CLAUDE.md`, so Claude Code loads it at session start. For a UI task, re-anchor: _"Follow DESIGN.md — tokens only, no prohibited patterns."_
- **Drift check (periodic):** `grep -rnE "bg-(gray|zinc|slate|indigo|purple)-[0-9]|text-(gray|zinc|slate)-[0-9]|#[0-9a-fA-F]{3,6}" src` should return ~nothing in components.
- **Keep in sync:** when `tokens.css`, the font setup, or a recurring component pattern changes, update this file in the same commit. A stale DESIGN.md is worse than none.

## 11. Course pages ("Command Center")

Course **detail** pages are a deliberately distinct, full-width "publication" surface (see `src/features/teaching/components/course-page/`). They follow §1–§9 (semantic tokens only, the 6-theme + a11y gates, content voice) **with these scoped exceptions** — intentional, confined to `.cp` in `course-page.css`, and **not** propagated to the rest of the site unless explicitly decided:

- **Layout:** full-width (max ~1180px, centered), profile sidebar hidden, top nav retained (`app-sidebar-layout` switches on the route).
- **Cards:** `--radius-xl` (12px) rather than the default 8px.
- **Display headings:** bolder — hero ~800, section titles 700 (vs the site default `font-semibold`/600).
- **Mono:** IBM Plex Mono for tracked numerals/labels (codes, weeks, times, %, dates, badges).
- **Caps labels:** two 10px uppercase families — structural (600/0.07em, muted) and status badges (700/0.06em, colored).
- **The "This Week" band:** the one element allowed a deeper soft shadow and a brand-tinted gradient surface (a `color-mix` of the active theme's `--primary`); its on-dark foregrounds are intentional `hsl(210 40% 96% / a)` literals (the band is always dark in every theme).
- **Scale tokens** (`--radius-xl/full`, shadow/duration/ease) are defined locally on `.cp`, not globally.

Everything else — the teaching index and all non-course pages — stays on the §1–§9 defaults.

---

_Last synced: 2026-06-17 (section headings converged to one canonical style §3; gradient text + hover shadows reconciled to shipped reality — permitted on hero `h1`s / interactive surfaces, §1–§2 / §6 / §8; tokens: 6 themes in `src/styles/tokens.css`; fonts: Inter sans + IBM Plex Mono; course pages: full-width "Command Center", see §11)._

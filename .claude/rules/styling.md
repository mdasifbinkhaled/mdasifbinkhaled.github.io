---
paths:
  - 'src/**/*.tsx'
  - 'src/styles/**'
---

# Styling / theming rules

- Use theme tokens ONLY (`bg-background`, `text-foreground`, `text-primary`, `border-border`, …). Never hardcode colors (`bg-gray-50`, `text-zinc-700`, hex).
- Merge/condition classes with `cn()` from `@/shared/lib/utils`.
- 6 themes are defined via CSS custom properties; new colors must be tokens, not literals.
- Dark mode is `[data-theme="dark"]` driven — don't add `dark:` ad-hoc unless matching existing usage.

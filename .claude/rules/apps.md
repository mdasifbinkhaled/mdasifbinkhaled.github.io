---
paths:
  - 'src/features/apps/**'
---

# Student-app module structure

- Follow the `seat-planner/` pattern: `use-<name>.ts` (state/effects) + `<name>.utils.ts` (pure logic) + focused sub-components, each in its own file.
- Keep any single component file under ~300 LOC. If it grows past that, extract a sub-component or a hook.
- These apps are browser-local (no backend). Heavy work (PDF/CSV/XLSX) uses the already-installed libs (`jspdf`, `pdfjs-dist`, `papaparse`, `read-excel-file`, `html2canvas-pro`) — do not add new ones.
- Preserve public exports in each app's `index.ts` barrel when refactoring.

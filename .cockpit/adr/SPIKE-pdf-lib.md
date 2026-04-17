# SPIKE: Migrating from jsPDF to pdf-lib

> **Date**: 2026-04-17
> **Context**: Resolving security finding F-264 (transitive `dompurify` vulnerability via `jspdf`).
> **Status**: **Spike Complete — Migration Deferred**

## Executive Summary

The project currently uses `jspdf` and `jspdf-autotable` to generate the Seat Planner PDF and CV export. `jspdf` carries a known transitive vulnerability (`dompurify@3.3.1`) that lacks an upstream fix. This spike evaluates migrating to `pdf-lib`, a modern, secure alternative that does not rely on DOM parsing or canvas elements, thereby eliminating the `dompurify` dependency.

**Conclusion**: Migrating to `pdf-lib` is feasible but requires **significant engineering effort**. `pdf-lib` is a low-level library with no native table generation equivalent to `jspdf-autotable`. We must build a custom table layout engine from scratch. Given the low exploitability of the current vulnerability (static export + strict CSP), the migration is **deferred** unless the F-264 advisory escalates to CRITICAL.

## Vulnerability Context (F-264)

- **Vector**: `jspdf` uses `dompurify` to sanitize HTML when rendering HTML-to-canvas or parsing DOM nodes.
- **Mitigation**: Our project operates in a highly restricted environment:
  - Strict Content Security Policy (CSP) with `unsafe-eval` banned.
  - Fully static export (`output: export`) with no backend.
  - Client-side execution only.
- **Risk Assessment**: LOW. The vulnerability requires user-controlled HTML to be passed into the PDF generator and executed in a context that bypasses the CSP.

## Migration Requirements

To replace `jspdf` + `jspdf-autotable` with `pdf-lib`, we must reimplement the following features in `src/features/apps/components/seat-planner/pdf-export.ts`:

1.  **Text Layout**: `pdf-lib` requires precise `(x, y)` coordinates for text placement.
2.  **Table Rendering Engine**: We must build a custom abstraction to draw rows, columns, borders, and alternating row background colors.
3.  **Pagination**: `pdf-lib` does not automatically wrap text or paginate tables. We must manually calculate page heights and split arrays across new pages.
4.  **Font Embedding**: Standard Helvetica is supported, but custom fonts or Unicode (e.g., Bengali support) require manual embedding of `.ttf` or `.otf` assets.

## Implementation Blueprint (Custom Table Engine)

If the migration is triggered, the implementation must follow this blueprint:

```typescript
// Conceptual pdf-lib table generator
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateMasterListPDF(
  students: Student[],
  details: ExamDetails
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 Size

  const drawRow = (y: number, data: string[], isHeader = false) => {
    // 1. Draw background rectangle if header or alternate row
    // 2. Draw border lines
    // 3. Draw text using font.widthOfTextAtSize() to center/align
  };

  // Manual pagination loop
  let currentY = 800; // Start near top
  for (const student of students) {
    if (currentY < 50) {
      page = pdfDoc.addPage();
      currentY = 800;
      drawRow(currentY, ['SL', 'ID', 'Name', 'Section', 'Room'], true); // Redraw header
      currentY -= 20;
    }
    drawRow(currentY, [
      /* student data */
    ]);
    currentY -= 20;
  }

  return await pdfDoc.save();
}
```

## Level of Effort & Trade-offs

- **Engineering Cost**: ~15–20 hours to rebuild and test the Seat Planner PDF generation with a custom table layout engine.
- **Bundle Size**: `pdf-lib` is slightly larger than `jspdf` but tree-shakes well.
- **Security**: Completely neutralizes F-264 by removing `dompurify`.
- **Maintenance**: High. Maintaining a custom table engine is brittle compared to relying on `jspdf-autotable`.

## Final Recommendation

**Do not migrate at this time.** The engineering cost far outweighs the security benefit given the project's architecture (static site, strict CSP).

**Next Steps**:

1. Maintain the quarterly review of F-264.
2. Monitor the `jspdf` GitHub repository for a v3.0 release or an upstream patch to `dompurify`.
3. Keep this SPIKE document as a blueprint in case an immediate migration becomes mandatory.

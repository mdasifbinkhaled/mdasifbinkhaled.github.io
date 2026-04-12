// Type augmentation for jspdf-autotable runtime properties.
// jspdf-autotable attaches `lastAutoTable` to jsPDF instances at runtime
// but does not ship type declarations for it.

import 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: {
      finalY?: number;
    };
  }
}

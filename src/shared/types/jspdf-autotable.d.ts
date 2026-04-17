// Module augmentation for jspdf-autotable.
// The plugin attaches `lastAutoTable` to the jsPDF document instance at runtime,
// but the shipped types don't expose it on the jsPDF interface.
import 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

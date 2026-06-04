// ────────────────────────────────────────────────
// Seat Planner — Result Actions (export / print)
// ────────────────────────────────────────────────

import {
  Download,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Printer,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export function ResultActions({
  isExporting,
  onExportPDF,
  onExportCSV,
  onExportPNG,
  onPrint,
}: {
  isExporting: boolean;
  onExportPDF: (type: 'master' | 'rooms' | 'combined') => void;
  onExportCSV: () => void;
  onExportPNG: () => void;
  onPrint: () => void;
}) {
  return (
    <div className="rounded-2xl border bg-muted/10 p-4">
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Export and Print
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep the primary document export prominent, and group the secondary
          outputs nearby.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        <Button
          onClick={() => onExportPDF('combined')}
          disabled={isExporting}
          className="justify-start"
        >
          <FileText className="mr-2 h-4 w-4" />
          Combined PDF
        </Button>
        <Button onClick={onPrint} variant="secondary" className="justify-start">
          <Printer className="mr-2 h-4 w-4" />
          Print A4
        </Button>
        <Button
          onClick={() => onExportPDF('master')}
          disabled={isExporting}
          variant="outline"
          className="justify-start"
        >
          <Download className="mr-2 h-4 w-4" />
          Master PDF
        </Button>
        <Button
          onClick={() => onExportPDF('rooms')}
          disabled={isExporting}
          variant="outline"
          className="justify-start"
        >
          <Download className="mr-2 h-4 w-4" />
          Room Sheets PDF
        </Button>
        <Button
          onClick={onExportCSV}
          disabled={isExporting}
          variant="outline"
          className="justify-start"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          CSV
        </Button>
        <Button
          onClick={onExportPNG}
          disabled={isExporting}
          variant="outline"
          className="justify-start"
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          PNG Snapshot
        </Button>
      </div>
    </div>
  );
}

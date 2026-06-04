'use client';

import { TabsContent } from '@/shared/components/ui/tabs';
import { Button } from '@/shared/components/ui/button';

interface PastePanelProps {
  pasted: string;
  setPasted: (value: string) => void;
  handlePasteParse: () => void;
  pastePlaceholder?: string;
}

export function PastePanel({
  pasted,
  setPasted,
  handlePasteParse,
  pastePlaceholder,
}: PastePanelProps) {
  return (
    <TabsContent value="paste" className="mt-3 space-y-2">
      <textarea
        value={pasted}
        onChange={(e) => setPasted(e.target.value)}
        onBlur={handlePasteParse}
        placeholder={
          pastePlaceholder ?? 'Paste CSV, TSV, or spreadsheet text here…'
        }
        rows={7}
        className="w-full rounded-xl border bg-background p-3 font-mono text-xs leading-relaxed focus:border-ring focus:outline-none"
        spellCheck={false}
      />
      <div className="flex justify-end">
        <Button size="sm" variant="outline" onClick={handlePasteParse}>
          Parse
        </Button>
      </div>
    </TabsContent>
  );
}

'use client';

import type { RefObject } from 'react';
import { FileUp, Loader2 } from 'lucide-react';
import { TabsContent } from '@/shared/components/ui/tabs';
import type { TabularData } from '@/shared/lib/parsers/types';

interface UploadPanelProps {
  loading: boolean;
  allowMultiple: boolean;
  accept: string;
  tabular: TabularData | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadPanel({
  loading,
  allowMultiple,
  accept,
  tabular,
  fileInputRef,
  handleFileChange,
}: UploadPanelProps) {
  return (
    <TabsContent value="upload" className="mt-3">
      <label
        htmlFor="data-importer-file"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-9 text-center transition hover:bg-accent/30"
      >
        {loading ? (
          <Loader2
            className="mb-2 h-6 w-6 animate-spin text-muted-foreground"
            aria-hidden
          />
        ) : (
          <FileUp className="mb-2 h-6 w-6 text-muted-foreground" aria-hidden />
        )}
        <span className="text-sm font-medium">
          {loading
            ? 'Parsing…'
            : allowMultiple
              ? 'Click to choose one or more files'
              : 'Click to choose a file'}
        </span>
        <span className="mt-1 text-xs text-muted-foreground">
          Accepts {accept.replace(/\./g, '').replace(/,/g, ', ')}
          {allowMultiple ? ' · multi-file upload enabled' : ''}
        </span>
        {tabular?.source ? (
          <span className="mt-2 max-w-full truncate text-[11px] text-muted-foreground">
            Parsed from {tabular.source}
          </span>
        ) : null}
        <input
          id="data-importer-file"
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={allowMultiple}
          onChange={handleFileChange}
          disabled={loading}
          className="sr-only"
        />
      </label>
    </TabsContent>
  );
}

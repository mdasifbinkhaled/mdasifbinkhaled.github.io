'use client';

import { Download, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu';

export type ExportHandlerKey =
  | 'copy'
  | 'csv'
  | 'tsv'
  | 'json'
  | 'pdf'
  | 'png'
  | 'print'
  | 'ics';

type Handler = () => void | Promise<void>;

export interface ExportBarProps {
  /**
   * Dictionary of export handlers. Each entry that is present renders a
   * menu item; missing entries are omitted. Handlers may be sync or async.
   */
  handlers: Partial<Record<ExportHandlerKey, Handler>>;
  /** Disable the whole trigger (e.g. no data to export). */
  disabled?: boolean;
  /** Button label shown on the trigger. Defaults to "Export". */
  label?: string;
  /** Render as compact icon-only button. Label still read by screen readers. */
  compact?: boolean;
  className?: string;
}

const LABELS: Record<
  ExportHandlerKey,
  { text: string; group: 'copy' | 'file' | 'other' }
> = {
  copy: { text: 'Copy to clipboard', group: 'copy' },
  csv: { text: 'Download CSV', group: 'file' },
  tsv: { text: 'Download TSV', group: 'file' },
  json: { text: 'Download JSON', group: 'file' },
  pdf: { text: 'Download PDF', group: 'file' },
  png: { text: 'Download PNG', group: 'file' },
  ics: { text: 'Download .ics', group: 'file' },
  print: { text: 'Print', group: 'other' },
};

/**
 * A consistent export affordance used by every tool. Renders a dropdown
 * menu with only the actions the tool supports. Menu items are grouped
 * (clipboard → files → other) and the menu omits separators when a group
 * is empty.
 */
export function ExportBar({
  handlers,
  disabled = false,
  label = 'Export',
  compact = false,
  className,
}: ExportBarProps) {
  const keys = (Object.keys(handlers) as ExportHandlerKey[]).filter(
    (k) => typeof handlers[k] === 'function'
  );
  if (keys.length === 0) return null;

  const groups: Record<'copy' | 'file' | 'other', ExportHandlerKey[]> = {
    copy: [],
    file: [],
    other: [],
  };
  for (const k of keys) groups[LABELS[k].group].push(k);

  const renderGroup = (keys: ExportHandlerKey[]) =>
    keys.map((k) => (
      <DropdownMenuItem
        key={k}
        onSelect={() => {
          const h = handlers[k];
          if (h) void h();
        }}
      >
        {LABELS[k].text}
      </DropdownMenuItem>
    ));

  const groupsOrdered: ExportHandlerKey[][] = [
    groups.copy,
    groups.file,
    groups.other,
  ].filter((g) => g.length > 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={compact ? 'icon' : 'sm'}
          disabled={disabled || keys.length === 0}
          className={className}
          aria-label={label}
        >
          <Download className="h-4 w-4" aria-hidden />
          {compact ? (
            <span className="sr-only">{label}</span>
          ) : (
            <>
              <span className="ml-1.5">{label}</span>
              <ChevronDown
                className="ml-1 h-3.5 w-3.5 opacity-60"
                aria-hidden
              />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[12rem]">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {groupsOrdered.map((group, idx) => (
          <div key={idx}>
            {idx > 0 ? <DropdownMenuSeparator /> : null}
            {renderGroup(group)}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

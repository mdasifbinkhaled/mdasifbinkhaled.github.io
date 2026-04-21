'use client';

import { useState } from 'react';
import { Settings2, Archive, RotateCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { snapshotToolData, purgeToolData } from '@/shared/lib/storage';
import { downloadFile } from '@/shared/lib/download-file';
import { toast } from 'sonner';

export interface ToolSettingsProps {
  /**
   * Called when the user selects "Export backup". Optional — when omitted
   * together with `toolSlug`, a default implementation writes a JSON file
   * containing `snapshotToolData(toolSlug)`.
   */
  onExportBackup?: () => void | Promise<void>;
  /**
   * Called after the user confirms the reset dialog. Receives a
   * pre-purged state (i.e. `purgeToolData(toolSlug)` has already run when
   * `toolSlug` is provided) so the caller only needs to reset its own
   * React state back to defaults.
   */
  onReset: () => void | Promise<void>;
  /** Label on the trigger button. Defaults to "Settings". */
  label?: string;
  /** Name of the tool, used in the reset confirmation copy. */
  toolName: string;
  /**
   * Namespaced tool slug (e.g. `'grade-calculator'`). When supplied, the
   * default backup wires up `snapshotToolData` → JSON download, and the
   * reset flow calls `purgeToolData` before `onReset`.
   */
  toolSlug?: string;
  className?: string;
}

/**
 * Per-tool settings menu with destructive-action confirmation.
 *
 * Menu items (Q3=C):
 *   1. Export backup  — dumps all of this tool's localStorage to a file.
 *   2. Reset to defaults — purges this tool's data (confirm dialog first).
 *   3. Cancel — closes the menu.
 *
 * Destructive action is gated behind a confirmation Dialog to prevent
 * accidental data loss; the dialog names the tool explicitly so users
 * cannot confuse it with another tool's reset.
 */
export function ToolSettings({
  onExportBackup,
  onReset,
  label = 'Settings',
  toolName,
  toolSlug,
  className,
}: ToolSettingsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleBackup = async () => {
    if (onExportBackup) {
      await onExportBackup();
      return;
    }
    if (!toolSlug) {
      toast.error('Backup not configured');
      return;
    }
    try {
      const snapshot = snapshotToolData(toolSlug);
      const payload = {
        tool: toolSlug,
        exportedAt: new Date().toISOString(),
        data: snapshot,
      };
      downloadFile(
        `${toolSlug}-backup-${new Date().toISOString().slice(0, 10)}.json`,
        JSON.stringify(payload, null, 2),
        'application/json'
      );
      toast.success('Backup saved');
    } catch {
      toast.error('Backup failed');
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      if (toolSlug) purgeToolData(toolSlug);
      await onReset();
      toast.success(`${toolName} reset`);
    } finally {
      setResetting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            className={className}
          >
            <Settings2 className="h-4 w-4" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[12rem]">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => void handleBackup()}>
            <Archive className="mr-2 h-4 w-4" aria-hidden />
            Export backup
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setConfirmOpen(true);
            }}
            className="text-red-600 focus:text-red-700 dark:text-red-400 dark:focus:text-red-300"
          >
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
            Reset to defaults
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset {toolName}?</DialogTitle>
            <DialogDescription>
              This will clear all saved {toolName} data from this browser,
              including any in-progress work. We recommend exporting a backup
              first. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={resetting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={resetting}
            >
              {resetting ? 'Resetting…' : 'Reset data'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ────────────────────────────────────────────────
// Seat Planner — Room Configuration card
// ────────────────────────────────────────────────

import { useState } from 'react';
import {
  Plus,
  Trash2,
  Building2,
  Shuffle,
  Layers,
  AlertCircle,
  FileUp,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { DataImporter } from '@/shared/components/common/data-importer';
import { applySchema, inferMapping } from '@/shared/lib/parsers/schema';
import type {
  ImportedRow,
  ImportCommitMeta,
  SchemaField,
} from '@/shared/lib/parsers/types';
import { toast } from 'sonner';
import {
  parseRoomCapacity,
  parseRoomImportText,
  validateRoomDraft,
} from './import-utils';
import type { Room, AllocationMode, SortOrder } from './types';

type RoomKey = 'name' | 'capacity';

const ROOM_FIELDS: readonly SchemaField<RoomKey>[] = [
  {
    key: 'name',
    label: 'Room name',
    required: true,
    aliases: ['name', 'room', 'room name', 'venue', 'column 1'],
  },
  {
    key: 'capacity',
    label: 'Capacity',
    required: true,
    aliases: ['capacity', 'seats', 'size', 'column 2'],
    parse: (raw) => {
      const n = Number(raw);
      if (!Number.isFinite(n) || n <= 0)
        throw new Error(`invalid capacity "${raw}"`);
      return Math.floor(n);
    },
  },
];

interface RoomConfigurationProps {
  rooms: Room[];
  newRoomName: string;
  newRoomCapacity: string;
  allocationMode: AllocationMode;
  sortOrder: SortOrder;
  totalCapacity: number;
  studentCount: number;
  canGenerate: boolean;
  onAddRoom: () => void;
  onRemoveRoom: (uid: string) => void;
  onRoomNameChange: (v: string) => void;
  onRoomCapacityChange: (v: string) => void;
  onAllocationModeChange: (v: AllocationMode) => void;
  onSortOrderChange: (v: SortOrder) => void;
  onGenerate: () => void;
  onImportRooms: (rows: ImportedRow<RoomKey>[], meta: ImportCommitMeta) => void;
}

export function RoomConfiguration({
  rooms,
  newRoomName,
  newRoomCapacity,
  allocationMode,
  sortOrder,
  totalCapacity,
  studentCount,
  canGenerate,
  onAddRoom,
  onRemoveRoom,
  onRoomNameChange,
  onRoomCapacityChange,
  onAllocationModeChange,
  onSortOrderChange,
  onGenerate,
  onImportRooms,
}: RoomConfigurationProps) {
  const [importOpen, setImportOpen] = useState(false);
  const [quickPasteOpen, setQuickPasteOpen] = useState(false);
  const [quickPasteValue, setQuickPasteValue] = useState('');
  const roomDraftError = validateRoomDraft(newRoomName, newRoomCapacity, rooms);
  const draftCapacity = parseRoomCapacity(newRoomCapacity);
  const averageCapacity =
    rooms.length > 0 ? Math.round(totalCapacity / rooms.length) : 0;
  const seatDelta = totalCapacity - studentCount;

  const handleQuickPasteImport = () => {
    const normalized = quickPasteValue.trim();
    if (!normalized) return;

    const parsed = parseRoomImportText(normalized, 'Quick pasted rooms');
    const mapping = inferMapping(parsed.headers, ROOM_FIELDS);
    const result = applySchema(parsed, ROOM_FIELDS, mapping);

    if (!result.ok || result.data.length === 0) {
      toast.error(
        result.errors[0]?.message ??
          'Unable to read the pasted room list. Check the room and capacity values.'
      );
      return;
    }

    onImportRooms(result.data, {
      source: parsed.source,
      sourceFiles: [parsed.source],
      mergeStrategy: 'merge',
      warnings: [
        ...parsed.warnings,
        ...result.warnings.map((warning) => warning.message),
      ],
      rowsSkipped: result.errors.length,
    });
    setQuickPasteValue('');
    setQuickPasteOpen(false);
  };

  const handleStructuredRoomPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pastedText = event.clipboardData.getData('text');
    if (!/[\r\n]/.test(pastedText)) return;

    event.preventDefault();
    setQuickPasteOpen(true);
    setQuickPasteValue(pastedText);
  };

  return (
    <Card className="border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md print:hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5" />
          Room Configuration
          {rooms.length > 0 && (
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {rooms.length} room{rooms.length !== 1 ? 's' : ''} ·{' '}
              {totalCapacity} seats
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* add room + bulk import */}
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="Room name (e.g. BC6007-S)"
            value={newRoomName}
            onChange={(e) => onRoomNameChange(e.target.value)}
            className="min-w-[12rem] flex-1"
            onKeyDown={(e) => e.key === 'Enter' && onAddRoom()}
            onPaste={handleStructuredRoomPaste}
            aria-label="Room name"
            aria-invalid={roomDraftError ? true : undefined}
          />
          <Input
            type="number"
            placeholder="Capacity"
            value={newRoomCapacity}
            onChange={(e) => onRoomCapacityChange(e.target.value)}
            className="w-24"
            inputMode="numeric"
            min={1}
            step={1}
            onKeyDown={(e) => e.key === 'Enter' && onAddRoom()}
            aria-label="Room capacity"
            aria-invalid={roomDraftError ? true : undefined}
          />
          <Button
            onClick={onAddRoom}
            size="sm"
            disabled={roomDraftError !== null}
          >
            <Plus className="h-4 w-4" aria-hidden />
            <span className="ml-1">Add</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setImportOpen(true)}
          >
            <FileUp className="h-4 w-4" aria-hidden />
            <span className="ml-1.5">Bulk import</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <p
            className={cn(
              'text-muted-foreground',
              roomDraftError && 'text-red-600 dark:text-red-400'
            )}
          >
            {roomDraftError ??
              'Press Enter to add a room. Names are matched case-insensitively to prevent duplicates.'}
          </p>
          {draftCapacity !== null ? (
            <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
              New room adds {draftCapacity} seat{draftCapacity === 1 ? '' : 's'}
            </span>
          ) : null}
        </div>

        <div className="rounded-2xl border border-dashed bg-muted/10 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Quick paste room list</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                No headers required. Paste `BC5012 35`, `BC5012,35`, or a tab
                separated list such as `BC5012\t35` and the importer will map
                room names and capacities automatically.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setQuickPasteOpen((open) => !open)}
            >
              <FileUp className="h-4 w-4" />
              {quickPasteOpen ? 'Hide quick paste' : 'Quick paste list'}
            </Button>
          </div>

          {quickPasteOpen ? (
            <div className="mt-3 space-y-3">
              <textarea
                value={quickPasteValue}
                onChange={(event) => setQuickPasteValue(event.target.value)}
                placeholder={'BC5012\t35\nBC5013\t35\nBC5014\t35\nBC7015\t35'}
                className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Quick paste room list"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleQuickPasteImport}
                  disabled={!quickPasteValue.trim()}
                >
                  <FileUp className="h-4 w-4" />
                  Merge pasted rooms
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setImportOpen(true)}
                >
                  Open advanced importer
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        {/* room chips */}
        {rooms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {rooms.map((room) => (
              <div
                key={room.uid}
                className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5 text-sm"
              >
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium">{room.name}</span>
                <span className="text-muted-foreground">({room.capacity})</span>
                <button
                  onClick={() => onRemoveRoom(room.uid)}
                  className="text-muted-foreground hover:text-destructive ml-1"
                  aria-label={`Remove room ${room.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {(rooms.length > 0 || studentCount > 0) && (
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border bg-muted/15 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Rooms
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {rooms.length}
              </p>
            </div>
            <div className="rounded-lg border bg-muted/15 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Avg Capacity
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {averageCapacity || 0}
              </p>
            </div>
            <div className="rounded-lg border bg-muted/15 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Capacity Balance
              </p>
              <p
                className={cn(
                  'mt-1 text-lg font-semibold tabular-nums',
                  seatDelta < 0 && 'text-amber-600 dark:text-amber-400'
                )}
              >
                {studentCount > 0
                  ? seatDelta >= 0
                    ? `+${seatDelta}`
                    : `${seatDelta}`
                  : totalCapacity}
              </p>
            </div>
          </div>
        )}

        {/* allocation controls + generate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t">
          {/* mode */}
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">
              Allocation Mode
            </label>
            <Select
              value={allocationMode}
              onValueChange={(v) => onAllocationModeChange(v as AllocationMode)}
            >
              <SelectTrigger aria-label="Allocation Mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cohort">
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Section Cohort
                  </span>
                </SelectItem>
                <SelectItem value="mixed">
                  <span className="flex items-center gap-2">
                    <Shuffle className="h-4 w-4" /> Mixed Sections
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {allocationMode === 'cohort'
                ? 'Students from the same section sit together'
                : 'Sections are interleaved across rooms (anti‑cheating)'}
            </p>
          </div>

          {/* sort */}
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">
              Sort Order
            </label>
            <Select
              value={sortOrder}
              onValueChange={(v) => onSortOrderChange(v as SortOrder)}
            >
              <SelectTrigger aria-label="Sort Order">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="section-name">Section → Name</SelectItem>
                <SelectItem value="section-id">Section → ID</SelectItem>
                <SelectItem value="name">Alphabetical (Name)</SelectItem>
                <SelectItem value="id">Student ID</SelectItem>
                <SelectItem value="random">Randomised</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* generate */}
          <div className="flex items-end">
            <Button
              onClick={onGenerate}
              disabled={!canGenerate}
              className="w-full"
              size="lg"
            >
              Generate Seat Plan
            </Button>
          </div>
        </div>

        {/* capacity warning */}
        {studentCount > 0 &&
          totalCapacity > 0 &&
          studentCount > totalCapacity && (
            <div
              className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/20 rounded-md px-3 py-2"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              Total room capacity ({totalCapacity}) is less than students (
              {studentCount}). {studentCount - totalCapacity} student
              {studentCount - totalCapacity !== 1 ? 's' : ''} will be
              unassigned.
            </div>
          )}
      </CardContent>

      <DataImporter<RoomKey>
        open={importOpen}
        onOpenChange={setImportOpen}
        defaultTab="upload"
        fields={ROOM_FIELDS}
        title="Import rooms"
        description="Paste rows from a spreadsheet or upload a CSV / TSV / XLSX file."
        parsePastedText={parseRoomImportText}
        pastePlaceholder={'Room Capacity\nBC6007-S 40\nBC6008-S, 60\nLab A\t32'}
        helpText="Headers are optional. The importer accepts room and capacity columns separated by spaces, commas, tabs, semicolons, or pipes, and defaults headerless two-column data to Room name + Capacity. Room names are normalized and merged case-insensitively when they refer to the same room."
        onCommit={(rows, meta) => onImportRooms(rows, meta)}
      />
    </Card>
  );
}

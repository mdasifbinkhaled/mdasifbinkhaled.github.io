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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { DataImporter } from '@/shared/components/common/data-importer';
import type { SchemaField, ImportCommitMeta } from '@/shared/lib/parsers/types';
import type { Room, AllocationMode, SortOrder } from './types';

type RoomKey = 'name' | 'capacity';

const ROOM_FIELDS: readonly SchemaField<RoomKey>[] = [
  {
    key: 'name',
    label: 'Room name',
    required: true,
    aliases: ['name', 'room', 'room name', 'venue'],
  },
  {
    key: 'capacity',
    label: 'Capacity',
    required: true,
    aliases: ['capacity', 'seats', 'size'],
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
  onResetResult: () => void;
  onImportRooms: (
    rows: Record<RoomKey, unknown>[],
    meta: ImportCommitMeta
  ) => void;
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
  onResetResult,
  onImportRooms,
}: RoomConfigurationProps) {
  const [importOpen, setImportOpen] = useState(false);
  return (
    <Card className="print:hidden">
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
            aria-label="Room name"
          />
          <Input
            type="number"
            placeholder="Capacity"
            value={newRoomCapacity}
            onChange={(e) => onRoomCapacityChange(e.target.value)}
            className="w-24"
            min={1}
            onKeyDown={(e) => e.key === 'Enter' && onAddRoom()}
            aria-label="Room capacity"
          />
          <Button onClick={onAddRoom} size="sm">
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

        {/* allocation controls + generate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t">
          {/* mode */}
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">
              Allocation Mode
            </label>
            <Select
              value={allocationMode}
              onValueChange={(v) => {
                onAllocationModeChange(v as AllocationMode);
                onResetResult();
              }}
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
              onValueChange={(v) => {
                onSortOrderChange(v as SortOrder);
                onResetResult();
              }}
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
        fields={ROOM_FIELDS}
        title="Import rooms"
        description="Paste rows from a spreadsheet or upload a CSV / TSV / XLSX file."
        pastePlaceholder={'Room\tCapacity\nBC6007-S\t40\nBC6008-S\t60'}
        helpText="Each row needs a room name and a positive capacity."
        onCommit={(rows, meta) => onImportRooms(rows, meta)}
      />
    </Card>
  );
}

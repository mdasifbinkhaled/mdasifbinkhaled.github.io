'use client';

// ════════════════════════════════════════════════
//  Seat Planner — exam seating arrangement tool
// ════════════════════════════════════════════════
//  Features
//  ─ Shared `<DataImporter>` for students & rooms
//    (paste + CSV / TSV / XLSX upload, column mapping,
//    row-level preview, merge strategy)
//  ─ Two allocation modes (section cohort & mixed)
//  ─ Master list + per-room signature sheets
//  ─ Exports unified behind `<ExportBar>`:
//    PDF (master / rooms / combined), CSV, PNG, Print
//  ─ `<StatsPanel>` right-rail on desktop, chip strip on mobile
//  ─ `<ToolSettings>` for backup / reset
//  ─ All state persists under `abk:v1:seat-planner:*`
//  All processing is 100% client-side.

import { useCallback, useMemo } from 'react';
import { useSeatPlanner } from './use-seat-planner';
import { ExamDetailsForm } from './exam-details-form';
import { StudentDataPanel } from './student-data-panel';
import { RoomConfiguration } from './room-configuration';
import { SeatPlanResults } from './seat-plan-results';
import {
  StatsPanel,
  type StatItem,
} from '@/shared/components/common/stats-panel';
import { ExportBar } from '@/shared/components/common/export-bar';
import { ToolSettings } from '@/shared/components/common/tool-settings';

export function SeatPlanner() {
  const sp = useSeatPlanner();
  const handlePrint = useCallback(() => window.print(), []);

  const statItems = useMemo<StatItem[]>(() => {
    const baseItems: StatItem[] = [
      {
        label: 'Students',
        value: sp.students.length.toLocaleString(),
        hint: `${sp.sections.length} section${sp.sections.length === 1 ? '' : 's'}`,
      },
      {
        label: 'Rooms',
        value: sp.rooms.length.toLocaleString(),
        hint: `${sp.totalCapacity.toLocaleString()} seats`,
      },
    ];
    if (sp.stats) {
      baseItems.push(
        {
          label: 'Assigned',
          value: sp.stats.assigned.toLocaleString(),
          tone: sp.stats.unassigned > 0 ? 'warning' : 'success',
          hint:
            sp.stats.unassigned > 0
              ? `${sp.stats.unassigned} unassigned`
              : 'All seated',
        },
        {
          label: 'Utilisation',
          value: `${sp.stats.utilisation}%`,
          hint: `${sp.stats.roomsUsed} room${sp.stats.roomsUsed === 1 ? '' : 's'} used`,
          tone:
            sp.stats.utilisation >= 90
              ? 'success'
              : sp.stats.utilisation >= 70
                ? 'default'
                : 'warning',
        }
      );
    }
    return baseItems;
  }, [
    sp.students.length,
    sp.sections.length,
    sp.rooms.length,
    sp.totalCapacity,
    sp.stats,
  ]);

  // ExportBar only activates once there's a result to export.
  const exportHandlers = sp.result
    ? {
        csv: () => void sp.handleExportCSV(),
        pdf: () => void sp.handleExportPDF('combined'),
        png: () => void sp.handleExportPNG(),
        print: handlePrint,
      }
    : {};

  return (
    <div className="grid gap-6 print:space-y-2 lg:grid-cols-[minmax(0,1fr)_20rem]">
      {/* ── main column ───────────────────────────────────────── */}
      <div className="space-y-6">
        {/* top-strip stats for mobile */}
        <div className="lg:hidden">
          <StatsPanel items={statItems} orientation="horizontal" />
        </div>

        {/* tool controls header */}
        <div className="flex flex-wrap items-center justify-end gap-2 print:hidden">
          <ExportBar handlers={exportHandlers} disabled={!sp.result} />
          <ToolSettings
            toolName="Seat Planner"
            onExportBackup={sp.handleExportBackup}
            onReset={sp.handleResetAll}
          />
        </div>

        {/* 1 · Exam Details */}
        <ExamDetailsForm field={sp.field} />

        {/* 2 · Student Data */}
        <StudentDataPanel
          students={sp.students}
          sections={sp.sections}
          onImport={sp.handleImportStudents}
          onRemoveStudent={sp.handleRemoveStudent}
        />

        {/* 3 · Room Configuration */}
        <RoomConfiguration
          rooms={sp.rooms}
          newRoomName={sp.newRoomName}
          newRoomCapacity={sp.newRoomCapacity}
          allocationMode={sp.allocationMode}
          sortOrder={sp.sortOrder}
          totalCapacity={sp.totalCapacity}
          studentCount={sp.students.length}
          canGenerate={sp.canGenerate}
          onAddRoom={sp.handleAddRoom}
          onRemoveRoom={sp.handleRemoveRoom}
          onRoomNameChange={sp.setNewRoomName}
          onRoomCapacityChange={sp.setNewRoomCapacity}
          onAllocationModeChange={sp.setAllocationMode}
          onSortOrderChange={sp.setSortOrder}
          onGenerate={sp.handleGenerate}
          onResetResult={() => sp.setResult(null)}
          onImportRooms={sp.handleImportRooms}
        />

        {/* 4 · Results */}
        {sp.result && sp.stats && (
          <SeatPlanResults
            result={sp.result}
            stats={sp.stats}
            sections={sp.sections}
            allStudentsSorted={sp.allStudentsSorted}
            examDetails={sp.examDetails}
            selectedRoomIdx={sp.selectedRoomIdx}
            isExporting={sp.isExporting}
            printRef={sp.printRef}
            onSelectRoom={sp.setSelectedRoomIdx}
            onReassign={sp.handleReassign}
            onExportPDF={sp.handleExportPDF}
            onExportCSV={sp.handleExportCSV}
            onExportPNG={sp.handleExportPNG}
            onPrint={handlePrint}
          />
        )}
      </div>

      {/* ── right rail (desktop only) ─────────────────────────── */}
      <aside className="hidden lg:block print:hidden">
        <StatsPanel items={statItems} title="Seat Planner" />
      </aside>
    </div>
  );
}

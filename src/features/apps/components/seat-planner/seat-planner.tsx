'use client';

// ════════════════════════════════════════════════
//  Seat Planner — exam seating arrangement tool
// ════════════════════════════════════════════════
//  Features
//  ─ CSV / paste data import
//  ─ Two allocation modes (section cohort & mixed)
//  ─ Master list + per‑room signature sheets
//  ─ PDF, PNG, CSV, print export
//  ─ Room distribution visualisation
//  ─ Manual room reassignment via dropdown
//  All processing is 100 % client‑side.
// ════════════════════════════════════════════════

import { useCallback } from 'react';
import { useSeatPlanner } from './use-seat-planner';
import { ExamDetailsForm } from './exam-details-form';
import { StudentDataPanel } from './student-data-panel';
import { RoomConfiguration } from './room-configuration';
import { SeatPlanResults } from './seat-plan-results';

export function SeatPlanner() {
  const sp = useSeatPlanner();
  const handlePrint = useCallback(() => window.print(), []);

  return (
    <div className="space-y-6 print:space-y-2">
      {/* 1 · Exam Details */}
      <ExamDetailsForm field={sp.field} />

      {/* 2 · Student Data */}
      <StudentDataPanel
        students={sp.students}
        sections={sp.sections}
        parseErrors={sp.parseErrors}
        rawInput={sp.rawInput}
        fileInputRef={sp.fileInputRef}
        onParseInput={sp.handleParseInput}
        onFileUpload={sp.handleFileUpload}
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
  );
}

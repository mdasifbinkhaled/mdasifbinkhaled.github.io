'use client';

// ────────────────────────────────────────────────
// Seat Planner — state management hook (v2)
// ────────────────────────────────────────────────

import { useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  purgeToolData,
  snapshotToolData,
  useToolStorage,
} from '@/shared/lib/storage';
import { allocate } from './allocation';
import {
  DEFAULT_EXAM_DETAILS,
  type Student,
  type Room,
  type ExamDetails,
  type AllocationMode,
  type SortOrder,
  type AllocationResult,
} from './types';
import type { ImportCommitMeta } from '@/shared/lib/parsers/types';

export const SEAT_TOOL_SLUG = 'seat-planner';

export function useSeatPlanner() {
  const [examDetails, setExamDetails] = useToolStorage<ExamDetails>(
    SEAT_TOOL_SLUG,
    'exam_details',
    DEFAULT_EXAM_DETAILS
  );
  const [students, setStudents] = useToolStorage<Student[]>(
    SEAT_TOOL_SLUG,
    'students',
    []
  );
  const [rooms, setRooms] = useToolStorage<Room[]>(SEAT_TOOL_SLUG, 'rooms', []);

  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomCapacity, setNewRoomCapacity] = useState('40');
  const [allocationMode, setAllocationMode] =
    useState<AllocationMode>('cohort');
  const [sortOrder, setSortOrder] = useState<SortOrder>('section-name');

  const [result, setResult] = useState<AllocationResult | null>(null);
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => {
    const s = new Set(students.map((st) => st.section));
    return [...s].sort((a, b) => a - b);
  }, [students]);

  const totalCapacity = useMemo(
    () => rooms.reduce((sum, r) => sum + r.capacity, 0),
    [rooms]
  );

  const allStudentsSorted = useMemo(() => {
    if (!result) return [];
    return result.allocations.flatMap((a) => a.students.map((s) => ({ ...s })));
  }, [result]);

  const stats = useMemo(() => {
    if (!result) return null;
    const assigned = result.allocations.reduce(
      (s, a) => s + a.students.length,
      0
    );
    return {
      total: assigned + result.unassigned.length,
      assigned,
      unassigned: result.unassigned.length,
      roomsUsed: result.allocations.length,
      utilisation:
        totalCapacity > 0 ? Math.round((assigned / totalCapacity) * 100) : 0,
      sections: sections.length,
    };
  }, [result, totalCapacity, sections]);

  const canGenerate = students.length > 0 && rooms.length > 0;

  const mergeBy = useCallback(
    <T>(
      existing: T[],
      incoming: T[],
      keyFn: (v: T) => string,
      strategy: ImportCommitMeta['mergeStrategy']
    ): T[] => {
      if (strategy === 'replace') return incoming;
      if (strategy === 'append') return [...existing, ...incoming];
      const byKey = new Map<string, T>();
      for (const v of existing) byKey.set(keyFn(v), v);
      for (const v of incoming) byKey.set(keyFn(v), v);
      return [...byKey.values()];
    },
    []
  );

  const handleImportStudents = useCallback(
    (
      rows: Record<'id' | 'name' | 'section', unknown>[],
      meta: ImportCommitMeta
    ) => {
      const incoming: Student[] = rows.map((r) => ({
        id: String(r.id).trim(),
        name: String(r.name).trim(),
        section: Number(r.section) || 1,
      }));
      setStudents((prev) =>
        mergeBy(prev, incoming, (s) => s.id, meta.mergeStrategy)
      );
      setResult(null);
      toast.success(
        `Imported ${incoming.length} student${incoming.length === 1 ? '' : 's'}` +
          (meta.rowsSkipped > 0 ? ` (${meta.rowsSkipped} skipped)` : '')
      );
    },
    [setStudents, mergeBy]
  );

  const handleImportRooms = useCallback(
    (rows: Record<'name' | 'capacity', unknown>[], meta: ImportCommitMeta) => {
      const incoming: Room[] = rows.map((r) => ({
        uid: crypto.randomUUID(),
        name: String(r.name).trim(),
        capacity: Math.max(1, Math.floor(Number(r.capacity) || 0)),
      }));
      setRooms((prev) =>
        mergeBy(prev, incoming, (r) => r.name, meta.mergeStrategy)
      );
      setResult(null);
      toast.success(
        `Imported ${incoming.length} room${incoming.length === 1 ? '' : 's'}`
      );
    },
    [setRooms, mergeBy]
  );

  const handleRemoveStudent = useCallback(
    (id: string) => {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setResult(null);
    },
    [setStudents]
  );

  const handleAddRoom = useCallback(() => {
    const name = newRoomName.trim();
    const cap = parseInt(newRoomCapacity, 10);
    if (!name || isNaN(cap) || cap <= 0) return;
    setRooms((prev) => [
      ...prev,
      { uid: crypto.randomUUID(), name, capacity: cap },
    ]);
    setNewRoomName('');
    setNewRoomCapacity('40');
    setResult(null);
  }, [newRoomName, newRoomCapacity, setRooms]);

  const handleRemoveRoom = useCallback(
    (uid: string) => {
      setRooms((prev) => prev.filter((r) => r.uid !== uid));
      setResult(null);
    },
    [setRooms]
  );

  const handleGenerate = useCallback(() => {
    if (!canGenerate) return;
    const res = allocate(students, rooms, allocationMode, sortOrder);
    setResult(res);
    setSelectedRoomIdx(0);
  }, [students, rooms, allocationMode, sortOrder, canGenerate]);

  const handleReassign = useCallback(
    (studentId: string, targetRoom: string) => {
      if (!result) return;
      const student = result.allocations
        .flatMap((a) => a.students)
        .find((s) => s.id === studentId);
      if (!student || student.room === targetRoom) return;

      const movedStudent: Student = { ...student, room: targetRoom };
      const updated = result.allocations.map((a) => {
        if (a.room.name === targetRoom) {
          return {
            ...a,
            students: [
              ...a.students.filter((s) => s.id !== studentId),
              movedStudent,
            ],
          };
        }
        return { ...a, students: a.students.filter((s) => s.id !== studentId) };
      });
      setResult({
        ...result,
        allocations: updated.filter((a) => a.students.length > 0),
      });
    },
    [result]
  );

  const handleExportPDF = useCallback(
    async (type: 'master' | 'rooms' | 'combined') => {
      if (!result) return;
      setIsExporting(true);
      try {
        const mod = await import('./pdf-export');
        if (type === 'master')
          mod.generateMasterListPDF(allStudentsSorted, examDetails);
        else if (type === 'rooms')
          mod.generateRoomSheetsPDF(result.allocations, examDetails);
        else
          mod.generateCombinedPDF(
            allStudentsSorted,
            result.allocations,
            examDetails
          );
      } catch {
        toast.error('PDF export failed. Please try again.');
      } finally {
        setIsExporting(false);
      }
    },
    [result, allStudentsSorted, examDetails]
  );

  const handleExportCSV = useCallback(async () => {
    if (!result) return;
    const { exportMasterListCSV } = await import('./csv-export');
    exportMasterListCSV(allStudentsSorted, examDetails);
  }, [result, allStudentsSorted, examDetails]);

  const handleExportPNG = useCallback(async () => {
    if (!printRef.current) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(printRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const a = document.createElement('a');
      a.download = `${(examDetails.courseCodes || 'seat-plan').replace(/\//g, '-')}_Seat_Plan.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    } catch {
      toast.error('PNG export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [examDetails.courseCodes]);

  const handleExportBackup = useCallback(() => {
    const snap = snapshotToolData(SEAT_TOOL_SLUG);
    const blob = new Blob([JSON.stringify(snap, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `seat-planner-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Backup saved.');
  }, []);

  const handleResetAll = useCallback(() => {
    purgeToolData(SEAT_TOOL_SLUG);
    setStudents([]);
    setRooms([]);
    setExamDetails(DEFAULT_EXAM_DETAILS);
    setResult(null);
    toast.success('Seat Planner reset.');
  }, [setStudents, setRooms, setExamDetails]);

  const field = useCallback(
    (key: keyof ExamDetails) => ({
      value: examDetails[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setExamDetails((prev) => ({ ...prev, [key]: e.target.value })),
    }),
    [examDetails, setExamDetails]
  );

  return {
    examDetails,
    students,
    rooms,
    newRoomName,
    newRoomCapacity,
    allocationMode,
    sortOrder,
    result,
    selectedRoomIdx,
    isExporting,
    printRef,
    sections,
    totalCapacity,
    allStudentsSorted,
    stats,
    canGenerate,
    field,
    handleImportStudents,
    handleImportRooms,
    handleRemoveStudent,
    handleAddRoom,
    handleRemoveRoom,
    handleGenerate,
    handleReassign,
    handleExportPDF,
    handleExportCSV,
    handleExportPNG,
    handleExportBackup,
    handleResetAll,
    setNewRoomName,
    setNewRoomCapacity,
    setAllocationMode,
    setSortOrder,
    setSelectedRoomIdx,
    setResult,
  };
}

export type SeatPlannerState = ReturnType<typeof useSeatPlanner>;

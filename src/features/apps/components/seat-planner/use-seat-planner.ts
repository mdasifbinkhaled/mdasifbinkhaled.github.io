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
  type SectionFacultyMap,
} from './types';
import type { ImportedRow, ImportCommitMeta } from '@/shared/lib/parsers/types';
import {
  buildSeatPlanBackupFilename,
  buildSeatPlanExportFilename,
} from './export-utils';
import {
  getRoomNameKey,
  normalizeImportedRoom,
  normalizeImportedStudent,
  parseRoomCapacity,
  validateRoomDraft,
} from './import-utils';

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
  const [sectionFaculty, setSectionFaculty] = useToolStorage<SectionFacultyMap>(
    SEAT_TOOL_SLUG,
    'section_faculty',
    {}
  );

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

  const sectionCounts = useMemo(() => {
    const counts: Record<number, number> = {};

    for (const student of students) {
      counts[student.section] = (counts[student.section] ?? 0) + 1;
    }

    return counts;
  }, [students]);

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
      rows: ImportedRow<'id' | 'name' | 'section'>[],
      meta: ImportCommitMeta
    ) => {
      const incoming = rows.map((row) => normalizeImportedStudent(row));
      const extraFieldCount = new Set(
        incoming.flatMap((student) => Object.keys(student.extras ?? {}))
      ).size;

      setStudents((prev) =>
        mergeBy(prev, incoming, (s) => s.id, meta.mergeStrategy)
      );
      setResult(null);
      toast.success(
        `Imported ${incoming.length} student${incoming.length === 1 ? '' : 's'}` +
          (meta.rowsSkipped > 0 ? ` (${meta.rowsSkipped} skipped)` : '') +
          (extraFieldCount > 0
            ? ` · ${extraFieldCount} extra field${extraFieldCount === 1 ? '' : 's'} kept`
            : '')
      );
    },
    [setStudents, mergeBy]
  );

  const handleImportRooms = useCallback(
    (rows: ImportedRow<'name' | 'capacity'>[], meta: ImportCommitMeta) => {
      const normalizedIncoming = rows
        .map((row) => normalizeImportedRoom(row))
        .filter(
          (room): room is { name: string; capacity: number } => room !== null
        );
      const incomingByName = new Map<string, Room>();

      for (const room of normalizedIncoming) {
        incomingByName.set(getRoomNameKey(room.name), {
          uid: crypto.randomUUID(),
          ...room,
        });
      }

      const incoming = [...incomingByName.values()];
      const duplicateCount = normalizedIncoming.length - incoming.length;

      setRooms((prev) => {
        if (meta.mergeStrategy === 'replace') {
          return incoming;
        }

        const byName = new Map(
          prev.map((room) => [getRoomNameKey(room.name), room])
        );

        if (meta.mergeStrategy === 'merge') {
          for (const room of incoming) {
            byName.set(getRoomNameKey(room.name), room);
          }
          return [...byName.values()];
        }

        const appended = [...prev];
        for (const room of incoming) {
          const key = getRoomNameKey(room.name);
          if (byName.has(key)) continue;
          byName.set(key, room);
          appended.push(room);
        }
        return appended;
      });

      setResult(null);
      toast.success(
        `Imported ${incoming.length} room${incoming.length === 1 ? '' : 's'}` +
          (meta.rowsSkipped > 0 ? ` (${meta.rowsSkipped} skipped)` : '') +
          (duplicateCount > 0
            ? ` · ${duplicateCount} duplicate name${duplicateCount === 1 ? '' : 's'} merged`
            : '')
      );
    },
    [setRooms]
  );

  const handleRemoveStudent = useCallback(
    (id: string) => {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setResult(null);
    },
    [setStudents]
  );

  const handleAddRoom = useCallback(() => {
    const draftError = validateRoomDraft(newRoomName, newRoomCapacity, rooms);
    if (draftError) {
      toast.error(draftError);
      return;
    }

    const name = newRoomName.trim().replace(/\s+/g, ' ');
    const cap = parseRoomCapacity(newRoomCapacity);
    if (!name || cap === null) return;

    setRooms((prev) => [
      ...prev,
      { uid: crypto.randomUUID(), name, capacity: cap },
    ]);
    setNewRoomName('');
    setNewRoomCapacity('40');
    setResult(null);
  }, [newRoomName, newRoomCapacity, rooms, setRooms]);

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

  const handleAllocationModeChange = useCallback(
    (nextMode: AllocationMode) => {
      setAllocationMode(nextMode);
      setSelectedRoomIdx(0);
      setResult((previous) => {
        if (!previous || students.length === 0 || rooms.length === 0) {
          return previous;
        }

        return allocate(students, rooms, nextMode, sortOrder);
      });
    },
    [rooms, sortOrder, students]
  );

  const handleSortOrderChange = useCallback(
    (nextSortOrder: SortOrder) => {
      setSortOrder(nextSortOrder);
      setSelectedRoomIdx(0);
      setResult((previous) => {
        if (!previous || students.length === 0 || rooms.length === 0) {
          return previous;
        }

        return allocate(students, rooms, allocationMode, nextSortOrder);
      });
    },
    [allocationMode, rooms, students]
  );

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
          mod.generateMasterListPDF(
            allStudentsSorted,
            examDetails,
            sectionFaculty
          );
        else if (type === 'rooms')
          mod.generateRoomSheetsPDF(
            result.allocations,
            examDetails,
            sectionFaculty
          );
        else
          mod.generateCombinedPDF(
            allStudentsSorted,
            result.allocations,
            examDetails,
            sectionFaculty
          );
      } catch {
        toast.error('PDF export failed. Please try again.');
      } finally {
        setIsExporting(false);
      }
    },
    [result, allStudentsSorted, examDetails, sectionFaculty]
  );

  const handleExportCSV = useCallback(async () => {
    if (!result) return;
    const { exportMasterListCSV } = await import('./csv-export');
    exportMasterListCSV(allStudentsSorted, examDetails);
  }, [result, allStudentsSorted, examDetails]);

  const handleExportPNG = useCallback(async () => {
    const snapshotTarget =
      printRef.current ??
      document.querySelector<HTMLDivElement>(
        '[data-seat-plan-png-export="true"]'
      );

    if (!snapshotTarget) {
      toast.error('PNG export is unavailable right now. Please try again.');
      return;
    }

    setIsExporting(true);
    try {
      const snapshotWidth = Math.max(snapshotTarget.scrollWidth, 960);
      const snapshotHeight = Math.max(snapshotTarget.scrollHeight, 720);
      const exportScale = Math.max(
        2,
        Math.min(window.devicePixelRatio || 1, 3)
      );
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(snapshotTarget, {
        backgroundColor: '#ffffff',
        scale: exportScale,
        logging: false,
        useCORS: true,
        width: snapshotWidth,
        height: snapshotHeight,
        windowWidth: snapshotWidth,
        windowHeight: snapshotHeight,
      });

      const pngBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });

      if (!pngBlob) {
        throw new Error('PNG blob generation failed.');
      }

      const a = document.createElement('a');
      a.download = buildSeatPlanExportFilename(
        examDetails,
        'png-snapshot',
        'png'
      );
      a.href = URL.createObjectURL(pngBlob);
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (error) {
      console.error('Seat planner PNG export failed.', error);
      toast.error('PNG export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [examDetails, printRef]);

  const handleExportBackup = useCallback(() => {
    const snap = snapshotToolData(SEAT_TOOL_SLUG);
    const blob = new Blob([JSON.stringify(snap, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = buildSeatPlanBackupFilename(examDetails);
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Backup saved.');
  }, [examDetails]);

  const handleResetAll = useCallback(() => {
    purgeToolData(SEAT_TOOL_SLUG);
    setStudents([]);
    setRooms([]);
    setSectionFaculty({});
    setExamDetails(DEFAULT_EXAM_DETAILS);
    setResult(null);
    toast.success('Seat Planner reset.');
  }, [setStudents, setRooms, setSectionFaculty, setExamDetails]);

  const setSectionFacultyName = useCallback(
    (section: number, value: string) => {
      setSectionFaculty((prev) => {
        const next = { ...prev };
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          delete next[section];
          return next;
        }

        next[section] = value;
        return next;
      });
    },
    [setSectionFaculty]
  );

  const replaceSectionFaculty = useCallback(
    (nextValue: SectionFacultyMap) => {
      const sanitizedEntries = Object.entries(nextValue).reduce<
        Array<[number, string]>
      >((entries, [sectionKey, value]) => {
        const section = Number(sectionKey);
        const trimmedValue = String(value ?? '').trim();

        if (!Number.isFinite(section) || section < 1 || !trimmedValue) {
          return entries;
        }

        entries.push([Math.floor(section), trimmedValue]);
        return entries;
      }, []);

      setSectionFaculty(Object.fromEntries(sanitizedEntries));
    },
    [setSectionFaculty]
  );

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
    sectionCounts,
    sectionFaculty,
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
    setSectionFacultyName,
    replaceSectionFaculty,
    setNewRoomName,
    setNewRoomCapacity,
    setAllocationMode: handleAllocationModeChange,
    setSortOrder: handleSortOrderChange,
    setSelectedRoomIdx,
    setResult,
  };
}

export type SeatPlannerState = ReturnType<typeof useSeatPlanner>;

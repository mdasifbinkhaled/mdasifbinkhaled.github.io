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
import type { ImportCommitMeta } from '@/shared/lib/parsers/types';
import {
  buildSeatPlanBackupFilename,
  buildSeatPlanExportFilename,
} from './export-utils';

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
        '[data-seat-plan-snapshot="true"]'
      );

    if (!snapshotTarget) {
      toast.error(
        'PNG export is unavailable until the master list is visible.'
      );
      return;
    }

    setIsExporting(true);
    try {
      const snapshotWidth = Math.max(
        snapshotTarget.scrollWidth,
        snapshotTarget.clientWidth,
        672
      );
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(snapshotTarget, {
        backgroundColor: '#ffffff',
        scale: 1,
        logging: false,
        useCORS: true,
        onclone: (doc) => {
          doc
            .querySelectorAll('style, link[rel="stylesheet"]')
            .forEach((node) => node.remove());

          const clonedSnapshot = doc.querySelector<HTMLElement>(
            '[data-seat-plan-snapshot="true"]'
          );

          if (!clonedSnapshot) {
            return;
          }

          const style = doc.createElement('style');
          style.textContent = `
            body {
              margin: 0;
              background: #ffffff;
            }
            [data-seat-plan-snapshot="true"] {
              box-sizing: border-box;
              width: ${snapshotWidth}px;
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              color: #0f172a;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              padding: 16px;
            }
            [data-seat-plan-snapshot="true"] > div:first-child {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              gap: 16px;
              margin-bottom: 16px;
            }
            [data-seat-plan-snapshot="true"] h3 {
              margin: 0 0 4px;
              font-size: 16px;
              font-weight: 600;
            }
            [data-seat-plan-snapshot="true"] p {
              margin: 0;
              color: #475569;
              font-size: 13px;
              line-height: 1.5;
            }
            [data-seat-plan-snapshot="true"] span {
              display: inline-block;
              white-space: nowrap;
              border: 1px solid #e2e8f0;
              border-radius: 9999px;
              background: #ffffff;
              color: #475569;
              font-size: 12px;
              padding: 4px 12px;
            }
            [data-seat-plan-snapshot="true"] table {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
            }
            [data-seat-plan-snapshot="true"] thead {
              background: #f8fafc;
            }
            [data-seat-plan-snapshot="true"] th,
            [data-seat-plan-snapshot="true"] td {
              border-bottom: 1px solid #e2e8f0;
              padding: 8px 12px;
              text-align: left;
              vertical-align: top;
            }
            [data-seat-plan-snapshot="true"] th:nth-child(1),
            [data-seat-plan-snapshot="true"] td:nth-child(1) {
              width: 48px;
              color: #64748b;
            }
            [data-seat-plan-snapshot="true"] th:nth-child(2),
            [data-seat-plan-snapshot="true"] td:nth-child(2) {
              width: 112px;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
              font-size: 12px;
            }
            [data-seat-plan-snapshot="true"] th:nth-child(4),
            [data-seat-plan-snapshot="true"] td:nth-child(4) {
              width: 64px;
              text-align: center;
            }
            [data-seat-plan-snapshot="true"] th:nth-child(5),
            [data-seat-plan-snapshot="true"] td:nth-child(5) {
              width: 160px;
            }
            [data-seat-plan-snapshot="true"] td:last-child div {
              min-width: 9rem;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              background: #ffffff;
              color: #0f172a;
              font-size: 12px;
              line-height: 1.4;
              padding: 4px 8px;
            }
          `;
          doc.head.appendChild(style);

          clonedSnapshot
            .querySelectorAll<HTMLElement>('*')
            .forEach((element) => {
              element.removeAttribute('class');
            });

          clonedSnapshot.querySelectorAll('select').forEach((select) => {
            const replacement = doc.createElement('div');
            replacement.textContent = select.value;
            select.replaceWith(replacement);
          });
        },
      });
      const a = document.createElement('a');
      a.download = buildSeatPlanExportFilename(
        examDetails,
        'png-snapshot',
        'png'
      );
      a.href = canvas.toDataURL('image/png');
      a.click();
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
    setNewRoomName,
    setNewRoomCapacity,
    setAllocationMode,
    setSortOrder,
    setSelectedRoomIdx,
    setResult,
  };
}

export type SeatPlannerState = ReturnType<typeof useSeatPlanner>;

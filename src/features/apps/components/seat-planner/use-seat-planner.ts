'use client';

// ────────────────────────────────────────────────
// Seat Planner — state management hook
// ────────────────────────────────────────────────

import { useState, useMemo, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { parseStudentData } from './csv-parser';
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

export function useSeatPlanner() {
  /* ── state ─────────────────────────────────── */
  const [examDetails, setExamDetails] =
    useState<ExamDetails>(DEFAULT_EXAM_DETAILS);
  const [rawInput, setRawInput] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomCapacity, setNewRoomCapacity] = useState('40');

  const [allocationMode, setAllocationMode] =
    useState<AllocationMode>('cohort');
  const [sortOrder, setSortOrder] = useState<SortOrder>('section-name');

  const [result, setResult] = useState<AllocationResult | null>(null);
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  /* ── derived ───────────────────────────────── */

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

  /* ── handlers ──────────────────────────────── */

  const handleParseInput = useCallback((text: string) => {
    setRawInput(text);
    if (!text.trim()) {
      setStudents([]);
      setParseErrors([]);
      return;
    }
    const { students: parsed, errors } = parseStudentData(text);
    setStudents(parsed);
    setParseErrors(errors);
    setResult(null);
  }, []);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
      const isCsv =
        file.type === 'text/csv' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === '' || // some browsers report empty type for .csv
        /\.csv$/i.test(file.name);
      if (!isCsv) {
        toast.error('Unsupported file type. Please upload a .csv file.');
        e.target.value = '';
        return;
      }
      if (file.size > MAX_BYTES) {
        toast.error('File is too large. Maximum size is 10 MB.');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => handleParseInput(ev.target?.result as string);
      reader.onerror = () => toast.error('Failed to read the uploaded file.');
      reader.readAsText(file, 'utf-8');
      e.target.value = '';
    },
    [handleParseInput]
  );

  const handleRemoveStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setResult(null);
  }, []);

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
  }, [newRoomName, newRoomCapacity]);

  const handleRemoveRoom = useCallback((uid: string) => {
    setRooms((prev) => prev.filter((r) => r.uid !== uid));
    setResult(null);
  }, []);

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

  /** Field updater factory for ExamDetails inputs */
  const field = useCallback(
    (key: keyof ExamDetails) => ({
      value: examDetails[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setExamDetails((prev) => ({ ...prev, [key]: e.target.value })),
    }),
    [examDetails]
  );

  return {
    // state
    examDetails,
    rawInput,
    students,
    parseErrors,
    rooms,
    newRoomName,
    newRoomCapacity,
    allocationMode,
    sortOrder,
    result,
    selectedRoomIdx,
    isExporting,
    // refs
    fileInputRef,
    printRef,
    // derived
    sections,
    totalCapacity,
    allStudentsSorted,
    stats,
    canGenerate,
    // handlers
    field,
    handleParseInput,
    handleFileUpload,
    handleRemoveStudent,
    handleAddRoom,
    handleRemoveRoom,
    handleGenerate,
    handleReassign,
    handleExportPDF,
    handleExportCSV,
    handleExportPNG,
    setNewRoomName,
    setNewRoomCapacity,
    setAllocationMode,
    setSortOrder,
    setSelectedRoomIdx,
    setResult,
  };
}

export type SeatPlannerState = ReturnType<typeof useSeatPlanner>;

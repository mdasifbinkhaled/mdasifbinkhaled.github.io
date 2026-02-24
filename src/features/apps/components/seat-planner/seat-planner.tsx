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

import { useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Upload,
  Plus,
  Trash2,
  Download,
  Printer,
  Image as ImageIcon,
  Users,
  Building2,
  BarChart3,
  Shuffle,
  Layers,
  AlertCircle,
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';

import { parseStudentData } from './csv-parser';
import { allocate } from './allocation';
import {
  DEFAULT_EXAM_DETAILS,
  SECTION_COLORS,
  type Student,
  type Room,
  type ExamDetails,
  type AllocationMode,
  type SortOrder,
  type AllocationResult,
} from './types';

// ── component ───────────────────────────────────

export function SeatPlanner() {
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
    return result.allocations.flatMap((a) => a.students);
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
      const reader = new FileReader();
      reader.onload = (ev) => handleParseInput(ev.target?.result as string);
      reader.readAsText(file);
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

      const updated = result.allocations.map((a) => ({
        ...a,
        students: a.students.filter((s) => s.id !== studentId),
      }));
      const target = updated.find((a) => a.room.name === targetRoom);
      if (target) {
        student.room = targetRoom;
        target.students.push(student);
      }
      setResult({
        ...result,
        allocations: updated.filter((a) => a.students.length > 0),
      });
    },
    [result]
  );

  /* ── export handlers ───────────────────────── */

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
    } finally {
      setIsExporting(false);
    }
  }, [examDetails.courseCodes]);

  const handlePrint = useCallback(() => window.print(), []);

  /* ── field updater ─────────────────────────── */
  const field = useCallback(
    (key: keyof ExamDetails) => ({
      value: examDetails[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setExamDetails((prev) => ({ ...prev, [key]: e.target.value })),
    }),
    [examDetails]
  );

  // ── render ────────────────────────────────────
  return (
    <div className="space-y-6 print:space-y-2">
      {/* back link */}
      <Link
        href="/apps"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors print:hidden"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Apps
      </Link>

      <div className="text-center space-y-2 print:hidden">
        <h1 className="text-3xl font-bold text-primary">Seat Planner</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Generate exam seating arrangements with room assignments, master
          lists, and signature sheets. All processing happens in your browser —
          no data leaves your device.
        </p>
      </div>

      {/* ╔═══════════════════════════════════════╗
         ║  1 · Exam Details                     ║
         ╚═══════════════════════════════════════╝ */}
      <Card className="print:hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Exam Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldRow
              label="Course Code(s)"
              placeholder="e.g. CSE 211/CSC 306"
              {...field('courseCodes')}
            />
            <FieldRow
              label="Course Title"
              placeholder="e.g. Algorithms"
              {...field('courseTitle')}
            />
            <FieldRow
              label="Exam Type"
              placeholder="e.g. Final Examination"
              {...field('examType')}
            />
            <div className="grid grid-cols-2 gap-2">
              <FieldRow
                label="Semester"
                placeholder="e.g. Autumn"
                {...field('semester')}
              />
              <FieldRow
                label="Year"
                placeholder="e.g. 2025"
                {...field('year')}
              />
            </div>
            <FieldRow
              label="Department"
              placeholder="e.g. Department of CSE"
              {...field('department')}
            />
            <FieldRow
              label="University"
              placeholder="e.g. Independent University, Bangladesh"
              {...field('university')}
            />
          </div>
        </CardContent>
      </Card>

      {/* ╔═══════════════════════════════════════╗
         ║  2 · Student Data                     ║
         ╚═══════════════════════════════════════╝ */}
      <Card className="print:hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Student Data
            {students.length > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {students.length} students · {sections.length} section
                {sections.length !== 1 ? 's' : ''}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* upload / instructions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt,.tsv"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span className="text-xs text-muted-foreground self-center">
              or paste tab / comma‑separated data below (ID, Name, Section)
            </span>
          </div>

          {/* paste area */}
          <textarea
            className="w-full h-32 p-3 text-sm font-mono border rounded-md bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
            placeholder={`Student ID\tStudent Name\tSection\n2312209\tShah Newaz Shawrob\t6\n2131244\tFaiyaz Rahim\t1`}
            value={rawInput}
            onChange={(e) => handleParseInput(e.target.value)}
          />

          {/* parse errors */}
          {parseErrors.length > 0 && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3">
              <p className="flex items-center gap-2 text-sm font-medium text-destructive mb-1">
                <AlertCircle className="h-4 w-4" />
                {parseErrors.length} warning
                {parseErrors.length !== 1 ? 's' : ''}
              </p>
              <ul className="text-xs text-destructive/80 space-y-0.5 max-h-24 overflow-y-auto">
                {parseErrors.map((e, i) => (
                  <li key={i}>• {e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* parsed student table */}
          {students.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <Th className="w-12">SL</Th>
                      <Th>Student ID</Th>
                      <Th>Name</Th>
                      <Th className="w-16 text-center">Sec</Th>
                      <Th className="w-10" />
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {students.map((s, i) => (
                      <tr key={s.id + i} className="hover:bg-muted/30">
                        <td className="px-3 py-1.5 text-muted-foreground">
                          {i + 1}
                        </td>
                        <td className="px-3 py-1.5 font-mono text-xs">
                          {s.id}
                        </td>
                        <td className="px-3 py-1.5">{s.name}</td>
                        <td className="px-3 py-1.5 text-center">{s.section}</td>
                        <td className="px-3 py-1.5 text-center">
                          <button
                            onClick={() => handleRemoveStudent(s.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            title="Remove student"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* success pill */}
          {students.length > 0 && parseErrors.length === 0 && (
            <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              {students.length} students parsed successfully
            </p>
          )}
        </CardContent>
      </Card>

      {/* ╔═══════════════════════════════════════╗
         ║  3 · Room Configuration               ║
         ╚═══════════════════════════════════════╝ */}
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
          {/* add room */}
          <div className="flex gap-2">
            <Input
              placeholder="Room name (e.g. BC6007-S)"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleAddRoom()}
            />
            <Input
              type="number"
              placeholder="Capacity"
              value={newRoomCapacity}
              onChange={(e) => setNewRoomCapacity(e.target.value)}
              className="w-24"
              min={1}
              onKeyDown={(e) => e.key === 'Enter' && handleAddRoom()}
            />
            <Button onClick={handleAddRoom} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
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
                  <span className="text-muted-foreground">
                    ({room.capacity})
                  </span>
                  <button
                    onClick={() => handleRemoveRoom(room.uid)}
                    className="text-muted-foreground hover:text-destructive ml-1"
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
                  setAllocationMode(v as AllocationMode);
                  setResult(null);
                }}
              >
                <SelectTrigger>
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
                  setSortOrder(v as SortOrder);
                  setResult(null);
                }}
              >
                <SelectTrigger>
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
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="w-full"
                size="lg"
              >
                Generate Seat Plan
              </Button>
            </div>
          </div>

          {/* capacity warning */}
          {students.length > 0 &&
            totalCapacity > 0 &&
            students.length > totalCapacity && (
              <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/20 rounded-md px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Total room capacity ({totalCapacity}) is less than students (
                {students.length}). {students.length - totalCapacity} student
                {students.length - totalCapacity !== 1 ? 's' : ''} will be
                unassigned.
              </div>
            )}
        </CardContent>
      </Card>

      {/* ╔═══════════════════════════════════════╗
         ║  4 · Results                          ║
         ╚═══════════════════════════════════════╝ */}
      {result && stats && (
        <>
          {/* stats dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 print:hidden">
            {(
              [
                ['Students', stats.total, Users],
                ['Rooms Used', stats.roomsUsed, Building2],
                ['Utilisation', `${stats.utilisation}%`, BarChart3],
                ['Sections', stats.sections, Layers],
              ] as const
            ).map(([label, value, Icon]) => (
              <Card key={label} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* unassigned warning */}
          {result.unassigned.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-md px-4 py-3 print:hidden">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="font-medium">
                {result.unassigned.length} student
                {result.unassigned.length !== 1 ? 's' : ''}
              </span>{' '}
              could not be assigned — insufficient room capacity.
            </div>
          )}

          {/* room distribution chart */}
          <Card className="print:hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5" />
                Room Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.allocations.map((alloc) => {
                const pct = Math.round(
                  (alloc.students.length / alloc.room.capacity) * 100
                );
                const secCounts: Record<number, number> = {};
                alloc.students.forEach(
                  (s) =>
                    (secCounts[s.section] = (secCounts[s.section] ?? 0) + 1)
                );

                return (
                  <div key={alloc.room.uid} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{alloc.room.name}</span>
                      <span className="text-muted-foreground">
                        {alloc.students.length}/{alloc.room.capacity} ({pct}%)
                      </span>
                    </div>
                    <div className="h-6 bg-muted rounded-full overflow-hidden flex">
                      {Object.entries(secCounts)
                        .sort(([a], [b]) => Number(a) - Number(b))
                        .map(([sec, count]) => (
                          <div
                            key={sec}
                            className={`${SECTION_COLORS[(Number(sec) - 1) % SECTION_COLORS.length]} h-full transition-all`}
                            style={{
                              width: `${(count / alloc.room.capacity) * 100}%`,
                            }}
                            title={`Section ${sec}: ${count} students`}
                          />
                        ))}
                    </div>
                  </div>
                );
              })}

              {/* legend */}
              <div className="flex flex-wrap gap-3 pt-2 border-t">
                {sections.map((sec) => (
                  <div key={sec} className="flex items-center gap-1.5 text-xs">
                    <div
                      className={`w-3 h-3 rounded-sm ${SECTION_COLORS[(sec - 1) % SECTION_COLORS.length]}`}
                    />
                    Section {sec}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* master list + room sheets */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="master">
                <TabsList className="print:hidden">
                  <TabsTrigger value="master">Master List</TabsTrigger>
                  <TabsTrigger value="rooms">Room Sheets</TabsTrigger>
                </TabsList>

                {/* ── master list tab ──────────── */}
                <TabsContent value="master">
                  <div ref={printRef}>
                    {/* print‑only header */}
                    <div className="hidden print:block text-center mb-4">
                      <h2 className="text-lg font-bold">
                        {examDetails.courseCodes}
                        {examDetails.courseTitle &&
                          ` — ${examDetails.courseTitle}`}
                      </h2>
                      <p>
                        {examDetails.examType} — {examDetails.semester}{' '}
                        {examDetails.year}
                      </p>
                      {examDetails.department && (
                        <p>{examDetails.department}</p>
                      )}
                      {examDetails.university && (
                        <p>{examDetails.university}</p>
                      )}
                    </div>

                    <div className="border rounded-md overflow-hidden print:border-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-primary/10 print:bg-gray-200">
                            <tr>
                              <Th className="w-12">SL</Th>
                              <Th>Student ID</Th>
                              <Th>Student Name</Th>
                              <Th className="w-16 text-center">Section</Th>
                              <Th className="w-36">Room</Th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {allStudentsSorted.map((s, i) => (
                              <tr
                                key={s.id}
                                className="hover:bg-muted/30 print:hover:bg-transparent"
                              >
                                <td className="px-3 py-1.5 text-muted-foreground">
                                  {i + 1}
                                </td>
                                <td className="px-3 py-1.5 font-mono text-xs">
                                  {s.id}
                                </td>
                                <td className="px-3 py-1.5">{s.name}</td>
                                <td className="px-3 py-1.5 text-center">
                                  {s.section}
                                </td>
                                <td className="px-3 py-1.5">
                                  <select
                                    value={s.room ?? ''}
                                    onChange={(e) =>
                                      handleReassign(s.id, e.target.value)
                                    }
                                    className="text-xs bg-transparent border rounded px-1.5 py-0.5 print:border-0 print:appearance-none"
                                  >
                                    {result.allocations.map((a) => (
                                      <option
                                        key={a.room.uid}
                                        value={a.room.name}
                                      >
                                        {a.room.name}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* ── room sheets tab ─────────── */}
                <TabsContent value="rooms">
                  {/* room selector */}
                  <div className="mb-4 print:hidden">
                    <Select
                      value={String(selectedRoomIdx)}
                      onValueChange={(v) => setSelectedRoomIdx(Number(v))}
                    >
                      <SelectTrigger className="w-72">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {result.allocations.map((a, idx) => (
                          <SelectItem key={a.room.uid} value={String(idx)}>
                            {a.room.name} ({a.students.length} students)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {result.allocations[selectedRoomIdx] && (
                    <RoomSheet alloc={result.allocations[selectedRoomIdx]} />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* export toolbar */}
          <Card className="print:hidden">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleExportPDF('combined')}
                  disabled={isExporting}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF (All)
                </Button>
                <Button
                  onClick={() => handleExportPDF('master')}
                  disabled={isExporting}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Master List PDF
                </Button>
                <Button
                  onClick={() => handleExportPDF('rooms')}
                  disabled={isExporting}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Room Sheets PDF
                </Button>
                <Button
                  onClick={handleExportPNG}
                  disabled={isExporting}
                  variant="outline"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Export PNG
                </Button>
                <Button
                  onClick={handleExportCSV}
                  disabled={isExporting}
                  variant="outline"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel (CSV)
                </Button>
                <Button onClick={handlePrint} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// ── tiny helpers ────────────────────────────────

function Th({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={`px-3 py-2 text-left font-semibold text-xs ${className}`}>
      {children}
    </th>
  );
}

function FieldRow({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

function RoomSheet({ alloc }: { alloc: { room: Room; students: Student[] } }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Room: {alloc.room.name}</h3>
        <span className="text-sm text-muted-foreground">
          {alloc.students.length} / {alloc.room.capacity} seats
        </span>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-primary/10">
            <tr>
              <Th className="w-12">SL</Th>
              <Th>Student ID</Th>
              <Th>Student Name</Th>
              <Th className="w-16 text-center">Section</Th>
              <Th className="w-40">Signature</Th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {alloc.students.map((s, i) => (
              <tr key={s.id} className="hover:bg-muted/30">
                <td className="px-3 py-1.5 text-muted-foreground">{i + 1}</td>
                <td className="px-3 py-1.5 font-mono text-xs">{s.id}</td>
                <td className="px-3 py-1.5">{s.name}</td>
                <td className="px-3 py-1.5 text-center">{s.section}</td>
                <td className="px-3 py-1.5" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* attendance footer */}
      <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
        <DottedField label="Total Present" />
        <DottedField label="Total Absent" />
        <DottedField label="Invigilator Name" />
        <DottedField label="Invigilator Signature" />
      </div>
    </div>
  );
}

function DottedField({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium whitespace-nowrap">{label}</span>
      <div className="flex-1 border-b border-dashed" />
    </div>
  );
}

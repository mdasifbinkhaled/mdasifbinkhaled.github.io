// ────────────────────────────────────────────────
// Seat Planner — Results display (stats + tabs)
// ────────────────────────────────────────────────

import {
  Download,
  Printer,
  Image as ImageIcon,
  Users,
  Building2,
  BarChart3,
  Layers,
  AlertCircle,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
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

import { Th, DottedField } from './shared-ui';
import {
  SECTION_COLORS,
  type Student,
  type RoomAllocation,
  type AllocationResult,
  type ExamDetails,
} from './types';

// ── exported props ──────────────────────────────

interface SeatPlanResultsProps {
  result: AllocationResult;
  stats: {
    total: number;
    assigned: number;
    unassigned: number;
    roomsUsed: number;
    utilisation: number;
    sections: number;
  };
  sections: number[];
  allStudentsSorted: Student[];
  examDetails: ExamDetails;
  selectedRoomIdx: number;
  isExporting: boolean;
  printRef: React.RefObject<HTMLDivElement | null>;
  onSelectRoom: (idx: number) => void;
  onReassign: (studentId: string, targetRoom: string) => void;
  onExportPDF: (type: 'master' | 'rooms' | 'combined') => void;
  onExportCSV: () => void;
  onExportPNG: () => void;
  onPrint: () => void;
}

export function SeatPlanResults({
  result,
  stats,
  sections,
  allStudentsSorted,
  examDetails,
  selectedRoomIdx,
  isExporting,
  printRef,
  onSelectRoom,
  onReassign,
  onExportPDF,
  onExportCSV,
  onExportPNG,
  onPrint,
}: SeatPlanResultsProps) {
  return (
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
        <div
          className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-md px-4 py-3 print:hidden"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="font-medium">
            {result.unassigned.length} student
            {result.unassigned.length !== 1 ? 's' : ''}
          </span>{' '}
          could not be assigned — insufficient room capacity.
        </div>
      )}

      {/* room distribution chart */}
      <RoomDistributionChart
        allocations={result.allocations}
        sections={sections}
      />

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
                    {examDetails.courseTitle && ` — ${examDetails.courseTitle}`}
                  </h2>
                  <p>
                    {examDetails.examType} — {examDetails.semester}{' '}
                    {examDetails.year}
                  </p>
                  {examDetails.department && <p>{examDetails.department}</p>}
                  {examDetails.university && <p>{examDetails.university}</p>}
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
                                  onReassign(s.id, e.target.value)
                                }
                                className="text-xs bg-transparent border rounded-sm px-1.5 py-0.5 print:border-0 print:appearance-none"
                                aria-label={`Room assignment for ${s.name}`}
                              >
                                {result.allocations.map((a) => (
                                  <option key={a.room.uid} value={a.room.name}>
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
                  onValueChange={(v) => onSelectRoom(Number(v))}
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
      <ExportToolbar
        isExporting={isExporting}
        onExportPDF={onExportPDF}
        onExportCSV={onExportCSV}
        onExportPNG={onExportPNG}
        onPrint={onPrint}
      />
    </>
  );
}

// ── Room Distribution Chart ─────────────────────

function RoomDistributionChart({
  allocations,
  sections,
}: {
  allocations: RoomAllocation[];
  sections: number[];
}) {
  return (
    <Card className="print:hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" />
          Room Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {allocations.map((alloc) => {
          const pct = Math.round(
            (alloc.students.length / alloc.room.capacity) * 100
          );
          const secCounts: Record<number, number> = {};
          for (const s of alloc.students) {
            secCounts[s.section] = (secCounts[s.section] ?? 0) + 1;
          }

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
                className={`w-3 h-3 rounded-xs ${SECTION_COLORS[(sec - 1) % SECTION_COLORS.length]}`}
              />
              Section {sec}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Room Sheet ──────────────────────────────────

function RoomSheet({ alloc }: { alloc: RoomAllocation }) {
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

// ── Export Toolbar ───────────────────────────────

function ExportToolbar({
  isExporting,
  onExportPDF,
  onExportCSV,
  onExportPNG,
  onPrint,
}: {
  isExporting: boolean;
  onExportPDF: (type: 'master' | 'rooms' | 'combined') => void;
  onExportCSV: () => void;
  onExportPNG: () => void;
  onPrint: () => void;
}) {
  return (
    <Card className="print:hidden">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => onExportPDF('combined')}
            disabled={isExporting}
          >
            <FileText className="h-4 w-4 mr-2" />
            Export PDF (All)
          </Button>
          <Button
            onClick={() => onExportPDF('master')}
            disabled={isExporting}
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Master List PDF
          </Button>
          <Button
            onClick={() => onExportPDF('rooms')}
            disabled={isExporting}
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Room Sheets PDF
          </Button>
          <Button
            onClick={onExportPNG}
            disabled={isExporting}
            variant="outline"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Export PNG
          </Button>
          <Button
            onClick={onExportCSV}
            disabled={isExporting}
            variant="outline"
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel (CSV)
          </Button>
          <Button onClick={onPrint} variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

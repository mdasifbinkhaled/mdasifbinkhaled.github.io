import { useMemo } from 'react';
import {
  AlertCircle,
  BarChart3,
  Building2,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Layers,
  Printer,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
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
import {
  buildRoomFacultySummary,
  buildSeatPlanDocumentTitle,
  buildSeatPlanMetaLine,
  buildSeatPlanPrintPages,
  getSectionSummaries,
} from './export-utils';
import { SeatPlanPrintDocument } from './seat-plan-print-document';
import { DottedField, Th } from './shared-ui';
import {
  SECTION_COLORS,
  type AllocationResult,
  type ExamDetails,
  type RoomAllocation,
  type SectionFacultyMap,
  type Student,
} from './types';

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
  sectionFaculty: SectionFacultyMap;
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
  sectionFaculty,
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
  const totalCapacity = useMemo(
    () =>
      result.allocations.reduce((sum, alloc) => sum + alloc.room.capacity, 0),
    [result.allocations]
  );
  const sectionSummary = useMemo(
    () => getSectionSummaries(allStudentsSorted, sectionFaculty),
    [allStudentsSorted, sectionFaculty]
  );
  const printablePages = useMemo(
    () =>
      buildSeatPlanPrintPages(
        allStudentsSorted,
        result.allocations,
        sectionFaculty
      ),
    [allStudentsSorted, result.allocations, sectionFaculty]
  );

  const documentTitle = buildSeatPlanDocumentTitle(examDetails);
  const metaLine = buildSeatPlanMetaLine(examDetails);
  const organisationLine = [examDetails.department, examDetails.university]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' • ');

  const overviewItems = [
    {
      label: 'Students',
      value: stats.total.toLocaleString(),
      hint: `${sections.length} section${sections.length === 1 ? '' : 's'}`,
      icon: Users,
    },
    {
      label: 'Assigned',
      value: stats.assigned.toLocaleString(),
      hint:
        stats.unassigned > 0
          ? `${stats.unassigned} unassigned`
          : 'All students seated',
      icon: CheckCircle2,
    },
    {
      label: 'Rooms used',
      value: stats.roomsUsed.toLocaleString(),
      hint: `${totalCapacity.toLocaleString()} active seats`,
      icon: Building2,
    },
    {
      label: 'Utilisation',
      value: `${stats.utilisation}%`,
      hint: `${stats.assigned}/${totalCapacity || stats.assigned} seats filled`,
      icon: BarChart3,
    },
    {
      label: 'A4 pages',
      value: printablePages.length.toLocaleString(),
      hint: 'Print and PDF share the same pagination rules',
      icon: FileText,
    },
  ];

  return (
    <>
      <div className="space-y-5 print:hidden">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid gap-6 p-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                    Seat plan ready
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1">
                    {printablePages.length} A4 page
                    {printablePages.length === 1 ? '' : 's'}
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1">
                    Consistent export naming enabled
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {documentTitle}
                  </h2>
                  {metaLine || organisationLine ? (
                    <p className="text-sm text-muted-foreground">
                      {[metaLine, organisationLine].filter(Boolean).join(' • ')}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Add course metadata above to enrich the A4 print view and
                      exported PDF.
                    </p>
                  )}
                </div>

                <p className="max-w-2xl text-sm text-muted-foreground">
                  Review the live assignments below, then export the combined
                  document, a focused master list, or room sheets with optional
                  faculty labels per section.
                </p>
              </div>

              <ResultActions
                isExporting={isExporting}
                onExportPDF={onExportPDF}
                onExportCSV={onExportCSV}
                onExportPNG={onExportPNG}
                onPrint={onPrint}
              />
            </div>

            <div className="grid gap-3 border-t bg-muted/20 p-6 sm:grid-cols-2 xl:grid-cols-5">
              {overviewItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border bg-background/90 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold leading-none">
                          {item.value}
                        </p>
                      </div>
                      <div className="rounded-full bg-muted p-2 text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {item.hint}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {result.unassigned.length > 0 ? (
          <div
            className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              {result.unassigned.length} student
              {result.unassigned.length === 1 ? '' : 's'} could not be assigned
              because room capacity is insufficient.
            </span>
          </div>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <RoomUtilisationPanel
            allocations={result.allocations}
            sectionFaculty={sectionFaculty}
          />
          <SectionOverviewCard sections={sectionSummary} />
        </div>

        <Card className="overflow-hidden">
          <CardContent className="pt-6">
            <Tabs defaultValue="master" className="space-y-4">
              <TabsList>
                <TabsTrigger value="master">Master List</TabsTrigger>
                <TabsTrigger value="rooms">Room Sheets</TabsTrigger>
              </TabsList>

              <TabsContent value="master" className="space-y-4">
                <div
                  ref={printRef}
                  data-seat-plan-snapshot="true"
                  className="space-y-4 rounded-xl border bg-muted/10 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">
                        Master seating list
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Reassign rooms inline when needed. The printable output
                        uses fixed room labels instead of these controls.
                      </p>
                    </div>
                    <span className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
                      {allStudentsSorted.length} total assignment
                      {allStudentsSorted.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-xl border bg-background">
                    <div className="max-h-[30rem] overflow-auto">
                      <table className="w-full min-w-[42rem] text-sm">
                        <thead className="sticky top-0 bg-background/95 backdrop-blur">
                          <tr>
                            <Th className="w-12">SL</Th>
                            <Th className="w-28">Student ID</Th>
                            <Th>Student Name</Th>
                            <Th className="w-16 text-center">Section</Th>
                            <Th className="w-40">Room</Th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {allStudentsSorted.map((student, index) => (
                            <tr key={student.id} className="hover:bg-muted/30">
                              <td className="px-3 py-2 text-muted-foreground">
                                {index + 1}
                              </td>
                              <td className="px-3 py-2 font-mono text-xs">
                                {student.id}
                              </td>
                              <td className="px-3 py-2">{student.name}</td>
                              <td className="px-3 py-2 text-center">
                                {student.section}
                              </td>
                              <td className="px-3 py-2">
                                <select
                                  value={student.room ?? ''}
                                  onChange={(e) =>
                                    onReassign(student.id, e.target.value)
                                  }
                                  className="min-w-[9rem] rounded-md border bg-background px-2 py-1 text-xs focus:border-ring focus:outline-none"
                                  aria-label={`Room assignment for ${student.name}`}
                                >
                                  {result.allocations.map((allocation) => (
                                    <option
                                      key={allocation.room.uid}
                                      value={allocation.room.name}
                                    >
                                      {allocation.room.name}
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

              <TabsContent value="rooms" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-muted/10 p-4">
                  <div>
                    <h3 className="text-base font-semibold">Room sheets</h3>
                    <p className="text-sm text-muted-foreground">
                      Each room sheet includes attendance fields and optional
                      section faculty labels.
                    </p>
                  </div>

                  <Select
                    value={String(selectedRoomIdx)}
                    onValueChange={(value) => onSelectRoom(Number(value))}
                  >
                    <SelectTrigger className="w-full sm:w-72">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {result.allocations.map((allocation, index) => (
                        <SelectItem
                          key={allocation.room.uid}
                          value={String(index)}
                        >
                          {allocation.room.name} ({allocation.students.length}{' '}
                          student{allocation.students.length === 1 ? '' : 's'})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {result.allocations[selectedRoomIdx] ? (
                  <RoomSheet
                    alloc={result.allocations[selectedRoomIdx]}
                    sectionFaculty={sectionFaculty}
                  />
                ) : null}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <SeatPlanPrintDocument
        students={allStudentsSorted}
        allocations={result.allocations}
        examDetails={examDetails}
        sectionFaculty={sectionFaculty}
      />
    </>
  );
}

function RoomUtilisationPanel({
  allocations,
  sectionFaculty,
}: {
  allocations: RoomAllocation[];
  sectionFaculty: SectionFacultyMap;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" />
          Room Utilisation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {allocations.map((allocation) => {
          const occupancy = allocation.room.capacity
            ? Math.round(
                (allocation.students.length / allocation.room.capacity) * 100
              )
            : 0;
          const sectionSummary = getSectionSummaries(
            allocation.students,
            sectionFaculty
          );

          return (
            <div
              key={allocation.room.uid}
              className="rounded-xl border bg-muted/10 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">
                    {allocation.room.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {allocation.students.length}/{allocation.room.capacity}{' '}
                    seats occupied
                  </p>
                </div>
                <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {occupancy}% full
                </span>
              </div>

              <Progress value={occupancy} className="mt-3 h-2.5" />

              <div className="mt-3 flex flex-wrap gap-2">
                {sectionSummary.map((item) => (
                  <span
                    key={`${allocation.room.uid}-${item.section}`}
                    className="inline-flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${SECTION_COLORS[(item.section - 1) % SECTION_COLORS.length]}`}
                    />
                    <span>
                      Sec {item.section} · {item.count}
                      {item.faculty ? ` · ${item.faculty}` : ''}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function SectionOverviewCard({
  sections,
}: {
  sections: ReturnType<typeof getSectionSummaries>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layers className="h-5 w-5" />
          Section Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.section}
            className="rounded-xl border bg-muted/10 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${SECTION_COLORS[(section.section - 1) % SECTION_COLORS.length]}`}
                />
                <span className="font-medium">Section {section.section}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {section.count} student{section.count === 1 ? '' : 's'}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {section.faculty
                ? `Faculty: ${section.faculty}`
                : 'Faculty name not set.'}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RoomSheet({
  alloc,
  sectionFaculty,
}: {
  alloc: RoomAllocation;
  sectionFaculty: SectionFacultyMap;
}) {
  const sectionSummary = getSectionSummaries(alloc.students, sectionFaculty);
  const facultySummary = buildRoomFacultySummary(alloc, sectionFaculty, 120);

  return (
    <div className="space-y-4 rounded-xl border bg-muted/10 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Room {alloc.room.name}</h3>
          <p className="text-sm text-muted-foreground">
            {alloc.students.length} assigned · {alloc.room.capacity} capacity
          </p>
        </div>
        <span className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
          {Math.round((alloc.students.length / alloc.room.capacity) * 100)}%
          utilised
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {sectionSummary.map((item) => (
          <span
            key={`${alloc.room.uid}-section-${item.section}`}
            className="inline-flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${SECTION_COLORS[(item.section - 1) % SECTION_COLORS.length]}`}
            />
            <span>
              Sec {item.section} · {item.count}
              {item.faculty ? ` · ${item.faculty}` : ''}
            </span>
          </span>
        ))}
      </div>

      {facultySummary ? (
        <div className="rounded-lg border bg-background px-3 py-2 text-xs text-muted-foreground">
          Faculty: {facultySummary}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-background/95">
            <tr>
              <Th className="w-12">SL</Th>
              <Th className="w-28">Student ID</Th>
              <Th>Student Name</Th>
              <Th className="w-16 text-center">Section</Th>
              <Th className="w-40">Signature</Th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {alloc.students.map((student, index) => (
              <tr key={student.id} className="hover:bg-muted/30">
                <td className="px-3 py-2 text-muted-foreground">{index + 1}</td>
                <td className="px-3 py-2 font-mono text-xs">{student.id}</td>
                <td className="px-3 py-2">{student.name}</td>
                <td className="px-3 py-2 text-center">{student.section}</td>
                <td className="px-3 py-2" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-3 text-sm">
        <DottedField label="Total Present" />
        <DottedField label="Total Absent" />
        <DottedField label="Invigilator Name" />
        <DottedField label="Invigilator Signature" />
      </div>
    </div>
  );
}

function ResultActions({
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
    <div className="grid gap-2 sm:grid-cols-2">
      <Button onClick={() => onExportPDF('combined')} disabled={isExporting}>
        <FileText className="mr-2 h-4 w-4" />
        Combined PDF
      </Button>
      <Button onClick={onPrint} variant="outline">
        <Printer className="mr-2 h-4 w-4" />
        Print A4
      </Button>
      <Button
        onClick={() => onExportPDF('master')}
        disabled={isExporting}
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Master PDF
      </Button>
      <Button
        onClick={() => onExportPDF('rooms')}
        disabled={isExporting}
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Room Sheets PDF
      </Button>
      <Button onClick={onExportCSV} disabled={isExporting} variant="outline">
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        CSV
      </Button>
      <Button onClick={onExportPNG} disabled={isExporting} variant="outline">
        <ImageIcon className="mr-2 h-4 w-4" />
        PNG Snapshot
      </Button>
    </div>
  );
}

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
  buildSeatPlanTableColumns,
  buildRoomFacultySummary,
  getSeatPlanTableValue,
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
  const masterColumns = useMemo(
    () => buildSeatPlanTableColumns(allStudentsSorted, 'master'),
    [allStudentsSorted]
  );
  const roomColumns = useMemo(
    () => buildSeatPlanTableColumns(allStudentsSorted, 'room'),
    [allStudentsSorted]
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
        <Card className="overflow-hidden border-border/70 bg-card/90 shadow-sm">
          <CardContent className="p-0">
            <div className="space-y-5 p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
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
                        {[metaLine, organisationLine]
                          .filter(Boolean)
                          .join(' • ')}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Add course metadata above to enrich the A4 print view
                        and exported PDF.
                      </p>
                    )}
                  </div>

                  <p className="max-w-2xl text-sm text-muted-foreground">
                    Review the live assignments below, then export the combined
                    document, a focused master list, or room sheets with
                    optional faculty labels per section.
                  </p>
                </div>

                <div className="xl:w-full xl:max-w-[42rem]">
                  <ResultActions
                    isExporting={isExporting}
                    onExportPDF={onExportPDF}
                    onExportCSV={onExportCSV}
                    onExportPNG={onExportPNG}
                    onPrint={onPrint}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-3 border-t bg-muted/20 p-6 sm:grid-cols-2 xl:grid-cols-5">
              {overviewItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border bg-background/90 p-4 shadow-sm transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-md"
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
                            {masterColumns.map((column) => (
                              <Th
                                key={column.key}
                                data-seat-plan-col={
                                  column.kind === 'extra'
                                    ? 'extra'
                                    : column.kind
                                }
                                className={
                                  column.kind === 'sl'
                                    ? 'w-12'
                                    : column.kind === 'id'
                                      ? 'w-28'
                                      : column.kind === 'section'
                                        ? 'w-16 text-center'
                                        : column.kind === 'room'
                                          ? 'w-40'
                                          : column.kind === 'extra'
                                            ? 'min-w-[8rem]'
                                            : undefined
                                }
                              >
                                {column.label}
                              </Th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {allStudentsSorted.map((student, index) => (
                            <tr key={student.id} className="hover:bg-muted/30">
                              {masterColumns.map((column) => (
                                <td
                                  key={column.key}
                                  data-seat-plan-col={
                                    column.kind === 'extra'
                                      ? 'extra'
                                      : column.kind
                                  }
                                  data-seat-plan-select-cell={
                                    column.kind === 'room' ? 'true' : undefined
                                  }
                                  className={
                                    column.kind === 'sl'
                                      ? 'px-3 py-2 text-muted-foreground'
                                      : column.kind === 'id'
                                        ? 'px-3 py-2 font-mono text-xs'
                                        : column.kind === 'section'
                                          ? 'px-3 py-2 text-center'
                                          : 'px-3 py-2'
                                  }
                                >
                                  {column.kind === 'room' ? (
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
                                  ) : (
                                    getSeatPlanTableValue(
                                      student,
                                      column,
                                      index
                                    )
                                  )}
                                </td>
                              ))}
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
                    columns={roomColumns}
                    sectionFaculty={sectionFaculty}
                  />
                ) : null}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <SeatPlanPngDocument
        printRef={printRef}
        documentTitle={documentTitle}
        metaLine={metaLine}
        organisationLine={organisationLine}
        allStudentsSorted={allStudentsSorted}
        masterColumns={masterColumns}
        sectionSummary={sectionSummary}
        stats={stats}
      />

      <SeatPlanPrintDocument
        students={allStudentsSorted}
        allocations={result.allocations}
        examDetails={examDetails}
        sectionFaculty={sectionFaculty}
      />
    </>
  );
}

function SeatPlanPngDocument({
  printRef,
  documentTitle,
  metaLine,
  organisationLine,
  allStudentsSorted,
  masterColumns,
  sectionSummary,
  stats,
}: {
  printRef: React.RefObject<HTMLDivElement | null>;
  documentTitle: string;
  metaLine: string;
  organisationLine: string;
  allStudentsSorted: Student[];
  masterColumns: ReturnType<typeof buildSeatPlanTableColumns>;
  sectionSummary: ReturnType<typeof getSectionSummaries>;
  stats: SeatPlanResultsProps['stats'];
}) {
  const exportWidth = Math.min(
    Math.max(980, 720 + masterColumns.length * 102),
    1680
  );
  const sectionLine = sectionSummary
    .map((item) =>
      item.faculty
        ? `Sec ${item.section} (${item.count}) · ${item.faculty}`
        : `Sec ${item.section} (${item.count})`
    )
    .join('  •  ');

  return (
    <div
      ref={printRef}
      data-seat-plan-png-export="true"
      aria-hidden="true"
      className="pointer-events-none fixed left-[-10000px] top-0 z-[-1] min-w-[980px] bg-white text-slate-900"
    >
      <article
        className="border border-slate-300 bg-white px-10 py-8 shadow-none"
        data-seat-plan-png-width={String(exportWidth)}
      >
        <header className="border-b-2 border-slate-900 pb-5">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
            Examination Seating Plan
          </p>
          <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight text-slate-950">
            {documentTitle}
          </h2>
          {metaLine || organisationLine ? (
            <p className="mt-2 text-[13px] leading-6 text-slate-600">
              {[metaLine, organisationLine].filter(Boolean).join(' • ')}
            </p>
          ) : null}
        </header>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-3">
            <p className="text-[13px] leading-6 text-slate-600">
              High-resolution master list export with fixed room labels, full
              row coverage, and preserved imported fields.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-6 text-slate-700">
              {sectionLine ||
                'Section summaries will appear here once students are imported.'}
            </div>
          </div>

          <div className="border border-slate-300 bg-white">
            <div className="border-b border-slate-300 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Export Summary
            </div>
            <div className="grid grid-cols-2 text-[12px]">
              <PngSummaryStat
                label="Assignments"
                value={stats.assigned.toLocaleString()}
              />
              <PngSummaryStat
                label="Rooms Used"
                value={stats.roomsUsed.toLocaleString()}
              />
              <PngSummaryStat
                label="Utilisation"
                value={`${stats.utilisation}%`}
              />
              <PngSummaryStat
                label="Unassigned"
                value={stats.unassigned.toLocaleString()}
              />
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden border border-slate-300">
          <div className="flex items-center justify-between border-b border-slate-300 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
                Master List
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {allStudentsSorted.length} assignment
                {allStudentsSorted.length === 1 ? '' : 's'}
              </p>
            </div>
            <p className="text-[12px] text-slate-600">
              Generated from the current seat allocation
            </p>
          </div>

          <table className="w-full border-collapse text-[13px] leading-[1.45]">
            <thead>
              <tr className="bg-white">
                {masterColumns.map((column) => (
                  <th
                    key={column.key}
                    data-seat-plan-col={
                      column.kind === 'extra' ? 'extra' : column.kind
                    }
                    className={
                      column.kind === 'sl'
                        ? 'border-b border-slate-300 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500'
                        : column.kind === 'section'
                          ? 'border-b border-slate-300 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500'
                          : 'border-b border-slate-300 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500'
                    }
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allStudentsSorted.map((student, index) => (
                <tr
                  key={`${student.id}-${index}`}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}
                >
                  {masterColumns.map((column) => (
                    <td
                      key={column.key}
                      data-seat-plan-col={
                        column.kind === 'extra' ? 'extra' : column.kind
                      }
                      className={
                        column.kind === 'sl'
                          ? 'border-b border-slate-200 px-3 py-2.5 text-center text-slate-500'
                          : column.kind === 'id'
                            ? 'border-b border-slate-200 px-3 py-2.5 font-mono text-[12px] text-slate-700'
                            : column.kind === 'section'
                              ? 'border-b border-slate-200 px-3 py-2.5 text-center'
                              : 'border-b border-slate-200 px-3 py-2.5'
                      }
                    >
                      {getSeatPlanTableValue(student, column, index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>
    </div>
  );
}

function PngSummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-r border-slate-200 px-4 py-3 last:border-b-0 even:border-r-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
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
              className="rounded-xl border bg-muted/10 p-4 transition-colors hover:bg-muted/20"
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
            className="rounded-xl border bg-muted/10 p-4 transition-colors hover:bg-muted/20"
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
  columns,
  sectionFaculty,
}: {
  alloc: RoomAllocation;
  columns: ReturnType<typeof buildSeatPlanTableColumns>;
  sectionFaculty: SectionFacultyMap;
}) {
  const sectionSummary = getSectionSummaries(alloc.students, sectionFaculty);
  const facultySummary = buildRoomFacultySummary(alloc, sectionFaculty, 120);

  return (
    <div className="space-y-4 rounded-xl border bg-muted/10 p-4 shadow-sm">
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
        <table className="min-w-max text-sm">
          <thead className="bg-background/95">
            <tr>
              {columns.map((column) => (
                <Th
                  key={column.key}
                  className={
                    column.kind === 'sl'
                      ? 'w-12'
                      : column.kind === 'id'
                        ? 'w-28'
                        : column.kind === 'section'
                          ? 'w-16 text-center'
                          : column.kind === 'signature'
                            ? 'w-40'
                            : column.kind === 'extra'
                              ? 'min-w-[8rem]'
                              : undefined
                  }
                >
                  {column.label}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {alloc.students.map((student, index) => (
              <tr
                key={student.id}
                className="transition-colors hover:bg-muted/30"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={
                      column.kind === 'sl'
                        ? 'px-3 py-2 text-muted-foreground'
                        : column.kind === 'id'
                          ? 'px-3 py-2 font-mono text-xs'
                          : column.kind === 'section'
                            ? 'px-3 py-2 text-center'
                            : 'px-3 py-2'
                    }
                  >
                    {getSeatPlanTableValue(student, column, index)}
                  </td>
                ))}
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
    <div className="rounded-2xl border bg-muted/10 p-4">
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Export and Print
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep the primary document export prominent, and group the secondary
          outputs nearby.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        <Button
          onClick={() => onExportPDF('combined')}
          disabled={isExporting}
          className="justify-start"
        >
          <FileText className="mr-2 h-4 w-4" />
          Combined PDF
        </Button>
        <Button onClick={onPrint} variant="secondary" className="justify-start">
          <Printer className="mr-2 h-4 w-4" />
          Print A4
        </Button>
        <Button
          onClick={() => onExportPDF('master')}
          disabled={isExporting}
          variant="outline"
          className="justify-start"
        >
          <Download className="mr-2 h-4 w-4" />
          Master PDF
        </Button>
        <Button
          onClick={() => onExportPDF('rooms')}
          disabled={isExporting}
          variant="outline"
          className="justify-start"
        >
          <Download className="mr-2 h-4 w-4" />
          Room Sheets PDF
        </Button>
        <Button
          onClick={onExportCSV}
          disabled={isExporting}
          variant="outline"
          className="justify-start"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          CSV
        </Button>
        <Button
          onClick={onExportPNG}
          disabled={isExporting}
          variant="outline"
          className="justify-start"
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          PNG Snapshot
        </Button>
      </div>
    </div>
  );
}

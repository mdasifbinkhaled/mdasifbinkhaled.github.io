import { useMemo } from 'react';
import {
  AlertCircle,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Users,
} from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
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
  buildSeatPlanDocumentTitle,
  buildSeatPlanMetaLine,
  buildSeatPlanPrintPages,
  getSectionSummaries,
} from './export-utils';
import { SeatPlanPrintDocument } from './seat-plan-print-document';
import { MasterListTab } from './master-list-tab';
import { ResultActions } from './result-actions';
import { RoomSheet } from './room-sheet';
import { RoomUtilisationPanel } from './room-utilisation-panel';
import { SeatPlanPngDocument } from './seat-plan-png-document';
import { SectionOverviewCard } from './section-overview-card';
import type { SeatPlanResultsProps } from './seat-plan-results-types';

export type { SeatPlanResultsProps };

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
                <MasterListTab
                  allStudentsSorted={allStudentsSorted}
                  masterColumns={masterColumns}
                  allocations={result.allocations}
                  onReassign={onReassign}
                />
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

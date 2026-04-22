'use client';

// ════════════════════════════════════════════════
//  Seat Planner — exam seating arrangement tool
// ════════════════════════════════════════════════
//  Features
//  ─ Shared `<DataImporter>` for students & rooms
//    (paste + CSV / TSV / XLSX upload, column mapping,
//    row-level preview, merge strategy)
//  ─ Two allocation modes (section cohort & mixed)
//  ─ Master list + per-room signature sheets
//  ─ Exports unified behind `<ExportBar>`:
//    PDF (master / rooms / combined), CSV, PNG, Print
//  ─ `<StatsPanel>` right-rail on desktop, chip strip on mobile
//  ─ `<ToolSettings>` for backup / reset
//  ─ All state persists under `abk:v1:seat-planner:*`
//  All processing is 100% client-side.

import { useCallback, useMemo, useState } from 'react';
import {
  Archive,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  RotateCcw,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { useSeatPlanner } from './use-seat-planner';
import { ExamDetailsForm } from './exam-details-form';
import { StudentDataPanel } from './student-data-panel';
import { RoomConfiguration } from './room-configuration';
import { SeatPlanResults } from './seat-plan-results';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  StatsPanel,
  type StatItem,
} from '@/shared/components/common/stats-panel';
import { cn } from '@/shared/lib/utils';

const STAT_TONE_CLASS: Record<NonNullable<StatItem['tone']>, string> = {
  default: 'text-foreground',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-red-600 dark:text-red-400',
};

export function SeatPlanner() {
  const sp = useSeatPlanner();
  const [resetOpen, setResetOpen] = useState(false);
  const handlePrint = useCallback(() => window.print(), []);

  const statItems = useMemo<StatItem[]>(() => {
    const baseItems: StatItem[] = [
      {
        label: 'Students',
        value: sp.students.length.toLocaleString(),
        icon: <Users className="h-3.5 w-3.5" />,
        hint: `${sp.sections.length} section${sp.sections.length === 1 ? '' : 's'}`,
      },
      {
        label: 'Capacity',
        value: sp.totalCapacity.toLocaleString(),
        icon: <Building2 className="h-3.5 w-3.5" />,
        hint: `${sp.rooms.length} room${sp.rooms.length === 1 ? '' : 's'}`,
      },
    ];
    if (sp.stats) {
      baseItems.push(
        {
          label: 'Assigned',
          value: sp.stats.assigned.toLocaleString(),
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          tone: sp.stats.unassigned > 0 ? 'warning' : 'success',
          hint:
            sp.stats.unassigned > 0
              ? `${sp.stats.unassigned} unassigned`
              : 'All seated',
        },
        {
          label: 'Utilisation',
          value: `${sp.stats.utilisation}%`,
          icon: <BarChart3 className="h-3.5 w-3.5" />,
          hint: `${sp.stats.roomsUsed} room${sp.stats.roomsUsed === 1 ? '' : 's'} used`,
          tone:
            sp.stats.utilisation >= 90
              ? 'success'
              : sp.stats.utilisation >= 70
                ? 'default'
                : 'warning',
        },
        {
          label: 'Buffer',
          value: Math.max(sp.totalCapacity - sp.stats.assigned, 0),
          icon: <TriangleAlert className="h-3.5 w-3.5" />,
          hint:
            sp.totalCapacity >= sp.stats.assigned
              ? 'Remaining seats'
              : 'Capacity exceeded',
          tone: sp.totalCapacity >= sp.stats.assigned ? 'default' : 'danger',
        }
      );
    }
    return baseItems;
  }, [
    sp.students.length,
    sp.sections.length,
    sp.rooms.length,
    sp.totalCapacity,
    sp.stats,
  ]);

  const namedFacultySections = useMemo(
    () =>
      sp.sections.filter((section) => sp.sectionFaculty[section]?.trim())
        .length,
    [sp.sectionFaculty, sp.sections]
  );
  const missingFacultySections = sp.sections.filter(
    (section) => !sp.sectionFaculty[section]?.trim()
  );
  const workflowSteps = [
    {
      title: 'Add exam metadata',
      hint:
        sp.examDetails.courseCodes.trim() && sp.examDetails.courseTitle.trim()
          ? 'Course information is ready for print and export.'
          : 'Fill in course codes and title so exports read properly.',
      href: '#seat-planner-exam',
      complete:
        Boolean(sp.examDetails.courseCodes.trim()) &&
        Boolean(sp.examDetails.courseTitle.trim()),
    },
    {
      title: 'Import student rows',
      hint:
        sp.students.length > 0
          ? `${sp.students.length} student${sp.students.length === 1 ? '' : 's'} loaded.`
          : 'Bring in the student list before assigning rooms.',
      href: '#seat-planner-students',
      complete: sp.students.length > 0,
    },
    {
      title: 'Paste or import rooms',
      hint:
        sp.rooms.length > 0
          ? `${sp.rooms.length} room${sp.rooms.length === 1 ? '' : 's'} configured.`
          : 'Add rooms individually or paste a full room-capacity list.',
      href: '#seat-planner-rooms',
      complete: sp.rooms.length > 0,
    },
    {
      title: 'Review faculty names',
      hint:
        sp.sections.length === 0
          ? 'Faculty mapping appears after students are imported.'
          : missingFacultySections.length === 0
            ? 'Each active section has a faculty or invigilator name.'
            : `${missingFacultySections.length} section${missingFacultySections.length === 1 ? '' : 's'} still missing a name.`,
      href: '#seat-planner-exam',
      complete: sp.sections.length === 0 || missingFacultySections.length === 0,
    },
    {
      title: 'Generate and export',
      hint: sp.result
        ? 'Seat plan generated. Review assignments and export documents.'
        : 'Generate the seat plan when the inputs above are ready.',
      href: sp.result ? '#seat-planner-results' : '#seat-planner-rooms',
      complete: Boolean(sp.result),
    },
  ];

  return (
    <>
      <div className="grid gap-8 print:space-y-2 xl:grid-cols-[minmax(0,1.15fr)_23rem] 2xl:grid-cols-[minmax(0,1.22fr)_24rem]">
        {/* ── main column ───────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="space-y-6 print:hidden">
            {/* top-strip stats for mobile */}
            <div className="lg:hidden">
              <StatsPanel items={statItems} orientation="horizontal" />
            </div>

            <div className="xl:hidden">
              <SeatPlannerActionCard
                hasResult={Boolean(sp.result)}
                onBackup={sp.handleExportBackup}
                onReset={() => setResetOpen(true)}
              />
            </div>

            {/* 1 · Exam Details */}
            <div id="seat-planner-exam" className="scroll-mt-24">
              <ExamDetailsForm
                field={sp.field}
                sections={sp.sections}
                sectionCounts={sp.sectionCounts}
                sectionFaculty={sp.sectionFaculty}
                onSectionFacultyChange={sp.setSectionFacultyName}
                onSectionFacultyReplace={sp.replaceSectionFaculty}
              />
            </div>

            {/* 2 · Student Data */}
            <div id="seat-planner-students" className="scroll-mt-24">
              <StudentDataPanel
                students={sp.students}
                sections={sp.sections}
                onImport={sp.handleImportStudents}
                onRemoveStudent={sp.handleRemoveStudent}
              />
            </div>

            {/* 3 · Room Configuration */}
            <div id="seat-planner-rooms" className="scroll-mt-24">
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
                onImportRooms={sp.handleImportRooms}
              />
            </div>
          </div>

          {/* 4 · Results */}
          {sp.result && sp.stats && (
            <div id="seat-planner-results" className="scroll-mt-24">
              <SeatPlanResults
                result={sp.result}
                stats={sp.stats}
                sections={sp.sections}
                sectionFaculty={sp.sectionFaculty}
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
            </div>
          )}
        </div>

        {/* ── right rail (desktop only) ─────────────────────────── */}
        <aside className="hidden xl:block print:hidden">
          <div className="sticky top-24 space-y-4">
            <SeatPlannerWorkspaceCard
              items={statItems}
              namedFacultySections={namedFacultySections}
              totalSections={sp.sections.length}
            />
            <SeatPlannerActionCard
              hasResult={Boolean(sp.result)}
              onBackup={sp.handleExportBackup}
              onReset={() => setResetOpen(true)}
            />
            <SeatPlannerWorkflowCard steps={workflowSteps} />
          </div>
        </aside>
      </div>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Seat Planner workspace?</DialogTitle>
            <DialogDescription>
              This clears the saved seat planner data in this browser, including
              imported students, rooms, faculty mappings, and any generated
              result. Export a backup first if you may need it again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                sp.handleResetAll();
                setResetOpen(false);
              }}
            >
              Reset workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SeatPlannerWorkspaceCard({
  items,
  namedFacultySections,
  totalSections,
}: {
  items: StatItem[];
  namedFacultySections: number;
  totalSections: number;
}) {
  return (
    <Card className="border-border/70 bg-card/90 shadow-sm">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">Workspace Snapshot</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep the core setup visible while working through the form-heavy
              flow.
            </p>
          </div>
          <Badge variant="outline" className="rounded-full px-2.5 py-1">
            Seat Planner
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border bg-muted/15 p-4 transition-colors hover:bg-muted/25"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      'mt-2 text-2xl font-semibold leading-none tabular-nums',
                      STAT_TONE_CLASS[item.tone ?? 'default']
                    )}
                  >
                    {item.value}
                  </p>
                </div>
                <div className="rounded-full bg-background p-2 text-muted-foreground shadow-sm">
                  {item.icon}
                </div>
              </div>
              {item.hint ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  {item.hint}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed bg-background px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Faculty Coverage
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {totalSections === 0
                  ? 'Import students to unlock section assignments.'
                  : `${namedFacultySections}/${totalSections} active sections named`}
              </p>
            </div>
            <span
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-medium',
                totalSections > 0 && namedFacultySections === totalSections
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
              )}
            >
              {totalSections > 0 && namedFacultySections === totalSections
                ? 'Ready'
                : 'Needs review'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SeatPlannerActionCard({
  hasResult,
  onBackup,
  onReset,
}: {
  hasResult: boolean;
  onBackup: () => void;
  onReset: () => void;
}) {
  return (
    <Card className="border-border/70 bg-card/90 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Workspace Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Keep the important utilities visible instead of hiding them behind a
          settings icon.
        </p>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        <Button className="justify-start" onClick={onBackup}>
          <Archive className="h-4 w-4" />
          Back up JSON
        </Button>
        <Button className="justify-start" variant="outline" asChild>
          <a href={hasResult ? '#seat-planner-results' : '#seat-planner-rooms'}>
            <ClipboardList className="h-4 w-4" />
            {hasResult ? 'Jump to results' : 'Jump to room setup'}
          </a>
        </Button>
        <Button className="justify-start" variant="outline" asChild>
          <a href="#seat-planner-exam">
            <FileText className="h-4 w-4" />
            Faculty and exam details
          </a>
        </Button>
        <Button
          className="justify-start"
          variant="destructive"
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4" />
          Reset workspace
        </Button>
      </CardContent>
    </Card>
  );
}

function SeatPlannerWorkflowCard({
  steps,
}: {
  steps: Array<{
    title: string;
    hint: string;
    href: string;
    complete: boolean;
  }>;
}) {
  return (
    <Card className="border-border/70 bg-card/90 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Workflow Guide</CardTitle>
        <p className="text-sm text-muted-foreground">
          A clearer next-step rail reduces the chance of missed inputs and helps
          keep long forms from feeling overwhelming.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-2xl border bg-muted/10 p-3 transition-colors hover:bg-muted/20"
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                  step.complete
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {step.complete ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{step.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {step.hint}
                </p>
              </div>
              <Button size="sm" variant="ghost" asChild>
                <a href={step.href}>
                  Open
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

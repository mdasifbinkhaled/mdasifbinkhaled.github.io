'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { Mail, Monitor, BookOpen } from 'lucide-react';
import type { ClassScheduleItem } from '@/shared/lib/validation/schemas';
import { cn } from '@/shared/lib/utils';

/* ── Helper Components (module-level to avoid re-creation on render) ── */

function CellContent({
  text,
  subtext,
  icon: Icon,
}: {
  text: string;
  subtext?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex items-center gap-1.5 font-medium text-foreground/90 text-sm">
        {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
        <span className="truncate">{text}</span>
      </div>
      {subtext && (
        <span className="text-[11px] text-muted-foreground truncate font-mono mt-0.5">
          {subtext}
        </span>
      )}
    </div>
  );
}

function EmailLink({ email }: { email?: string }) {
  if (!email) return <span className="text-muted-foreground">-</span>;
  return (
    <a
      href={`mailto:${email}`}
      className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 leading-none"
    >
      <Mail className="w-3 h-3" />
      <span className="truncate max-w-[200px]">{email}</span>
    </a>
  );
}

function BadgeCell({
  text,
  variant = 'outline',
}: {
  text: string;
  variant?: 'outline' | 'secondary' | 'default';
}) {
  return (
    <Badge
      variant={variant}
      className={cn(
        'rounded-md font-mono text-[11px] px-2 py-0.5 h-6 whitespace-nowrap',
        variant === 'outline' && 'bg-background border-border/60',
        variant === 'secondary' && 'bg-secondary/40 text-secondary-foreground'
      )}
    >
      {text}
    </Badge>
  );
}

/* ── Desktop View ── */

function DesktopView({ schedule }: { schedule: ClassScheduleItem[] }) {
  return (
    <div className="hidden lg:block rounded-lg border border-border shadow-sm overflow-hidden bg-background">
      <div className="w-full overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-muted/40 sticky top-0 z-10">
            <TableRow className="border-b border-border hover:bg-muted/40">
              <TableHead className="w-[60px] text-center border-r border-border/50 h-10 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sec
              </TableHead>
              <TableHead className="min-w-[180px] border-r border-border/50 py-2 text-xs font-semibold uppercase tracking-wider text-primary/80 bg-primary/5">
                Theory Faculty
              </TableHead>
              <TableHead className="w-[120px] border-r border-border/50 py-2 text-xs font-semibold uppercase tracking-wider text-primary/80 bg-primary/5">
                Time
              </TableHead>
              <TableHead className="w-[80px] border-r border-border/50 py-2 text-xs font-semibold uppercase tracking-wider text-primary/80 bg-primary/5">
                Room
              </TableHead>
              <TableHead className="min-w-[180px] border-r border-border/50 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20">
                Lab Faculty
              </TableHead>
              <TableHead className="w-[120px] border-r border-border/50 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20">
                Time
              </TableHead>
              <TableHead className="w-[80px] py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20">
                Room
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item) => (
              <TableRow
                key={item.section}
                className={cn(
                  'group border-b border-border/50 last:border-0 transition-colors',
                  'hover:bg-muted/5'
                )}
              >
                <TableCell className="text-center font-bold text-sm text-foreground/70 bg-muted/5 border-r border-border/50 py-3">
                  {String(item.section).padStart(2, '0')}
                </TableCell>
                <TableCell className="border-r border-border/50 py-3">
                  <div className="flex flex-col gap-1">
                    <CellContent text={item.theory.faculty} icon={BookOpen} />
                    <EmailLink email={item.theory.email} />
                  </div>
                </TableCell>
                <TableCell className="border-r border-border/50 py-3">
                  <div className="flex flex-col gap-1.5 items-start">
                    <BadgeCell text={item.theory.days} variant="secondary" />
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.theory.time}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="border-r border-border/50 py-3">
                  <BadgeCell text={item.theory.room} variant="outline" />
                </TableCell>
                <TableCell className="border-r border-border/50 py-3 bg-muted/5">
                  <div className="flex flex-col gap-1">
                    <CellContent text={item.lab.faculty} icon={Monitor} />
                    <EmailLink email={item.lab.email} />
                  </div>
                </TableCell>
                <TableCell className="border-r border-border/50 py-3 bg-muted/5">
                  <div className="flex flex-col gap-1.5 items-start">
                    <BadgeCell text={item.lab.days} variant="secondary" />
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.lab.time}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 bg-muted/5">
                  <BadgeCell text={item.lab.room} variant="outline" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* ── Mobile View ── */

function MobileView({ schedule }: { schedule: ClassScheduleItem[] }) {
  return (
    <div className="lg:hidden space-y-3">
      {schedule.map((item) => (
        <Card
          key={item.section}
          className="overflow-hidden border-border/60 shadow-sm"
        >
          <div className="flex flex-col divide-y divide-border/50">
            <div className="px-4 py-2 bg-muted/20 flex items-center justify-between">
              <Badge
                variant="outline"
                className="bg-background font-mono text-xs"
              >
                Sec {String(item.section).padStart(2, '0')}
              </Badge>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border/50">
              <div className="p-3 space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                  <BookOpen className="w-3 h-3" /> Theory
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold line-clamp-1">
                    {item.theory.faculty}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    {item.theory.days} • {item.theory.time}
                  </div>
                  <div className="text-[10px] font-medium bg-muted/30 w-fit px-1.5 rounded">
                    {item.theory.room}
                  </div>
                </div>
              </div>
              <div className="p-3 space-y-2 bg-muted/5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <Monitor className="w-3 h-3" /> Lab
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold line-clamp-1">
                    {item.lab.faculty}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    {item.lab.days} • {item.lab.time}
                  </div>
                  <div className="text-[10px] font-medium bg-muted/30 w-fit px-1.5 rounded">
                    {item.lab.room}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ── Main Component ── */

interface ScheduleTableProps {
  schedule: ClassScheduleItem[];
  /** e.g. "Spring 2026 Semester" — derived from course metadata */
  semesterLabel?: string;
}

export function ScheduleTable({ schedule, semesterLabel }: ScheduleTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            Class Schedule
          </h2>
          {semesterLabel && (
            <p className="text-sm text-muted-foreground">{semesterLabel}</p>
          )}
        </div>
      </div>
      <DesktopView schedule={schedule} />
      <MobileView schedule={schedule} />
    </div>
  );
}

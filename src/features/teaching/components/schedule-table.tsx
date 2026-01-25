'use client';

import { CURRENT_SEMESTER } from '@/shared/config/constants';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { TABLES } from '@/shared/config/constants';
import { Badge } from '@/shared/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Mail, Monitor, BookOpen } from 'lucide-react';
import type { ClassScheduleItem } from '@/shared/lib/validation/schemas';
import { cn } from '@/shared/lib/utils';

interface ScheduleTableProps {
  schedule: ClassScheduleItem[];
}

export function ScheduleTable({ schedule }: ScheduleTableProps) {
  // Helper for Cell Data
  const CellContent = ({
    text,
    subtext,
    icon: Icon,
  }: {
    text: string;
    subtext?: string;
    icon?: React.ElementType;
  }) => (
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

  const EmailLink = ({ email }: { email?: string }) => {
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
  };

  const BadgeCell = ({
    text,
    variant = 'outline',
  }: {
    text: string;
    variant?: 'outline' | 'secondary' | 'default';
  }) => (
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

  // Desktop Excel-Style Grid
  const DesktopView = () => (
    <div className="hidden lg:block rounded-lg border border-border shadow-sm overflow-hidden bg-background">
      <div className="w-full overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-muted/40 sticky top-0 z-10">
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border/50">
              <TableHead
                className={`w-[${TABLES.SCHEDULE.SECTION}] text-center border-r border-border/50 h-10 py-2 text-xxs font-semibold uppercase tracking-wider text-muted-foreground`}
              >
                Sec
              </TableHead>

              {/* Theory Times */}
              <TableHead
                colSpan={2}
                className={`min-w-[${TABLES.SCHEDULE.THEORY}] border-r border-border/50 py-2 text-xxs font-semibold uppercase tracking-wider text-primary/80 bg-primary/5`}
              >
                Theory Class
              </TableHead>
              <TableHead
                className={`w-[${TABLES.SCHEDULE.LAB}] border-r border-border/50 py-2 text-xxs font-semibold uppercase tracking-wider text-primary/80 bg-primary/5`}
              >
                Theory Room
              </TableHead>
              <TableHead
                className={`w-[${TABLES.SCHEDULE.ROOM}] border-r border-border/50 py-2 text-xxs font-semibold uppercase tracking-wider text-primary/80 bg-primary/5`}
              >
                T. Room
              </TableHead>

              {/* Lab Times */}
              <TableHead
                colSpan={2}
                className={`min-w-[${TABLES.SCHEDULE.THEORY}] border-r border-border/50 py-2 text-xxs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20`}
              >
                Lab Class
              </TableHead>
              <TableHead
                className={`w-[${TABLES.SCHEDULE.LAB}] border-r border-border/50 py-2 text-xxs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20`}
              >
                Lab Room
              </TableHead>
              <TableHead
                className={`w-[${TABLES.SCHEDULE.ROOM}] py-2 text-xxs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20`}
              >
                L. Room
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item) => (
              <TableRow
                key={item.section}
                className="group border-b border-border/50 last:border-0 hover:bg-muted/5 transition-colors"
              >
                {/* Section */}
                <TableCell className="text-center font-bold text-sm text-foreground/70 bg-muted/5 border-r border-border/50 py-3">
                  {String(item.section).padStart(2, '0')}
                </TableCell>

                {/* Theory Data */}
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

                {/* Lab Data */}
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

  // Mobile Clean Card View (Vertical Stack for small screens)
  const MobileView = () => (
    <div className="lg:hidden space-y-4">
      {schedule.map((item) => (
        <Card
          key={item.section}
          className="overflow-hidden border-border/60 shadow-sm"
        >
          <CardHeader className="py-3 px-4 bg-muted/10 border-b border-border/50 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Badge variant="outline" className="bg-background">
                Sec {String(item.section).padStart(2, '0')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {/* Theory Row */}
              <div className="p-4 bg-background">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" /> Theory
                  </div>
                  <BadgeCell text={item.theory.room} />
                </div>
                <div className="space-y-1 mb-3">
                  <div className="text-sm font-medium">
                    {item.theory.faculty}
                  </div>
                  <EmailLink email={item.theory.email} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-muted/20 px-2 py-1.5 rounded w-fit">
                  <span className="font-semibold text-foreground">
                    {item.theory.days}
                  </span>
                  <span className="h-3 w-px bg-border" />
                  <span>{item.theory.time}</span>
                </div>
              </div>

              {/* Lab Row */}
              <div className="p-4 bg-muted/5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <Monitor className="w-3.5 h-3.5" /> Lab
                  </div>
                  <BadgeCell text={item.lab.room} />
                </div>
                <div className="space-y-1 mb-3">
                  <div className="text-sm font-medium">{item.lab.faculty}</div>
                  <EmailLink email={item.lab.email} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-muted/20 px-2 py-1.5 rounded w-fit">
                  <span className="font-semibold text-foreground">
                    {item.lab.days}
                  </span>
                  <span className="h-3 w-px bg-border" />
                  <span>{item.lab.time}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            Class Schedule
          </h2>
          <p className="text-sm text-muted-foreground">
            {CURRENT_SEMESTER} Semester
          </p>
        </div>
      </div>
      <DesktopView />
      <MobileView />
    </div>
  );
}

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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Mail, MapPin, Clock, Calendar, Laptop } from 'lucide-react';
import type { ClassScheduleItem } from '@/shared/lib/validation/schemas';

interface ScheduleTableProps {
  schedule: ClassScheduleItem[];
}

export function ScheduleTable({ schedule }: ScheduleTableProps) {
  // Desktop Table View
  const DesktopView = () => (
    <div className="hidden md:block rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[80px] text-center">Sec</TableHead>
            <TableHead>Theory Details</TableHead>
            <TableHead>Lab Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((item) => (
            <TableRow key={item.section} className="hover:bg-muted/5">
              <TableCell className="text-center font-bold text-lg text-primary">
                {item.section}
              </TableCell>

              {/* Theory Column */}
              <TableCell className="align-top py-4">
                <div className="space-y-2">
                  <div className="font-semibold text-base">
                    {item.theory.faculty}
                  </div>
                  {item.theory.email && (
                    <a
                      href={`mailto:${item.theory.email}`}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors w-fit"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {item.theory.email}
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="font-mono text-xs flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      {item.theory.days}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs flex items-center gap-1 bg-primary/5"
                    >
                      <Clock className="w-3 h-3" />
                      {item.theory.time}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="font-mono text-xs flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      {item.theory.room}
                    </Badge>
                  </div>
                </div>
              </TableCell>

              {/* Lab Column */}
              <TableCell className="align-top py-4 bg-muted/5">
                <div className="space-y-2">
                  <div className="font-semibold text-base">
                    {item.lab.faculty}
                  </div>
                  {item.lab.email && (
                    <a
                      href={`mailto:${item.lab.email}`}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors w-fit"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {item.lab.email}
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="font-mono text-xs flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      {item.lab.days}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs flex items-center gap-1 bg-primary/5"
                    >
                      <Clock className="w-3 h-3" />
                      {item.lab.time}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="font-mono text-xs flex items-center gap-1"
                    >
                      <Laptop className="w-3 h-3" />
                      {item.lab.room}
                    </Badge>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  // Mobile Card View
  const MobileView = () => (
    <div className="md:hidden space-y-4">
      {schedule.map((item) => (
        <Card key={item.section} className="border-l-4 border-l-primary">
          <CardHeader className="py-3 bg-muted/20 border-b">
            <CardTitle className="text-base flex justify-between items-center">
              <span>Section {item.section}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            {/* Theory Block */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Theory Class
              </h4>
              <div className="pl-3.5 border-l border-border/50 space-y-2">
                <div className="font-medium">{item.theory.faculty}</div>
                {item.theory.email && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    {item.theory.email}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="outline" className="text-xs">
                    {item.theory.days}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-primary/5">
                    {item.theory.time}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.theory.room}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Lab Block */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                Lab Session
              </h4>
              <div className="pl-3.5 border-l border-border/50 space-y-2">
                <div className="font-medium">{item.lab.faculty}</div>
                {item.lab.email && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    {item.lab.email}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="outline" className="text-xs">
                    {item.lab.days}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-primary/5">
                    {item.lab.time}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.lab.room}
                  </Badge>
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
          <h2 className="text-2xl font-bold tracking-tight">Class Schedule</h2>
          <p className="text-muted-foreground">Spring 2026 Semester Details</p>
        </div>
        <Badge variant="outline" className="hidden sm:flex">
          {schedule.length} Sections
        </Badge>
      </div>
      <DesktopView />
      <MobileView />
    </div>
  );
}

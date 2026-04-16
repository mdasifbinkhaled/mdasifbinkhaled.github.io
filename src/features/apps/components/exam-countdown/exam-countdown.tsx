'use client';

import { useState, useEffect, useCallback } from 'react';
import { Timer, Plus, Trash2, CalendarDays, Download } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { toast } from 'sonner';
import { downloadFile } from '@/shared/lib/download-file';

interface ExamEvent {
  id: string;
  course: string;
  title: string;
  date: string; // ISO string format
}

const DEFAULT_EXAMS: ExamEvent[] = [
  {
    id: '1',
    course: 'CSE 420',
    title: 'Midterm Examination',
    date: new Date(
      new Date().getTime() + 14 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }, // +14 days
  {
    id: '2',
    course: 'CSE 211',
    title: 'Final Examination',
    date: new Date(
      new Date().getTime() + 45 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }, // +45 days
];

export function ExamCountdown() {
  const [exams, setExams] = useState<ExamEvent[]>([]);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date().getTime());

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('abk_exam_countdown');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExams(JSON.parse(saved));
      } catch {
        setExams(DEFAULT_EXAMS);
      }
    } else {
      setExams(DEFAULT_EXAMS);
    }
    setMounted(true);
  }, []);

  // Timer tick
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setNow(new Date().getTime()), 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Persist to local storage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('abk_exam_countdown', JSON.stringify(exams));
    }
  }, [exams, mounted]);

  const handleAdd = useCallback(() => {
    setExams((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        course: '',
        title: 'New Exam',
        date: new Date().toISOString().slice(0, 16),
      },
    ]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleChange = useCallback(
    (id: string, field: keyof ExamEvent, value: string) => {
      setExams((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
      );
    },
    []
  );

  const handleExportICS = useCallback(() => {
    const upcoming = exams.filter(
      (e) => new Date(e.date).getTime() > Date.now()
    );
    if (upcoming.length === 0) {
      toast.error('No upcoming exams to export');
      return;
    }
    const formatICS = (d: Date) =>
      d
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '');
    const events = upcoming
      .map((e) => {
        const start = new Date(e.date);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        return [
          'BEGIN:VEVENT',
          `DTSTART:${formatICS(start)}`,
          `DTEND:${formatICS(end)}`,
          `SUMMARY:${e.course} - ${e.title}`,
          `DESCRIPTION:${e.course} ${e.title}`,
          'END:VEVENT',
        ].join('\r\n');
      })
      .join('\r\n');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ABK//ExamCountdown//EN',
      events,
      'END:VCALENDAR',
    ].join('\r\n');
    downloadFile(ics, 'exam-schedule.ics', 'text/calendar;charset=utf-8');
    toast.success(`Exported ${upcoming.length} exam(s) to .ics`);
  }, [exams]);

  if (!mounted) return null;

  // Sort exams by chronological proximity
  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary" />
          Active Timers
        </h2>
        <div className="flex gap-2">
          <Button onClick={handleAdd} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Exam
          </Button>
          {exams.length > 0 && (
            <Button onClick={handleExportICS} size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export .ics
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedExams.map((exam, i) => {
          const target = new Date(exam.date).getTime();
          const diff = target - now;
          const isPassed = diff < 0;

          const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (Math.abs(diff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const mins = Math.floor(
            (Math.abs(diff) % (1000 * 60 * 60)) / (1000 * 60)
          );
          const secs = Math.floor((Math.abs(diff) % (1000 * 60)) / 1000);

          // Urgency color based on days remaining
          const urgencyClass = isPassed
            ? 'opacity-60 border-muted'
            : days <= 1
              ? 'border-red-500/50 shadow-red-500/10 shadow-md'
              : days <= 3
                ? 'border-orange-500/40 shadow-orange-500/10 shadow-sm'
                : days <= 7
                  ? 'border-amber-500/30 shadow-xs'
                  : 'border-primary/20 shadow-xs';

          const accentColor = isPassed
            ? 'bg-muted'
            : days <= 1
              ? 'bg-red-500'
              : days <= 3
                ? 'bg-orange-500'
                : days <= 7
                  ? 'bg-amber-500'
                  : 'bg-primary';

          const countdownColor = isPassed
            ? 'text-muted-foreground'
            : days <= 1
              ? 'text-red-600 dark:text-red-400'
              : days <= 3
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-foreground';

          return (
            <Card
              key={exam.id}
              className={`relative overflow-hidden transition-all ${urgencyClass}`}
            >
              {!isPassed && (
                <div
                  className={`absolute top-0 right-0 w-1 h-full ${accentColor}`}
                />
              )}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Input
                    value={exam.course}
                    placeholder="Course Code"
                    aria-label={`Course code for exam ${i + 1}`}
                    onChange={(e) =>
                      handleChange(exam.id, 'course', e.target.value)
                    }
                    className="font-bold border-transparent px-0 h-7 text-lg bg-transparent focus-visible:ring-0 focus-visible:border-input shadow-none"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${exam.course || 'exam'}`}
                    onClick={() => handleRemove(exam.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={exam.title}
                  placeholder="Exam Title"
                  aria-label={`Exam title for ${exam.course || `exam ${i + 1}`}`}
                  onChange={(e) =>
                    handleChange(exam.id, 'title', e.target.value)
                  }
                  className="border-transparent px-0 h-6 text-sm text-muted-foreground bg-transparent focus-visible:ring-0 focus-visible:border-input shadow-none"
                />
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    {isPassed ? 'Concluded' : 'Time Remaining'}
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center w-full">
                    <div className="flex flex-col">
                      <span
                        className={`text-2xl sm:text-3xl font-bold tabular-nums ${countdownColor}`}
                      >
                        {days}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase mt-1">
                        Days
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-2xl sm:text-3xl font-bold tabular-nums ${countdownColor}`}
                      >
                        {hours.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase mt-1">
                        Hours
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-2xl sm:text-3xl font-bold tabular-nums ${countdownColor}`}
                      >
                        {mins.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase mt-1">
                        Mins
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-2xl sm:text-3xl font-bold tabular-nums ${isPassed ? 'text-muted-foreground' : days <= 1 ? 'text-red-500' : 'text-primary'}`}
                      >
                        {secs.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase mt-1">
                        Secs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Target Date & Time
                  </label>
                  <Input
                    type="datetime-local"
                    aria-label={`Target date and time for ${exam.course || `exam ${i + 1}`}`}
                    value={exam.date.slice(0, 16)} // format: YYYY-MM-DDThh:mm
                    onChange={(e) =>
                      handleChange(
                        exam.id,
                        'date',
                        new Date(e.target.value).toISOString()
                      )
                    }
                    className="text-sm h-9"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}

        {exams.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl border-border">
            <CalendarDays className="mx-auto h-8 w-8 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium text-foreground">
              No Exams Tracked
            </h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              You have no upcoming exams. Add one to start the countdown.
            </p>
            <Button onClick={handleAdd} variant="outline">
              Add First Exam
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

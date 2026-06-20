'use client';

// ────────────────────────────────────────────────
// Exam Countdown — state management hook
// ────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { downloadFile } from '@/shared/lib/download-file';
import { writeIcs } from '@/shared/lib/ics';
import { useToolStorage } from '@/shared/lib/storage';
import type { ImportCommitMeta } from '@/shared/lib/parsers/types';
import {
  DEFAULT_EXAMS,
  EXAM_TOOL_SLUG,
  toLocalInputValue,
  type ExamEvent,
  type ExamKey,
} from './exam-countdown.utils';

export function useExamCountdown() {
  const [exams, setExams, { ready: mounted }] = useToolStorage<ExamEvent[]>(
    EXAM_TOOL_SLUG,
    'events',
    DEFAULT_EXAMS
  );
  const [now, setNow] = useState(new Date().getTime());
  const [importOpen, setImportOpen] = useState(false);

  // Timer tick
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setNow(new Date().getTime()), 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  const handleAdd = useCallback(() => {
    setExams((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        course: '',
        title: 'New Exam',
        date: toLocalInputValue(new Date()),
      },
    ]);
  }, [setExams]);

  const handleRemove = useCallback(
    (id: string) => {
      setExams((prev) => prev.filter((e) => e.id !== id));
    },
    [setExams]
  );

  const handleChange = useCallback(
    (id: string, field: keyof ExamEvent, value: string) => {
      setExams((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
      );
    },
    [setExams]
  );

  const handleExportICS = useCallback(() => {
    const upcoming = exams.filter(
      (e) => new Date(e.date).getTime() > Date.now()
    );
    if (upcoming.length === 0) {
      toast.error('No upcoming exams to export');
      return;
    }
    const ics = writeIcs(
      upcoming.map((e) => ({
        start: new Date(e.date),
        summary: `${e.course} - ${e.title}`,
        description: `${e.course} ${e.title}`,
        uid: `exam-${e.id}@apps-hub.local`,
      })),
      { prodId: '-//ABK//ExamCountdown//EN' }
    );
    downloadFile(ics, 'exam-schedule.ics', 'text/calendar;charset=utf-8');
    toast.success(`Exported ${upcoming.length} exam(s) to .ics`);
  }, [exams]);

  const handleImportExams = useCallback(
    (rows: Record<ExamKey, unknown>[], meta: ImportCommitMeta) => {
      const incoming: ExamEvent[] = rows.map((r) => ({
        id: crypto.randomUUID(),
        course: String(r.course ?? '').trim(),
        title: String(r.title ?? '').trim(),
        date: String(r.date ?? ''),
      }));
      setExams((prev) => {
        if (meta.mergeStrategy === 'replace') return incoming;
        if (meta.mergeStrategy === 'append') return [...prev, ...incoming];
        // merge on (course + title + date) composite key
        const keyOf = (e: ExamEvent) =>
          `${e.course.toLowerCase()}|${e.title.toLowerCase()}|${e.date}`;
        const map = new Map(prev.map((e) => [keyOf(e), e] as const));
        for (const e of incoming) map.set(keyOf(e), e);
        return Array.from(map.values());
      });
      toast.success(`Imported ${incoming.length} exam(s)`);
    },
    [setExams]
  );

  const handleReset = useCallback(() => {
    setExams(DEFAULT_EXAMS);
  }, [setExams]);

  return {
    exams,
    setExams,
    now,
    mounted,
    importOpen,
    setImportOpen,
    handleAdd,
    handleRemove,
    handleChange,
    handleExportICS,
    handleImportExams,
    handleReset,
  };
}

export type ExamCountdownState = ReturnType<typeof useExamCountdown>;

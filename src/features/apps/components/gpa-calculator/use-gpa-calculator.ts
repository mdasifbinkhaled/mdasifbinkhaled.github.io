'use client';

// ────────────────────────────────────────────────
// GPA Calculator — state management hook
// ────────────────────────────────────────────────

import { useMemo, useCallback, useState } from 'react';
import { useToolStorage } from '@/shared/lib/storage';
import { toast } from 'sonner';
import type { ImportCommitMeta } from '@/shared/lib/parsers/types';
import {
  GPA_TOOL_SLUG,
  DEFAULT_COURSES,
  computeGpa,
  type CourseEntry,
  type TranscriptKey,
} from './gpa-calculator.utils';

export function useGpaCalculator() {
  const [courses, setCourses, { ready: coursesReady }] = useToolStorage<
    CourseEntry[]
  >(GPA_TOOL_SLUG, 'courses', DEFAULT_COURSES);

  const [prevCredits, setPrevCredits, { ready: pcReady }] = useToolStorage<
    number | ''
  >(GPA_TOOL_SLUG, 'prev_credits', '');
  const [prevCgpa, setPrevCgpa, { ready: pgReady }] = useToolStorage<
    number | ''
  >(GPA_TOOL_SLUG, 'prev_cgpa', '');

  const [importOpen, setImportOpen] = useState(false);

  const handleResetAll = useCallback(() => {
    setCourses(DEFAULT_COURSES);
    setPrevCredits('');
    setPrevCgpa('');
  }, [setCourses, setPrevCredits, setPrevCgpa]);

  const handleImportTranscript = useCallback(
    (rows: Record<TranscriptKey, unknown>[], meta: ImportCommitMeta) => {
      const incoming: CourseEntry[] = rows.map((r) => ({
        id: crypto.randomUUID(),
        name: String(r.name ?? ''),
        credits: Number(r.credits) || 0,
        // Don't invent a grade — a missing grade is left blank and excluded from
        // the GPA (surfaced via ignoredCount) rather than silently scored as 'A'.
        grade: String(r.grade ?? ''),
      }));
      setCourses((prev) => {
        if (meta.mergeStrategy === 'replace') return incoming;
        if (meta.mergeStrategy === 'append') return [...prev, ...incoming];
        // merge on trimmed lowercase name
        const map = new Map(
          prev.map((c) => [c.name.trim().toLowerCase(), c] as const)
        );
        for (const c of incoming) {
          map.set(c.name.trim().toLowerCase(), c);
        }
        return Array.from(map.values());
      });
      toast.success(`Imported ${incoming.length} course(s)`);
    },
    [setCourses]
  );

  const handleAddCourse = useCallback(() => {
    setCourses((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: '', credits: 3, grade: 'A' },
    ]);
  }, [setCourses]);

  const handleRemoveCourse = useCallback(
    (id: string) => {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    },
    [setCourses]
  );

  const handleCourseChange = useCallback(
    (id: string, field: keyof CourseEntry, value: string | number) => {
      setCourses((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          if (field === 'credits') {
            const num =
              typeof value === 'number' ? value : parseFloat(value) || 0;
            return { ...c, credits: Math.min(6, Math.max(0, num)) };
          }
          return { ...c, [field]: value };
        })
      );
    },
    [setCourses]
  );

  const { termGpa, termCredits, cgpa, totalCredits, ignoredCount } = useMemo(
    () => computeGpa(courses, prevCredits, prevCgpa),
    [courses, prevCredits, prevCgpa]
  );

  const handleCopyResult = useCallback(() => {
    const lines = courses
      .filter((c) => c.credits > 0)
      .map((c) => `${c.name || 'Course'}: ${c.grade} (${c.credits} cr)`);
    const text = [
      'GPA Calculator Results',
      '─'.repeat(30),
      ...lines,
      '',
      `Term GPA: ${termGpa.toFixed(2)} (${termCredits} credits)`,
      ...(typeof prevCredits === 'number' && typeof prevCgpa === 'number'
        ? [`Projected CGPA: ${cgpa.toFixed(2)} (${totalCredits} total credits)`]
        : []),
    ].join('\n');
    navigator.clipboard.writeText(text).then(
      () => toast.success('Results copied to clipboard'),
      () => toast.error('Failed to copy')
    );
  }, [
    courses,
    termGpa,
    termCredits,
    cgpa,
    totalCredits,
    prevCredits,
    prevCgpa,
  ]);

  const mounted = coursesReady && pcReady && pgReady;

  return {
    // state
    courses,
    prevCredits,
    prevCgpa,
    importOpen,
    mounted,
    // derived
    termGpa,
    termCredits,
    cgpa,
    totalCredits,
    ignoredCount,
    // setters
    setPrevCredits,
    setPrevCgpa,
    setImportOpen,
    // handlers
    handleResetAll,
    handleImportTranscript,
    handleAddCourse,
    handleRemoveCourse,
    handleCourseChange,
    handleCopyResult,
  };
}

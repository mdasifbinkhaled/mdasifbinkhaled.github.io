'use client';

import { useMemo, useCallback, useState } from 'react';
import {
  Plus,
  Trash2,
  Calculator,
  Settings2,
  Copy,
  FileUp,
} from 'lucide-react';
import { STANDARD_GRADING_SCALE } from '@/shared/lib/data/grading';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useToolStorage } from '@/shared/lib/storage';
import { ToolSettings } from '@/shared/components/common/tool-settings';
import { DataImporter } from '@/shared/components/common/data-importer';
import type { SchemaField, ImportCommitMeta } from '@/shared/lib/parsers/types';
import { toast } from 'sonner';

type TranscriptKey = 'name' | 'credits' | 'grade';

const TRANSCRIPT_FIELDS: readonly SchemaField<TranscriptKey>[] = [
  {
    key: 'name',
    label: 'Course',
    required: true,
    aliases: ['course', 'course name', 'course title', 'name', 'code'],
  },
  {
    key: 'credits',
    label: 'Credits',
    required: true,
    aliases: ['credits', 'credit', 'cr', 'cr.', 'units'],
    parse: (raw) => {
      const n = Number(raw);
      if (!Number.isFinite(n) || n <= 0 || n > 6) {
        throw new Error(`invalid credits "${raw}"`);
      }
      return n;
    },
  },
  {
    key: 'grade',
    label: 'Grade',
    required: true,
    aliases: ['grade', 'letter', 'letter grade', 'mark'],
    parse: (raw) => {
      const s = String(raw).trim().toUpperCase();
      const match = STANDARD_GRADING_SCALE.find((g) => g.label === s);
      if (!match) throw new Error(`unknown grade "${raw}"`);
      return match.label;
    },
  },
];

interface CourseEntry {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const GPA_TOOL_SLUG = 'gpa-calculator';

const DEFAULT_COURSES: CourseEntry[] = [
  { id: '1', name: '', credits: 3, grade: 'A' },
  { id: '2', name: '', credits: 3, grade: 'B+' },
  { id: '3', name: '', credits: 3, grade: 'A-' },
];

export function GpaCalculator() {
  const [courses, setCourses, { ready: coursesReady }] = useToolStorage<
    CourseEntry[]
  >(GPA_TOOL_SLUG, 'courses', DEFAULT_COURSES);

  const [prevCredits, setPrevCredits, { ready: pcReady }] = useToolStorage<
    number | ''
  >(GPA_TOOL_SLUG, 'prev_credits', '');
  const [prevCgpa, setPrevCgpa, { ready: pgReady }] = useToolStorage<
    number | ''
  >(GPA_TOOL_SLUG, 'prev_cgpa', '');

  const handleResetAll = useCallback(() => {
    setCourses(DEFAULT_COURSES);
    setPrevCredits('');
    setPrevCgpa('');
  }, [setCourses, setPrevCredits, setPrevCgpa]);

  const [importOpen, setImportOpen] = useState(false);

  const handleImportTranscript = useCallback(
    (rows: Record<TranscriptKey, unknown>[], meta: ImportCommitMeta) => {
      const incoming: CourseEntry[] = rows.map((r) => ({
        id: crypto.randomUUID(),
        name: String(r.name ?? ''),
        credits: Number(r.credits) || 0,
        grade: String(r.grade ?? 'A'),
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

  const { termGpa, termCredits, cgpa, totalCredits } = useMemo(() => {
    let currentGradePoints = 0;
    let currentCredits = 0;

    courses.forEach((course) => {
      const scaleMatch = STANDARD_GRADING_SCALE.find(
        (s) => s.label === course.grade
      );
      if (scaleMatch && course.credits > 0) {
        currentGradePoints += scaleMatch.gpa * course.credits;
        currentCredits += course.credits;
      }
    });

    const termGpaCalc =
      currentCredits > 0 ? currentGradePoints / currentCredits : 0;

    let finalCgpa = termGpaCalc;
    let finalTotalCredits = currentCredits;

    if (
      typeof prevCredits === 'number' &&
      typeof prevCgpa === 'number' &&
      prevCredits > 0
    ) {
      const pastGradePoints = prevCredits * prevCgpa;
      finalTotalCredits = prevCredits + currentCredits;
      finalCgpa = (pastGradePoints + currentGradePoints) / finalTotalCredits;
    }

    return {
      termGpa: termGpaCalc,
      termCredits: currentCredits,
      cgpa: finalCgpa,
      totalCredits: finalTotalCredits,
    };
  }, [courses, prevCredits, prevCgpa]);

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

  if (!coursesReady || !pcReady || !pgReady) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-2 print:hidden">
        <Button size="sm" variant="outline" onClick={() => setImportOpen(true)}>
          <FileUp className="h-4 w-4 mr-1" /> Import transcript
        </Button>
        <ToolSettings
          toolName="GPA Calculator"
          toolSlug={GPA_TOOL_SLUG}
          onReset={handleResetAll}
        />
      </div>
      <DataImporter<TranscriptKey>
        open={importOpen}
        onOpenChange={setImportOpen}
        fields={TRANSCRIPT_FIELDS}
        title="Import transcript"
        description="Paste your transcript rows or upload a CSV/XLSX. Columns: Course, Credits, Grade."
        pastePlaceholder={
          'Course\tCredits\tGrade\nCSE 420\t3\tA\nMAT 216\t3\tB+'
        }
        onCommit={handleImportTranscript}
      />
      <div className="grid gap-6 md:grid-cols-[2fr_1fr] print:block">
        {/* ── Editor Column ── */}
        <div className="space-y-6">
          <Card className="shadow-xs">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Semester Courses</CardTitle>
                  <CardDescription>
                    Enter course names, credits, and expected grades.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleAddCourse}>
                  <Plus className="mr-2 h-4 w-4" /> Add Course
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="hidden sm:grid grid-cols-[1fr_80px_100px_40px] gap-4 px-2 text-sm font-medium text-muted-foreground">
                <div>Course Name</div>
                <div>Credits</div>
                <div>Grade</div>
                <div></div>
              </div>

              {courses.map((course, i) => (
                <div
                  key={course.id}
                  className="grid sm:grid-cols-[1fr_80px_100px_40px] gap-3 sm:gap-4 items-center group bg-muted/30 sm:bg-transparent p-3 sm:p-0 rounded-md border sm:border-0 border-border/50"
                >
                  <Input
                    placeholder={`Course ${i + 1} (optional)`}
                    aria-label={`Course ${i + 1} name`}
                    value={course.name}
                    onChange={(e) =>
                      handleCourseChange(course.id, 'name', e.target.value)
                    }
                    className="bg-background"
                  />
                  <Input
                    type="number"
                    min="0"
                    max="6"
                    step="0.5"
                    aria-label={`Course ${i + 1} credits`}
                    value={course.credits}
                    onChange={(e) =>
                      handleCourseChange(
                        course.id,
                        'credits',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="bg-background font-mono"
                  />
                  <Select
                    value={course.grade}
                    onValueChange={(v) =>
                      handleCourseChange(course.id, 'grade', v)
                    }
                  >
                    <SelectTrigger
                      aria-label="Grade"
                      className="bg-background font-medium"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STANDARD_GRADING_SCALE.map((g) => (
                        <SelectItem key={g.label} value={g.label}>
                          {g.label} ({g.gpa.toFixed(1)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive w-full sm:w-10 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveCourse(course.id)}
                    aria-label="Remove Course"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {courses.length === 0 && (
                <div className="text-center py-6 border-2 border-dashed rounded-md text-muted-foreground text-sm">
                  No courses added. Click 'Add Course' to begin.
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Cumulative Configuration ── */}
          <Card className="shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-muted-foreground" />
                Cumulative GPA (CGPA) Configuration
              </CardTitle>
              <CardDescription>
                Optionally enter your previous academic standing to calculate
                combined outcome.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Previous Total Credits
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 104"
                    min="0"
                    value={prevCredits}
                    onChange={(e) =>
                      setPrevCredits(
                        e.target.value ? parseFloat(e.target.value) : ''
                      )
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Previous CGPA
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 3.45"
                    min="0"
                    max="4.0"
                    step="0.01"
                    value={prevCgpa}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setPrevCgpa('');
                      } else {
                        const v = parseFloat(e.target.value);
                        setPrevCgpa(Math.min(4.0, Math.max(0, v)));
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Results Column ── */}
        <div className="space-y-6 md:sticky md:top-24 h-fit">
          <Card className="border-primary/20 bg-primary/5 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Results Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Term GPA
                </div>
                <div className="text-4xl font-bold tabular-nums tracking-tight text-foreground">
                  {termGpa.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1 text-balance">
                  Based on {termCredits} new credits this semester.
                </div>
              </div>

              {typeof prevCredits === 'number' &&
                typeof prevCgpa === 'number' && (
                  <>
                    <div className="h-px w-full bg-border" />
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Projected CGPA
                      </div>
                      <div className="text-3xl font-extrabold tabular-nums tracking-tight text-primary">
                        {cgpa.toFixed(2)}
                      </div>
                      <div className="text-sm text-primary/80 mt-1">
                        Based on {totalCredits} total accumulated credits.
                      </div>
                    </div>
                  </>
                )}

              <Button
                className="w-full mt-4"
                onClick={handleCopyResult}
                variant="secondary"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Results
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

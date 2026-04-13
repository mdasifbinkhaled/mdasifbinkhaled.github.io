'use client';

import { useState, useMemo, useCallback } from 'react';
import { Plus, Trash2, Calculator, Settings2 } from 'lucide-react';
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

interface CourseEntry {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export function GpaCalculator() {
  const [courses, setCourses] = useState<CourseEntry[]>([
    { id: crypto.randomUUID(), name: '', credits: 3, grade: 'A' },
    { id: crypto.randomUUID(), name: '', credits: 3, grade: 'B+' },
    { id: crypto.randomUUID(), name: '', credits: 3, grade: 'A-' },
  ]);

  const [prevCredits, setPrevCredits] = useState<number | ''>('');
  const [prevCgpa, setPrevCgpa] = useState<number | ''>('');

  const handleAddCourse = useCallback(() => {
    setCourses((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: '', credits: 3, grade: 'A' },
    ]);
  }, []);

  const handleRemoveCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleCourseChange = useCallback(
    (id: string, field: keyof CourseEntry, value: string | number) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
      );
    },
    []
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

  return (
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
                <select
                  aria-label="Grade"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={course.grade}
                  onChange={(e) =>
                    handleCourseChange(course.id, 'grade', e.target.value)
                  }
                >
                  {STANDARD_GRADING_SCALE.map((g) => (
                    <option key={g.label} value={g.label}>
                      {g.label} ({g.gpa.toFixed(1)})
                    </option>
                  ))}
                </select>
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
                  onChange={(e) =>
                    setPrevCgpa(
                      e.target.value ? parseFloat(e.target.value) : ''
                    )
                  }
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
              onClick={() => window.print()}
              variant="secondary"
            >
              Print Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

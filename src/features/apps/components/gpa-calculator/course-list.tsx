'use client';

// ────────────────────────────────────────────────
// GPA Calculator — Semester Courses editor card
// ────────────────────────────────────────────────

import { Plus, Trash2 } from 'lucide-react';
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
import type { CourseEntry } from './gpa-calculator.utils';

interface CourseListProps {
  courses: CourseEntry[];
  onAddCourse: () => void;
  onRemoveCourse: (id: string) => void;
  onCourseChange: (
    id: string,
    field: keyof CourseEntry,
    value: string | number
  ) => void;
}

export function CourseList({
  courses,
  onAddCourse,
  onRemoveCourse,
  onCourseChange,
}: CourseListProps) {
  return (
    <Card className="shadow-xs">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Semester Courses</CardTitle>
            <CardDescription>
              Enter course names, credits, and expected grades.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onAddCourse}>
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
                onCourseChange(course.id, 'name', e.target.value)
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
                onCourseChange(
                  course.id,
                  'credits',
                  parseFloat(e.target.value) || 0
                )
              }
              className="bg-background font-mono"
            />
            <Select
              value={course.grade}
              onValueChange={(v) => onCourseChange(course.id, 'grade', v)}
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
              onClick={() => onRemoveCourse(course.id)}
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
  );
}

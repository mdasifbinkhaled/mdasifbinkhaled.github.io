'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  Download,
} from 'lucide-react';
import { downloadFile } from '@/shared/lib/download-file';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { usePersistedState } from '@/shared/hooks';
import type { PlannerCourse } from './types';
import { PRESETS } from './presets';
import { topoLevels, getUnlocked } from './topo-sort';
import { toast } from 'sonner';

const STORAGE_KEY = 'abk_course_planner';

export function CoursePlanner() {
  const [courses, setCourses, { ready: mounted }] = usePersistedState<
    PlannerCourse[]
  >(STORAGE_KEY, []);
  const [showAdd, setShowAdd] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCredits, setNewCredits] = useState('3');
  const [newPrereqs, setNewPrereqs] = useState('');

  const levels = useMemo(() => topoLevels(courses), [courses]);
  const unlocked = useMemo(() => getUnlocked(courses), [courses]);
  const unlockedIds = useMemo(
    () => new Set(unlocked.map((c) => c.id)),
    [unlocked]
  );
  const completedIds = useMemo(
    () => new Set(courses.filter((c) => c.completed).map((c) => c.id)),
    [courses]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
      );
    },
    [setCourses]
  );

  const removeCourse = useCallback(
    (id: string) => {
      setCourses((prev) => {
        const remaining = prev.filter((c) => c.id !== id);
        // Also remove this ID from any prerequisites
        return remaining.map((c) => ({
          ...c,
          prerequisites: c.prerequisites.filter((pid) => pid !== id),
        }));
      });
    },
    [setCourses]
  );

  const addCourse = useCallback(() => {
    if (!newCode.trim() || !newTitle.trim()) return;
    const prereqIds = newPrereqs
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    // Match prereq codes to existing IDs
    const resolvedPrereqs = prereqIds
      .map((code) => courses.find((c) => c.code.toLowerCase() === code)?.id)
      .filter((id): id is string => !!id);

    const course: PlannerCourse = {
      id: crypto.randomUUID(),
      code: newCode.trim().toUpperCase(),
      title: newTitle.trim(),
      credits: parseInt(newCredits, 10) || 3,
      prerequisites: resolvedPrereqs,
      completed: false,
    };
    setCourses((prev) => [...prev, course]);
    setNewCode('');
    setNewTitle('');
    setNewCredits('3');
    setNewPrereqs('');
    setShowAdd(false);
  }, [newCode, newTitle, newCredits, newPrereqs, courses, setCourses]);

  const loadPreset = useCallback(
    (index: number) => {
      const preset = PRESETS[index];
      if (!preset) return;
      setCourses(preset.courses.map((c) => ({ ...c, completed: false })));
    },
    [setCourses]
  );

  const resetProgress = useCallback(() => {
    setCourses((prev) => prev.map((c) => ({ ...c, completed: false })));
  }, [setCourses]);

  const handleExportJSON = useCallback(() => {
    if (courses.length === 0) {
      toast.error('No courses to export');
      return;
    }
    const data = JSON.stringify(courses, null, 2);
    downloadFile(data, 'course-plan.json', 'application/json');
    toast.success('Course plan exported');
  }, [courses]);

  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const completedCredits = courses
    .filter((c) => c.completed)
    .reduce((s, c) => s + c.credits, 0);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="flex flex-wrap gap-3">
        <Badge variant="outline" className="text-sm px-3 py-1">
          {courses.length} courses
        </Badge>
        <Badge variant="outline" className="text-sm px-3 py-1">
          {completedCredits}/{totalCredits} credits completed
        </Badge>
        <Badge
          variant="outline"
          className="text-sm px-3 py-1 border-emerald-500/50 text-emerald-700 font-bold dark:text-emerald-400"
        >
          {unlocked.length} available now
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Load Preset
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {PRESETS.map((p, i) => (
              <DropdownMenuItem key={i} onClick={() => loadPreset(i)}>
                {p.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Course
        </Button>
        <Button variant="ghost" size="sm" onClick={resetProgress}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset Progress
        </Button>
        {courses.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleExportJSON}>
            <Download className="h-4 w-4 mr-1" />
            Export JSON
          </Button>
        )}
      </div>

      {/* Add Course Form */}
      {showAdd && (
        <Card>
          <CardContent className="pt-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <Input
                placeholder="Course code (e.g. CSE 211)"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
              />
              <Input
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Credits"
                min="1"
                max="6"
                value={newCredits}
                onChange={(e) => setNewCredits(e.target.value)}
              />
              <Input
                placeholder="Prerequisites (codes, comma-sep)"
                value={newPrereqs}
                onChange={(e) => setNewPrereqs(e.target.value)}
              />
              <Button onClick={addCourse}>Add</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Topological Levels */}
      {levels.length === 0 ? (
        <Card className="bg-muted/30">
          <CardContent className="py-12 text-center text-muted-foreground">
            <p className="text-lg font-medium">No courses yet</p>
            <p className="text-sm mt-1">
              Load a preset or add courses manually to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {levels.map((level, levelIdx) => (
            <div key={levelIdx}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Level {levelIdx}{' '}
                {levelIdx === 0
                  ? '— No Prerequisites'
                  : `— Requires Level ${levelIdx - 1}+`}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {level.map((course) => {
                  const isCompleted = completedIds.has(course.id);
                  const isUnlocked = unlockedIds.has(course.id);
                  const isLocked = !isCompleted && !isUnlocked;

                  return (
                    <Card
                      key={course.id}
                      className={`transition-all ${
                        isCompleted
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : isUnlocked
                            ? 'border-primary/30 bg-primary/5'
                            : 'opacity-60'
                      }`}
                    >
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <CardTitle className="text-sm font-bold">
                              {course.code}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {course.title}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-[10px] shrink-0"
                          >
                            {course.credits}cr
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 pb-3 pt-0">
                        {course.prerequisites.length > 0 && (
                          <p className="text-[10px] text-muted-foreground mb-2">
                            Requires:{' '}
                            {course.prerequisites
                              .map(
                                (pid) =>
                                  courses.find((c) => c.id === pid)?.code ?? pid
                              )
                              .join(', ')}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            disabled={isLocked}
                            onClick={() => toggleComplete(course.id)}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400 mr-1" />
                                Done
                              </>
                            ) : isUnlocked ? (
                              <>
                                <Circle className="h-3.5 w-3.5 mr-1" />
                                Mark Done
                              </>
                            ) : (
                              <>
                                <Lock className="h-3.5 w-3.5 mr-1" />
                                Locked
                              </>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-muted-foreground hover:text-destructive"
                            onClick={() => removeCourse(course.id)}
                            aria-label={`Remove ${course.code}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

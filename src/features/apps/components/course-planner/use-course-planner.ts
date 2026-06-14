'use client';

import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { downloadFile } from '@/shared/lib/download-file';
import { useToolStorage } from '@/shared/lib/storage';
import type {
  ImportCommitMeta,
  MergeStrategy,
} from '@/shared/lib/parsers/types';
import type { PlannerCourse } from './types';
import { PRESETS } from './presets';
import { topoLevels, getUnlocked } from './topo-sort';
import {
  buildCoursePlan,
  normalizeCourseCode,
  parsePrerequisiteCodes,
  type PlannerCourseDraft,
} from './course-plan-utils';

export const COURSE_TOOL_SLUG = 'course-planner';

export type CoursePlanKey = 'code' | 'title' | 'credits' | 'prerequisites';

export function useCoursePlanner() {
  const [courses, setCourses, { ready: mounted }] = useToolStorage<
    PlannerCourse[]
  >(COURSE_TOOL_SLUG, 'courses', []);
  const [showAdd, setShowAdd] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCredits, setNewCredits] = useState('3');
  const [newPrereqs, setNewPrereqs] = useState('');
  const [importOpen, setImportOpen] = useState(false);

  const groupedCourses = useMemo(() => {
    if (courses.length === 0) return [];
    const hasGroups = courses.some((c) => c.group);
    if (!hasGroups) {
      return topoLevels(courses).map((level, idx) => ({
        label:
          idx === 0
            ? 'Level 0 — No Prerequisites'
            : `Level ${idx} — Requires Level ${idx - 1}+`,
        courses: level,
      }));
    }
    const map = new Map<string, PlannerCourse[]>();
    for (const c of courses) {
      const key = c.group ?? 'Uncategorized';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return Array.from(map.entries()).map(([label, groupCourses]) => ({
      label,
      courses: groupCourses,
    }));
  }, [courses]);

  const unlocked = useMemo(() => getUnlocked(courses), [courses]);
  const unlockedIds = useMemo(
    () => new Set(unlocked.map((c) => c.id)),
    [unlocked]
  );
  const completedIds = useMemo(
    () => new Set(courses.filter((c) => c.completed).map((c) => c.id)),
    [courses]
  );
  const codeById = useMemo(
    () => new Map(courses.map((c) => [c.id, c.code])),
    [courses]
  );

  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const completedCredits = courses
    .filter((c) => c.completed)
    .reduce((s, c) => s + c.credits, 0);

  const commitCoursePlan = useCallback(
    (drafts: PlannerCourseDraft[], mergeStrategy: MergeStrategy) => {
      const result = buildCoursePlan(drafts, {
        existingCourses: courses,
        mergeStrategy,
      });

      if (!result.ok) {
        toast.error(
          result.errors[0]?.message ?? 'Unable to update course plan.'
        );
        return false;
      }

      setCourses(result.data);
      return true;
    },
    [courses, setCourses]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      setCourses((prev) => {
        const target = prev.find((c) => c.id === id);
        if (!target) return prev;
        const nowCompleted = !target.completed;
        if (nowCompleted) {
          return prev.map((c) => (c.id === id ? { ...c, completed: true } : c));
        }
        const uncomplete = new Set<string>([id]);
        let changed = true;
        while (changed) {
          changed = false;
          for (const c of prev) {
            if (
              !uncomplete.has(c.id) &&
              c.prerequisites.some((pid) => uncomplete.has(pid))
            ) {
              uncomplete.add(c.id);
              changed = true;
            }
          }
        }
        return prev.map((c) =>
          uncomplete.has(c.id) ? { ...c, completed: false } : c
        );
      });
    },
    [setCourses]
  );

  const removeCourse = useCallback(
    (id: string) => {
      setCourses((prev) => {
        const orphans = new Set<string>();
        let changed = true;
        while (changed) {
          changed = false;
          for (const c of prev) {
            if (orphans.has(c.id) || c.id === id) continue;
            if (c.prerequisites.some((pid) => pid === id || orphans.has(pid))) {
              orphans.add(c.id);
              changed = true;
            }
          }
        }
        return prev
          .filter((c) => c.id !== id)
          .map((c) => ({
            ...c,
            completed: orphans.has(c.id) ? false : c.completed,
            prerequisites: c.prerequisites.filter((pid) => pid !== id),
          }));
      });
    },
    [setCourses]
  );

  const addCourse = useCallback(() => {
    if (!newCode.trim() || !newTitle.trim()) {
      toast.error('Course code and title are required.');
      return;
    }

    const didCommit = commitCoursePlan(
      [
        {
          code: normalizeCourseCode(newCode),
          title: newTitle.trim(),
          credits: parseInt(newCredits, 10) || 3,
          prerequisiteCodes: parsePrerequisiteCodes(newPrereqs),
        },
      ],
      'append'
    );

    if (!didCommit) return;

    setNewCode('');
    setNewTitle('');
    setNewCredits('3');
    setNewPrereqs('');
    setShowAdd(false);
  }, [newCode, newTitle, newCredits, newPrereqs, commitCoursePlan]);

  const loadPreset = useCallback(
    (name: string) => {
      const preset = PRESETS.find((p) => p.name === name);
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

  const handleImportCourses = useCallback(
    (rows: Record<CoursePlanKey, unknown>[], meta: ImportCommitMeta) => {
      const incoming: PlannerCourseDraft[] = rows.map((r) => {
        return {
          code: normalizeCourseCode(String(r.code ?? '')),
          title: String(r.title ?? '').trim(),
          credits: Number(r.credits) || 3,
          prerequisiteCodes: parsePrerequisiteCodes(
            String(r.prerequisites ?? '')
          ),
        };
      });

      const didCommit = commitCoursePlan(incoming, meta.mergeStrategy);
      if (!didCommit) return;

      toast.success(`Imported ${incoming.length} course(s)`);
    },
    [commitCoursePlan]
  );

  return {
    mounted,
    courses,
    setCourses,
    showAdd,
    setShowAdd,
    newCode,
    setNewCode,
    newTitle,
    setNewTitle,
    newCredits,
    setNewCredits,
    newPrereqs,
    setNewPrereqs,
    importOpen,
    setImportOpen,
    groupedCourses,
    unlocked,
    unlockedIds,
    completedIds,
    codeById,
    totalCredits,
    completedCredits,
    addCourse,
    loadPreset,
    resetProgress,
    handleExportJSON,
    handleImportCourses,
    toggleComplete,
    removeCourse,
  };
}

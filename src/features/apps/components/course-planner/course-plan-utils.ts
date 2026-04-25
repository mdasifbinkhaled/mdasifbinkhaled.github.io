import type { MergeStrategy } from '@/shared/lib/parsers/types';
import { err, ok, type Result } from '@/shared/lib/validation';
import type { PlannerCourse } from './types';

export interface PlannerCourseDraft {
  id?: string;
  code: string;
  title: string;
  credits: number;
  prerequisiteCodes: string[];
  completed?: boolean;
}

const MISSING_PREREQ_PREFIX = '__missing_prereq__:';

function createFallbackId(): string {
  return `course-${Math.random().toString(36).slice(2, 10)}`;
}

function createCourseId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return createFallbackId();
}

export function normalizeCourseCode(code: string): string {
  return code.trim().replace(/\s+/g, ' ').toUpperCase();
}

export function parsePrerequisiteCodes(raw: string): string[] {
  return Array.from(
    new Set(
      raw
        .split(/[,;|]/)
        .map((item) => normalizeCourseCode(item))
        .filter(Boolean)
    )
  );
}

function toExistingDrafts(courses: PlannerCourse[]): PlannerCourseDraft[] {
  const codeById = new Map(
    courses.map((course) => [course.id, normalizeCourseCode(course.code)])
  );

  return courses.map((course) => ({
    id: course.id,
    code: normalizeCourseCode(course.code),
    title: course.title.trim(),
    credits: course.credits,
    prerequisiteCodes: Array.from(
      new Set(
        course.prerequisites.map(
          (prerequisiteId) =>
            codeById.get(prerequisiteId) ??
            `${MISSING_PREREQ_PREFIX}${prerequisiteId}`
        )
      )
    ),
    completed: course.completed,
  }));
}

function toDraft(course: PlannerCourseDraft): PlannerCourseDraft {
  return {
    id: course.id,
    code: normalizeCourseCode(course.code),
    title: course.title.trim(),
    credits: Math.floor(course.credits),
    prerequisiteCodes: Array.from(
      new Set(course.prerequisiteCodes.map((item) => normalizeCourseCode(item)))
    ),
    completed: course.completed ?? false,
  };
}

function findDuplicateCodes(courses: PlannerCourseDraft[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const course of courses) {
    if (seen.has(course.code)) {
      duplicates.add(course.code);
      continue;
    }

    seen.add(course.code);
  }

  return Array.from(duplicates).sort();
}

function findDraftCycle(courses: PlannerCourseDraft[]): string[] | null {
  const graph = new Map(
    courses.map((course) => [course.code, course.prerequisiteCodes])
  );
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const stack: string[] = [];

  function visit(code: string): string[] | null {
    if (visiting.has(code)) {
      const cycleStart = stack.indexOf(code);
      return [...stack.slice(cycleStart), code];
    }
    if (visited.has(code)) return null;

    visiting.add(code);
    stack.push(code);

    for (const prerequisiteCode of graph.get(code) ?? []) {
      const cycle = visit(prerequisiteCode);
      if (cycle) return cycle;
    }

    stack.pop();
    visiting.delete(code);
    visited.add(code);
    return null;
  }

  for (const course of courses) {
    const cycle = visit(course.code);
    if (cycle) return cycle;
  }

  return null;
}

function buildBaseDrafts(
  incomingCourses: PlannerCourseDraft[],
  existingCourses: PlannerCourse[],
  mergeStrategy: MergeStrategy
): Result<PlannerCourseDraft[]> {
  const existingDrafts = toExistingDrafts(existingCourses);
  const normalizedIncoming = incomingCourses.map(toDraft);

  const incomingDuplicates = findDuplicateCodes(normalizedIncoming);
  if (incomingDuplicates.length > 0) {
    return err([
      {
        code: 'course.duplicate-code',
        message: `Duplicate course codes: ${incomingDuplicates.join(', ')}.`,
      },
    ]);
  }

  if (mergeStrategy === 'replace') {
    return ok(normalizedIncoming);
  }

  const existingCodes = new Set(existingDrafts.map((course) => course.code));

  if (mergeStrategy === 'append') {
    const overlappingCodes = normalizedIncoming
      .map((course) => course.code)
      .filter((code) => existingCodes.has(code));

    if (overlappingCodes.length > 0) {
      return err([
        {
          code: 'course.duplicate-code',
          message: `These courses already exist: ${Array.from(new Set(overlappingCodes)).join(', ')}.`,
        },
      ]);
    }

    return ok([...existingDrafts, ...normalizedIncoming]);
  }

  const merged = new Map(existingDrafts.map((course) => [course.code, course]));

  for (const course of normalizedIncoming) {
    const existingCourse = merged.get(course.code);
    merged.set(course.code, {
      ...course,
      id: existingCourse?.id ?? course.id,
      completed: existingCourse?.completed ?? course.completed ?? false,
    });
  }

  return ok(Array.from(merged.values()));
}

export function buildCoursePlan(
  incomingCourses: PlannerCourseDraft[],
  options: {
    existingCourses?: PlannerCourse[];
    mergeStrategy: MergeStrategy;
  }
): Result<PlannerCourse[]> {
  const existingCourses = options.existingCourses ?? [];
  const baseDrafts = buildBaseDrafts(
    incomingCourses,
    existingCourses,
    options.mergeStrategy
  );

  if (!baseDrafts.ok) return baseDrafts;

  const drafts = baseDrafts.data;
  const codeSet = new Set(drafts.map((course) => course.code));

  for (const course of drafts) {
    if (!course.code) {
      return err([
        {
          code: 'course.missing-code',
          message: 'Each course must include a course code.',
        },
      ]);
    }

    if (
      !Number.isFinite(course.credits) ||
      course.credits < 1 ||
      course.credits > 6
    ) {
      return err([
        {
          code: 'course.invalid-credits',
          message: `${course.code}: credits must be between 1 and 6.`,
        },
      ]);
    }

    if (course.prerequisiteCodes.includes(course.code)) {
      return err([
        {
          code: 'course.self-reference',
          message: `${course.code} cannot list itself as a prerequisite.`,
        },
      ]);
    }

    const missingPrerequisites = course.prerequisiteCodes.filter(
      (prerequisiteCode) =>
        prerequisiteCode.startsWith(MISSING_PREREQ_PREFIX) ||
        !codeSet.has(prerequisiteCode)
    );

    if (missingPrerequisites.length > 0) {
      const labels = missingPrerequisites.map((prerequisiteCode) =>
        prerequisiteCode.startsWith(MISSING_PREREQ_PREFIX)
          ? 'an existing prerequisite that is no longer present'
          : prerequisiteCode
      );

      return err([
        {
          code: 'course.missing-prerequisite',
          message: `${course.code} references unknown prerequisites: ${labels.join(', ')}.`,
        },
      ]);
    }
  }

  const cycle = findDraftCycle(drafts);
  if (cycle) {
    return err([
      {
        code: 'course.cycle',
        message: `Prerequisite cycle detected: ${cycle.join(' -> ')}.`,
      },
    ]);
  }

  const idByCode = new Map(
    drafts.map((course) => [course.code, course.id ?? createCourseId()])
  );

  return ok(
    drafts.map((course) => ({
      id: idByCode.get(course.code)!,
      code: course.code,
      title: course.title || course.code,
      credits: course.credits,
      prerequisites: course.prerequisiteCodes.map(
        (prerequisiteCode) => idByCode.get(prerequisiteCode)!
      ),
      completed: course.completed ?? false,
    }))
  );
}

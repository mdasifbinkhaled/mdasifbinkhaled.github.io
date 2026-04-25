import type { PlannerCourse } from './types';

/**
 * Returns courses grouped by topological "level" (longest-path depth).
 * Level 0 = no prerequisites.
 */
export function topoLevels(courses: PlannerCourse[]): PlannerCourse[][] {
  const idMap = new Map(courses.map((c) => [c.id, c]));
  const depth = new Map<string, number>();

  function getDepth(id: string, visited: Set<string>): number {
    if (depth.has(id)) return depth.get(id)!;
    if (visited.has(id)) return 0; // cycle guard
    const nextVisited = new Set(visited);
    nextVisited.add(id);
    const course = idMap.get(id);
    if (!course || course.prerequisites.length === 0) {
      depth.set(id, 0);
      return 0;
    }
    const prerequisiteDepths = course.prerequisites
      .filter((pid) => idMap.has(pid))
      .map((pid) => getDepth(pid, nextVisited));
    const maxPrereq =
      prerequisiteDepths.length > 0 ? Math.max(...prerequisiteDepths) : 0;
    const d = maxPrereq + 1;
    depth.set(id, d);
    return d;
  }

  for (const c of courses) getDepth(c.id, new Set());

  const levels: PlannerCourse[][] = [];
  for (const c of courses) {
    const d = depth.get(c.id) ?? 0;
    if (!levels[d]) levels[d] = [];
    levels[d].push(c);
  }

  return levels;
}

/**
 * Returns courses currently "unlocked" — all prerequisites completed.
 */
export function getUnlocked(courses: PlannerCourse[]): PlannerCourse[] {
  const completed = new Set(
    courses.filter((c) => c.completed).map((c) => c.id)
  );
  return courses.filter(
    (c) => !c.completed && c.prerequisites.every((pid) => completed.has(pid))
  );
}

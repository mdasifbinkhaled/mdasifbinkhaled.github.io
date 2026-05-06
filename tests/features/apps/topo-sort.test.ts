import { describe, expect, it } from 'vitest';
import {
  topoLevels,
  getUnlocked,
} from '@/features/apps/components/course-planner/topo-sort';
import type { PlannerCourse } from '@/features/apps/components/course-planner/types';

function mk(
  id: string,
  prerequisites: string[] = [],
  completed = false
): PlannerCourse {
  return {
    id,
    code: id.toUpperCase(),
    title: id,
    credits: 3,
    prerequisites,
    completed,
  };
}

describe('topoLevels', () => {
  it('places a linear chain A -> B -> C into three depth levels in order', () => {
    const levels = topoLevels([mk('a'), mk('b', ['a']), mk('c', ['b'])]);
    expect(levels).toHaveLength(3);
    expect(levels[0]?.map((c) => c.id)).toEqual(['a']);
    expect(levels[1]?.map((c) => c.id)).toEqual(['b']);
    expect(levels[2]?.map((c) => c.id)).toEqual(['c']);
  });

  it('places unrelated courses with no prerequisites all at level 0', () => {
    const levels = topoLevels([mk('a'), mk('b'), mk('c')]);
    expect(levels).toHaveLength(1);
    expect(levels[0]?.map((c) => c.id).sort()).toEqual(['a', 'b', 'c']);
  });

  it('terminates without infinite recursion on a synthetic 2-cycle (cycle guard)', () => {
    // buildCoursePlan rejects cycles upstream; this validates the in-function guard
    // when malformed data bypasses validation (e.g. corrupt localStorage).
    const levels = topoLevels([mk('a', ['b']), mk('b', ['a'])]);
    // Both courses should be placed somewhere; depth values are deterministic per
    // the first-cached-wins traversal order.
    const flatIds = levels.flat().map((c) => c.id);
    expect(flatIds.sort()).toEqual(['a', 'b']);
  });

  it('ignores prerequisite ids that no longer resolve to a known course', () => {
    // An orphan prereq id (e.g. removed course) should not throw or stall.
    const levels = topoLevels([mk('a', ['ghost']), mk('b', ['a'])]);
    expect(
      levels
        .flat()
        .map((c) => c.id)
        .sort()
    ).toEqual(['a', 'b']);
  });
});

describe('getUnlocked', () => {
  it('excludes completed courses', () => {
    const unlocked = getUnlocked([mk('a', [], true), mk('b', ['a'])]);
    expect(unlocked.map((c) => c.id)).toEqual(['b']);
  });

  it('excludes courses with at least one unmet prerequisite', () => {
    const unlocked = getUnlocked([mk('a'), mk('b'), mk('c', ['a', 'b'])]);
    // a and b have no prereqs -> unlocked. c has unmet prereqs -> locked.
    expect(unlocked.map((c) => c.id).sort()).toEqual(['a', 'b']);
  });

  it('treats courses with all prerequisites met as unlocked', () => {
    const unlocked = getUnlocked([
      mk('a', [], true),
      mk('b', [], true),
      mk('c', ['a', 'b']),
    ]);
    expect(unlocked.map((c) => c.id)).toEqual(['c']);
  });
});

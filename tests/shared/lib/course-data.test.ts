import { describe, expect, it } from 'vitest';
import { iubCse211 } from '@/shared/lib/data/courses';

describe('course data freshness', () => {
  it('publishes CSE 211 as the Summer 2026 offering', () => {
    expect(iubCse211.id).toBe('iub-cse211-summer26');
    expect(iubCse211.slug).toBe('cse211sum26');
    expect(iubCse211.semester).toBe('Summer');
    expect(iubCse211.year).toBe(2026);
  });

  it('does not expose stale Spring 2026 live logistics as current CSE 211 data', () => {
    expect(iubCse211.activeContest).toBeUndefined();
    expect(iubCse211.classSchedule).toEqual([]);
    expect(iubCse211.assignments?.[0]?.status).toBe('upcoming');
  });
});

import { describe, expect, it } from 'vitest';
import { iubCse211 } from '@/shared/lib/data/courses';

describe('course data freshness', () => {
  it('publishes CSE 211 as the Summer 2026 offering', () => {
    expect(iubCse211.id).toBe('iub-cse211-summer26');
    expect(iubCse211.slug).toBe('cse211sum26');
    expect(iubCse211.semester).toBe('Summer');
    expect(iubCse211.year).toBe(2026);
  });

  it('exposes Summer 2026 live logistics and no stale data', () => {
    expect(iubCse211.activeContest?.url).toBe(
      'https://vjudge.net/contest/815686'
    );
    expect(iubCse211.activeContest?.platform).toBe('VJudge');
    expect(iubCse211.classSchedule).toEqual([]);
    expect(iubCse211.assignments?.[0]?.status).toBe('upcoming');
  });
});

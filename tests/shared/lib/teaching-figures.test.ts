import { describe, it, expect } from 'vitest';
import { getTeachingFigures } from '@/shared/lib/data/teaching-stats';
import { allCourses } from '@/shared/lib/data/courses';

describe('getTeachingFigures (single source for /teaching + home)', () => {
  const f = getTeachingFigures();

  it('counts every course exactly once', () => {
    expect(f.courses).toBe(allCourses.length);
  });

  it('counts distinct institutions', () => {
    expect(f.institutions).toBe(
      new Set(allCourses.map((c) => c.institution)).size
    );
  });

  it('sums credit-hours across all courses', () => {
    expect(f.creditHours).toBe(
      allCourses.reduce((s, c) => s + (c.credits ?? 0), 0)
    );
  });

  it('derives the teaching span from the course years', () => {
    const years = allCourses.map((c) => c.year);
    expect(f.years).toBe(Math.max(...years) - Math.min(...years));
    expect(f.earliestYear).toBe(Math.min(...years));
  });

  it('averages only rated courses (rating > 0) and is in range', () => {
    const rated = allCourses
      .map((c) => c.rating)
      .filter((r): r is number => typeof r === 'number' && r > 0);
    expect(f.ratedCount).toBe(rated.length);
    expect(f.ratedCount).toBeLessThanOrEqual(f.courses);
    expect(f.avgRating).toBeGreaterThan(0);
    expect(f.avgRating).toBeLessThanOrEqual(5);
    expect(f.avgRating).toBeCloseTo(
      rated.reduce((a, b) => a + b, 0) / rated.length,
      5
    );
  });
});

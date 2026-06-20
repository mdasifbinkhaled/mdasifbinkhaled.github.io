import { describe, it, expect } from 'vitest';
import {
  toLocalInputValue,
  computeTimeRemaining,
  DEFAULT_EXAMS,
  EXAM_FIELDS,
} from '@/features/apps/components/exam-countdown/exam-countdown.utils';

describe('toLocalInputValue', () => {
  it('formats a Date as naive-local YYYY-MM-DDThh:mm (zero-padded)', () => {
    // Month is 0-indexed: 5 → June. Constructed in local time.
    const d = new Date(2026, 5, 7, 9, 5);
    expect(toLocalInputValue(d)).toBe('2026-06-07T09:05');
  });

  it('round-trips with no timezone shift (regression for the UTC-skew bug)', () => {
    // The bug was toISOString() emitting UTC: parsing it back as local shifted
    // the value by the TZ offset. A naive-local string must parse back to the
    // same wall-clock instant (within the dropped-seconds tolerance), in ANY TZ.
    const d = new Date(2026, 10, 1, 23, 59);
    const back = new Date(toLocalInputValue(d)).getTime();
    expect(Math.abs(back - d.getTime())).toBeLessThan(60_000);
  });
});

describe('DEFAULT_EXAMS / import parse use the canonical local format', () => {
  it('default exam dates are naive-local (no trailing Z)', () => {
    for (const e of DEFAULT_EXAMS) {
      expect(e.date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    }
  });

  it('the date field parser normalizes input to the canonical format', () => {
    const dateField = EXAM_FIELDS.find((f) => f.key === 'date');
    const parsed = dateField?.parse?.('2026-06-07 09:05');
    expect(parsed).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  it('the date field parser throws on an invalid date', () => {
    const dateField = EXAM_FIELDS.find((f) => f.key === 'date');
    expect(() => dateField?.parse?.('not-a-date')).toThrow(/invalid date/);
  });
});

describe('computeTimeRemaining', () => {
  it('breaks a future delta into d/h/m/s and is not passed', () => {
    const now = new Date(2026, 0, 1, 0, 0, 0).getTime();
    const target = toLocalInputValue(
      new Date(now + (3 * 24 * 60 * 60 + 2 * 60 * 60 + 30 * 60) * 1000)
    );
    const r = computeTimeRemaining(target, now);
    expect(r.isPassed).toBe(false);
    expect(r.days).toBe(3);
    expect(r.hours).toBe(2);
    expect(r.mins).toBe(30);
  });

  it('flags a past target as passed', () => {
    const now = new Date(2026, 0, 10).getTime();
    const r = computeTimeRemaining(
      toLocalInputValue(new Date(2026, 0, 1)),
      now
    );
    expect(r.isPassed).toBe(true);
  });
});

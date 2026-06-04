import { describe, it, expect } from 'vitest';
import { formatTime } from '@/features/apps/components/study-timer/study-timer.utils';

describe('formatTime', () => {
  it('formats zero seconds as 00:00', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  it('formats 25 minutes as 25:00', () => {
    expect(formatTime(25 * 60)).toBe('25:00');
  });

  it('pads single-digit minutes and seconds', () => {
    expect(formatTime(1 * 60 + 5)).toBe('01:05');
  });

  it('formats 5 minutes as 05:00', () => {
    expect(formatTime(5 * 60)).toBe('05:00');
  });

  it('formats 15 minutes as 15:00', () => {
    expect(formatTime(15 * 60)).toBe('15:00');
  });

  it('formats mid-countdown value correctly', () => {
    // 24 minutes and 57 seconds
    expect(formatTime(24 * 60 + 57)).toBe('24:57');
  });
});

import { describe, it, expect } from 'vitest';
import { getLevelStyle, LEVEL_STYLES } from '@/features/teaching/styles';

describe('LEVEL_STYLES', () => {
  it('defines styles for undergraduate using semantic tokens', () => {
    expect(LEVEL_STYLES.undergraduate).toContain('bg-primary');
    expect(LEVEL_STYLES.undergraduate).toContain('text-primary');
    expect(LEVEL_STYLES.undergraduate).not.toContain('blue-');
  });

  it('defines styles for graduate using semantic tokens', () => {
    expect(LEVEL_STYLES.graduate).toContain('bg-secondary');
    expect(LEVEL_STYLES.graduate).toContain('text-secondary-foreground');
    expect(LEVEL_STYLES.graduate).not.toContain('purple-');
  });
});

describe('getLevelStyle', () => {
  it('returns undergraduate style for "undergraduate"', () => {
    expect(getLevelStyle('undergraduate')).toBe(LEVEL_STYLES.undergraduate);
  });

  it('returns graduate style for "graduate"', () => {
    expect(getLevelStyle('graduate')).toBe(LEVEL_STYLES.graduate);
  });

  it('defaults to undergraduate for unknown levels', () => {
    expect(getLevelStyle('unknown')).toBe(LEVEL_STYLES.undergraduate);
    expect(getLevelStyle('')).toBe(LEVEL_STYLES.undergraduate);
  });
});

import { describe, it, expect } from 'vitest';
import { getTypeIcon } from '@/features/academic/utils/get-type-icon';

describe('getTypeIcon', () => {
  it('returns correct emoji for known content types', () => {
    expect(getTypeIcon('publication')).toBe('📄');
    expect(getTypeIcon('course')).toBe('📚');
    expect(getTypeIcon('experience')).toBe('💼');
    expect(getTypeIcon('news')).toBe('📰');
  });

  it('returns default emoji for unknown types', () => {
    expect(getTypeIcon('unknown')).toBe('📋');
    expect(getTypeIcon('')).toBe('📋');
  });
});

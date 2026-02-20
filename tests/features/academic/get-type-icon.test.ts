import { describe, it, expect } from 'vitest';
import { getTypeIcon } from '@/features/academic/utils/get-type-icon';
import { isValidElement } from 'react';

describe('getTypeIcon', () => {
  it('returns valid React elements for known content types', () => {
    expect(isValidElement(getTypeIcon('publication'))).toBe(true);
    expect(isValidElement(getTypeIcon('course'))).toBe(true);
    expect(isValidElement(getTypeIcon('experience'))).toBe(true);
    expect(isValidElement(getTypeIcon('news'))).toBe(true);
  });

  it('returns valid React element fallback for unknown types', () => {
    expect(isValidElement(getTypeIcon('unknown'))).toBe(true);
    expect(isValidElement(getTypeIcon(''))).toBe(true);
  });
});

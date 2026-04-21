// @vitest-environment jsdom
import { beforeEach, describe, it, expect } from 'vitest';
import {
  STORAGE_PREFIX,
  buildKey,
  readValue,
  writeValue,
  removeValue,
  purgeToolData,
  snapshotToolData,
} from '@/shared/lib/storage';
import { migrateTool } from '@/shared/lib/storage/migrate';

describe('namespaced storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('builds keys in the canonical format', () => {
    expect(buildKey('grade-calculator', 'components')).toBe(
      `${STORAGE_PREFIX}:grade-calculator:components`
    );
  });

  it('rejects invalid tool slugs', () => {
    expect(() => buildKey('Bad Tool!', 'x')).toThrow();
    expect(() => buildKey('valid-tool', 'Bad Key!')).toThrow();
  });

  it('round-trips values via JSON', () => {
    writeValue('seat-planner', 'students', [{ id: '1', name: 'A' }]);
    const read = readValue<{ id: string; name: string }[]>(
      'seat-planner',
      'students'
    );
    expect(read).toEqual([{ id: '1', name: 'A' }]);
  });

  it('returns null for missing keys', () => {
    expect(readValue('seat-planner', 'none')).toBeNull();
  });

  it('returns null for corrupt JSON', () => {
    window.localStorage.setItem(buildKey('seat-planner', 'bad'), '{not json');
    expect(readValue('seat-planner', 'bad')).toBeNull();
  });

  it('removes a single key', () => {
    writeValue('seat-planner', 'k', 1);
    removeValue('seat-planner', 'k');
    expect(readValue('seat-planner', 'k')).toBeNull();
  });

  it('purges only the targeted tool', () => {
    writeValue('seat-planner', 'a', 1);
    writeValue('seat-planner', 'b', 2);
    writeValue('gpa-calculator', 'c', 3);
    const removed = purgeToolData('seat-planner');
    expect(removed).toBe(2);
    expect(readValue('seat-planner', 'a')).toBeNull();
    expect(readValue('gpa-calculator', 'c')).toBe(3);
  });

  it('snapshots all keys for a tool', () => {
    writeValue('seat-planner', 'students', [1, 2]);
    writeValue('seat-planner', 'rooms', ['R1']);
    writeValue('gpa-calculator', 'courses', ['X']);
    const snap = snapshotToolData('seat-planner');
    expect(snap).toEqual({ students: [1, 2], rooms: ['R1'] });
  });
});

describe('migrateTool', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('moves legacy key to namespaced key exactly once', () => {
    window.localStorage.setItem('abk_grade_calculator', '[{"name":"Quiz"}]');
    const moved1 = migrateTool('grade-calculator', [
      { legacyKey: 'abk_grade_calculator', newKey: 'components' },
    ]);
    expect(moved1).toBe(1);
    expect(readValue('grade-calculator', 'components')).toEqual([
      { name: 'Quiz' },
    ]);
    expect(window.localStorage.getItem('abk_grade_calculator')).toBeNull();

    // Second call is a no-op (sentinel).
    const moved2 = migrateTool('grade-calculator', [
      { legacyKey: 'abk_grade_calculator', newKey: 'components' },
    ]);
    expect(moved2).toBe(0);
  });

  it('leaves legacy key in place when JSON is invalid', () => {
    window.localStorage.setItem('abk_grade_calculator', 'not json');
    const moved = migrateTool('grade-calculator', [
      { legacyKey: 'abk_grade_calculator', newKey: 'components' },
    ]);
    expect(moved).toBe(0);
    expect(window.localStorage.getItem('abk_grade_calculator')).toBe(
      'not json'
    );
  });

  it('does nothing when nothing is present', () => {
    const moved = migrateTool('grade-calculator', [
      { legacyKey: 'abk_grade_calculator', newKey: 'components' },
    ]);
    expect(moved).toBe(0);
  });
});

import { describe, it, expect } from 'vitest';
import { allocate } from '@/features/apps/components/seat-planner/allocation';
import type {
  Room,
  Student,
} from '@/features/apps/components/seat-planner/types';

// NOTE: CSV / TSV / XLSX parsing is now covered by the shared parser
// primitive tests in `tests/shared/lib/parsers.test.ts`. Seat Planner no
// longer owns a custom CSV parser, so the legacy `CSVParsing` suite was
// removed.

describe('Seat Planner Allocation', () => {
  const mockStudents: Student[] = [
    { id: '1', name: 'A', section: 1 },
    { id: '2', name: 'B', section: 1 },
    { id: '3', name: 'C', section: 2 },
    { id: '4', name: 'D', section: 2 },
  ];

  const mockRooms: Room[] = [
    { uid: 'r1', name: 'R1', capacity: 2 },
    { uid: 'r2', name: 'R2', capacity: 2 },
  ];

  it('allocates cohort mode properly', () => {
    const res = allocate(mockStudents, mockRooms, 'cohort', 'id');
    expect(res.unassigned).toHaveLength(0);
    expect(res.allocations).toHaveLength(2);
    expect(res.allocations[0]?.room.name).toBe('R1');
    expect(res.allocations[0]?.students.map((s) => s.id)).toEqual(['1', '2']);
    expect(res.allocations[1]?.students.map((s) => s.id)).toEqual(['3', '4']);
  });

  it('allocates mixed mode properly', () => {
    const res = allocate(mockStudents, mockRooms, 'mixed', 'id');
    expect(res.unassigned).toHaveLength(0);
    expect(res.allocations[0]?.students.map((s) => s.section)).toContain(1);
    expect(res.allocations[0]?.students.map((s) => s.section)).toContain(2);
  });

  it('handles overflow', () => {
    const smallRoom: Room[] = [{ uid: 'tiny', name: 'Tiny', capacity: 2 }];
    const res = allocate(mockStudents, smallRoom, 'cohort', 'id');
    expect(res.allocations[0]?.students).toHaveLength(2);
    expect(res.unassigned).toHaveLength(2);
  });

  it('handles random sorting', () => {
    const res = allocate(mockStudents, mockRooms, 'cohort', 'random');
    expect(res.allocations[0]?.students.length).toBe(2);
    expect(res.allocations[1]?.students.length).toBe(2);
  });

  it('handles section-name sorting', () => {
    const res = allocate(mockStudents, mockRooms, 'mixed', 'section-name');
    expect(res.allocations[0]?.students.length).toBe(2);
  });
});
import { describe, it, expect } from 'vitest';

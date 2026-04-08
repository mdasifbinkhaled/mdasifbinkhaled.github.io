import { describe, it, expect } from 'vitest';
import { parseStudentData } from '@/features/apps/components/seat-planner/csv-parser';
import { allocate } from '@/features/apps/components/seat-planner/allocation';
import type {
  Room,
  Student,
} from '@/features/apps/components/seat-planner/types';

describe('Seat Planner Logic', () => {
  describe('CSVParsing', () => {
    it('parses valid 3-column CSV/TSV without headers', () => {
      const data = '21101,John,1\n21102,Jane,2';
      const { students, errors } = parseStudentData(data);
      expect(errors).toHaveLength(0);
      expect(students).toEqual([
        { id: '21101', name: 'John', section: 1 },
        { id: '21102', name: 'Jane', section: 2 },
      ]);
    });

    it('parses 4-column with headers', () => {
      const data = 'SL,ID,Name,Section\n1,201,Alice,1\n2,202,Bob,1';
      const { students, errors } = parseStudentData(data);
      expect(errors).toHaveLength(0);
      expect(students).toHaveLength(2);
      expect(students[0]).toEqual({ id: '201', name: 'Alice', section: 1 });
    });

    it('handles duplicates and errors', () => {
      const data =
        'ID,Name,Section\n101,John,1\n101,John,1\n,NoID,1\n102,BadSec,A';
      const { students, errors } = parseStudentData(data);
      expect(students).toHaveLength(1);
      expect(students[0]?.id).toBe('101');
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.includes('Duplicate'))).toBe(true);
    });

    it('handles not enough columns', () => {
      const data = 'ID,Name';
      const { students, errors } = parseStudentData(data);
      expect(students).toHaveLength(0);
      expect(errors[0]!).toContain('at least 3 columns');
    });
  });

  describe('Allocation', () => {
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
      // Mixed mode should interleave sections
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
});

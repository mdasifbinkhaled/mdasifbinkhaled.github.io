import { describe, it, expect } from 'vitest';
import { allocate } from '@/features/apps/components/seat-planner/allocation';
import type {
  AllocationResult,
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

// ── AUD-010: allocation invariants ──────────────────────────────────────
//
// These assert properties the algorithm actually guarantees (verified
// against `allocation.ts`):
//   • Student conservation: `allocate` deep-clones inputs, so every input
//     student appears exactly once across `allocations ∪ unassigned`.
//   • Mixed-mode interleaving: the round-robin places one student per
//     section per sweep, but `allocateMixed` RE-SORTS each room by
//     `sortOrder` before returning. So the *returned* per-room order is NOT
//     interleaved. The guarantee we can assert is on placement: while two
//     sections both have students left, a room receives them alternately —
//     observable as a balanced section count per room, not as adjacency in
//     the final sorted array.

const allStudentIds = (res: AllocationResult): string[] => [
  ...res.allocations.flatMap((a) => a.students.map((s) => s.id)),
  ...res.unassigned.map((s) => s.id),
];

describe('Seat Planner Allocation — invariants (AUD-010)', () => {
  const buildStudents = (specs: Array<[string, number]>): Student[] =>
    specs.map(([id, section]) => ({ id, name: `Name-${id}`, section }));

  describe('student conservation', () => {
    const cases: Array<{
      name: string;
      students: Student[];
      rooms: Room[];
    }> = [
      {
        name: 'exact fit, cohort',
        students: buildStudents([
          ['1', 1],
          ['2', 1],
          ['3', 2],
          ['4', 2],
        ]),
        rooms: [
          { uid: 'r1', name: 'R1', capacity: 2 },
          { uid: 'r2', name: 'R2', capacity: 2 },
        ],
      },
      {
        name: 'overflow into unassigned, cohort',
        students: buildStudents([
          ['1', 1],
          ['2', 1],
          ['3', 2],
          ['4', 2],
          ['5', 3],
        ]),
        rooms: [{ uid: 'r1', name: 'R1', capacity: 3 }],
      },
      {
        name: 'uneven sections, mixed',
        students: buildStudents([
          ['1', 1],
          ['2', 1],
          ['3', 1],
          ['4', 2],
          ['5', 3],
          ['6', 3],
          ['7', 3],
        ]),
        rooms: [
          { uid: 'r1', name: 'R1', capacity: 4 },
          { uid: 'r2', name: 'R2', capacity: 4 },
        ],
      },
    ];

    for (const mode of ['cohort', 'mixed'] as const) {
      for (const c of cases) {
        it(`${mode}: ${c.name} — no student dropped or duplicated`, () => {
          const inputIds = c.students.map((s) => s.id).sort();
          const res = allocate(c.students, c.rooms, mode, 'id');

          const outputIds = allStudentIds(res).sort();
          // count in === count out
          expect(outputIds).toHaveLength(inputIds.length);
          // exact identifier set preserved (no dupes, none dropped)
          expect(outputIds).toEqual(inputIds);
          // no id appears twice anywhere
          expect(new Set(outputIds).size).toBe(outputIds.length);
        });
      }
    }

    it('never mutates the caller-supplied students (deep clone)', () => {
      const students = buildStudents([
        ['1', 1],
        ['2', 2],
      ]);
      const rooms: Room[] = [{ uid: 'r1', name: 'R1', capacity: 2 }];
      allocate(students, rooms, 'mixed', 'id');
      // `allocate` assigns `.room` only on its internal clone.
      expect(students.every((s) => s.room === undefined)).toBe(true);
    });

    it('respects room capacity — no room exceeds its capacity', () => {
      const students = buildStudents(
        Array.from({ length: 10 }, (_, i) => [String(i + 1), (i % 3) + 1])
      );
      const rooms: Room[] = [
        { uid: 'r1', name: 'R1', capacity: 3 },
        { uid: 'r2', name: 'R2', capacity: 4 },
      ];
      const res = allocate(students, rooms, 'mixed', 'id');
      for (const alloc of res.allocations) {
        expect(alloc.students.length).toBeLessThanOrEqual(alloc.room.capacity);
      }
      // 10 students, capacity 7 → 3 spill to unassigned
      expect(res.unassigned).toHaveLength(3);
    });
  });

  describe('mixed-mode interleaving (placement balance)', () => {
    it('balances two equal sections within a single room', () => {
      // Two sections of 3 each, one room of 6. Round-robin places them
      // 1,2,1,2,1,2 so each section contributes exactly 3 to the room.
      const students = buildStudents([
        ['a1', 1],
        ['a2', 1],
        ['a3', 1],
        ['b1', 2],
        ['b2', 2],
        ['b3', 2],
      ]);
      const rooms: Room[] = [{ uid: 'r1', name: 'R1', capacity: 6 }];
      const res = allocate(students, rooms, 'mixed', 'id');

      const room = res.allocations[0];
      expect(room?.students).toHaveLength(6);
      const bySection = room!.students.reduce<Record<number, number>>(
        (acc, s) => {
          acc[s.section] = (acc[s.section] ?? 0) + 1;
          return acc;
        },
        {}
      );
      // perfectly balanced placement: 3 from each section
      expect(bySection[1]).toBe(3);
      expect(bySection[2]).toBe(3);
    });

    it('fills a room with both sections before spilling to the next room', () => {
      // capacity 2 per room; round-robin gives section1, section2 to room1,
      // then section1, section2 to room2 — so each room is mixed, never a
      // pure-cohort room while both sections still have students.
      const students = buildStudents([
        ['a1', 1],
        ['a2', 1],
        ['b1', 2],
        ['b2', 2],
      ]);
      const rooms: Room[] = [
        { uid: 'r1', name: 'R1', capacity: 2 },
        { uid: 'r2', name: 'R2', capacity: 2 },
      ];
      const res = allocate(students, rooms, 'mixed', 'id');

      for (const alloc of res.allocations) {
        const sections = new Set(alloc.students.map((s) => s.section));
        // every room holds both sections (anti-cheating layout)
        expect(sections).toEqual(new Set([1, 2]));
      }
    });

    it('cohort mode keeps a section contiguous (contrast with mixed)', () => {
      const students = buildStudents([
        ['a1', 1],
        ['a2', 1],
        ['b1', 2],
        ['b2', 2],
      ]);
      const rooms: Room[] = [
        { uid: 'r1', name: 'R1', capacity: 2 },
        { uid: 'r2', name: 'R2', capacity: 2 },
      ];
      const res = allocate(students, rooms, 'cohort', 'id');
      // each room is a single section in cohort mode
      for (const alloc of res.allocations) {
        expect(new Set(alloc.students.map((s) => s.section)).size).toBe(1);
      }
    });
  });

  describe('shuffle / random ordering', () => {
    it("random sort preserves the multiset (doesn't drop or invent students)", () => {
      const students = buildStudents(
        Array.from({ length: 12 }, (_, i) => [String(i + 1), (i % 4) + 1])
      );
      const rooms: Room[] = [{ uid: 'r1', name: 'R1', capacity: 12 }];
      const inputIds = students.map((s) => s.id).sort();
      const res = allocate(students, rooms, 'cohort', 'random');
      expect(allStudentIds(res).sort()).toEqual(inputIds);
    });

    it('random sort can produce different orderings across runs (uses Math.random)', () => {
      const students = buildStudents(
        Array.from({ length: 20 }, (_, i) => [String(i + 1), 1])
      );
      const rooms: Room[] = [{ uid: 'r1', name: 'R1', capacity: 20 }];
      const orderings = new Set<string>();
      for (let run = 0; run < 8; run++) {
        const res = allocate(students, rooms, 'cohort', 'random');
        orderings.add(
          (res.allocations[0]?.students ?? []).map((s) => s.id).join(',')
        );
      }
      // With 20 items and 8 runs, a real shuffle yields >1 distinct ordering.
      expect(orderings.size).toBeGreaterThan(1);
    });
  });
});

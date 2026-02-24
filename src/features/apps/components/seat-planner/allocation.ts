// ────────────────────────────────────────────────
// Seat Planner — allocation algorithms
// ────────────────────────────────────────────────

import type {
  Student,
  Room,
  AllocationMode,
  SortOrder,
  RoomAllocation,
  AllocationResult,
} from './types';

// ── helpers ─────────────────────────────────────

/** Fisher-Yates (Durstenfeld) shuffle — unbiased O(n) */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

function sortStudents(students: Student[], order: SortOrder): Student[] {
  const sorted = [...students];
  switch (order) {
    case 'section-name':
      return sorted.sort(
        (a, b) => a.section - b.section || a.name.localeCompare(b.name)
      );
    case 'section-id':
      return sorted.sort(
        (a, b) => a.section - b.section || a.id.localeCompare(b.id)
      );
    case 'id':
      return sorted.sort((a, b) => a.id.localeCompare(b.id));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'random':
      return shuffle(sorted);
    default:
      return sorted;
  }
}

function groupBySection(students: Student[]): Record<number, Student[]> {
  const groups: Record<number, Student[]> = {};
  for (const s of students) {
    (groups[s.section] ??= []).push(s);
  }
  return groups;
}

// ── cohort mode ─────────────────────────────────
// Same‑section students are kept together.
// Sections fill rooms sequentially; overflow spills to the next room.

function allocateCohort(
  students: Student[],
  rooms: Room[],
  sortOrder: SortOrder
): AllocationResult {
  const sections = groupBySection(students);
  const sectionKeys = Object.keys(sections)
    .map(Number)
    .sort((a, b) => a - b);

  const allocations: RoomAllocation[] = rooms.map((room) => ({
    room,
    students: [],
  }));
  const unassigned: Student[] = [];
  let roomIdx = 0;

  for (const sec of sectionKeys) {
    const sectionList = sections[sec];
    if (!sectionList) continue;
    const pool = [...sortStudents(sectionList, sortOrder)];

    while (pool.length > 0) {
      if (roomIdx >= allocations.length) {
        unassigned.push(...pool);
        break;
      }

      const alloc = allocations[roomIdx]!;
      const space = alloc.room.capacity - alloc.students.length;

      if (space <= 0) {
        roomIdx++;
        continue;
      }

      const batch = pool.splice(0, space);
      batch.forEach((s) => (s.room = alloc.room.name));
      alloc.students.push(...batch);

      if (alloc.students.length >= alloc.room.capacity) {
        roomIdx++;
      }
    }
  }

  return {
    allocations: allocations.filter((a) => a.students.length > 0),
    unassigned,
  };
}

// ── mixed mode ──────────────────────────────────
// Round‑robin across sections so students from different
// sections sit next to each other (anti‑cheating layout).

function allocateMixed(
  students: Student[],
  rooms: Room[],
  sortOrder: SortOrder
): AllocationResult {
  const sections = groupBySection(students);
  const sectionKeys = Object.keys(sections)
    .map(Number)
    .sort((a, b) => a - b);

  for (const sec of sectionKeys) {
    const list = sections[sec];
    if (list) sections[sec] = sortStudents(list, sortOrder);
  }

  const allocations: RoomAllocation[] = rooms.map((room) => ({
    room,
    students: [],
  }));
  const unassigned: Student[] = [];

  const ptrs: Record<number, number> = {};
  for (const sec of sectionKeys) ptrs[sec] = 0;

  let roomIdx = 0;
  let progress = true;

  while (progress) {
    progress = false;
    for (const sec of sectionKeys) {
      const secList = sections[sec];
      if (!secList) continue;
      const ptr = ptrs[sec] ?? 0;
      if (ptr >= secList.length) continue;
      progress = true;

      const student = secList[ptr];
      if (!student) continue;
      ptrs[sec] = ptr + 1;

      // find a room with space
      while (
        roomIdx < allocations.length &&
        allocations[roomIdx]!.students.length >=
          allocations[roomIdx]!.room.capacity
      ) {
        roomIdx++;
      }

      if (roomIdx < allocations.length) {
        student.room = allocations[roomIdx]!.room.name;
        allocations[roomIdx]!.students.push(student);
      } else {
        unassigned.push(student);
      }
    }
  }

  // re‑sort within each room for readability
  for (const alloc of allocations) {
    alloc.students = sortStudents(alloc.students, sortOrder);
  }

  return {
    allocations: allocations.filter((a) => a.students.length > 0),
    unassigned,
  };
}

// ── public entry point ──────────────────────────

export function allocate(
  students: Student[],
  rooms: Room[],
  mode: AllocationMode,
  sortOrder: SortOrder
): AllocationResult {
  // deep‑clone so the caller's array is never mutated
  const cloned = students.map((s) => ({ ...s, room: undefined }));

  return mode === 'cohort'
    ? allocateCohort(cloned, rooms, sortOrder)
    : allocateMixed(cloned, rooms, sortOrder);
}

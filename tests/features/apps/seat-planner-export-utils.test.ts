import { describe, expect, it } from 'vitest';
import {
  buildSeatPlanTableColumns,
  buildRoomFacultySummary,
  buildSeatPlanBackupFilename,
  buildSeatPlanExportFilename,
  buildSeatPlanPrintPages,
  getSeatPlanTableValue,
  getStudentExtraKeys,
} from '@/features/apps/components/seat-planner/export-utils';
import type {
  ExamDetails,
  RoomAllocation,
  SectionFacultyMap,
  Student,
} from '@/features/apps/components/seat-planner/types';

const details: ExamDetails = {
  courseCodes: 'CSE 101 / CSE 102',
  courseTitle: 'Algorithms',
  examType: 'Mid Term',
  semester: 'Fall',
  year: '2025',
  department: 'CSE',
  university: 'BRAC University',
};

function makeStudents(count: number): Student[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `2025${String(index + 1).padStart(3, '0')}`,
    name: `Student ${index + 1}`,
    section: index < 14 ? 1 : 2,
    room: index < 21 ? 'A4-601' : 'A4-602',
  }));
}

describe('Seat planner export utils', () => {
  it('builds stable export filenames from exam metadata', () => {
    expect(buildSeatPlanExportFilename(details, 'combined', 'pdf')).toBe(
      'seat-plan--cse-101-cse-102--fall-2025--mid-term--combined.pdf'
    );

    expect(
      buildSeatPlanBackupFilename(details, new Date('2025-02-03T08:00:00.000Z'))
    ).toBe('seat-planner-backup--cse-101-cse-102--2025-02-03.json');
  });

  it('paginates master and room sheets with shared numbering', () => {
    const students = makeStudents(27);
    const allocations: RoomAllocation[] = [
      {
        room: { uid: 'r1', name: 'A4-601', capacity: 24 },
        students: students.slice(0, 21),
      },
      {
        room: { uid: 'r2', name: 'A4-602', capacity: 24 },
        students: students.slice(21),
      },
    ];
    const sectionFaculty: SectionFacultyMap = {
      1: 'Dr Rahman',
      2: 'Prof Karim',
    };

    const pages = buildSeatPlanPrintPages(
      students,
      allocations,
      sectionFaculty
    );

    expect(pages).toHaveLength(5);

    expect(pages[0]).toMatchObject({
      kind: 'master',
      pageNumber: 1,
      totalPages: 5,
      startIndex: 0,
    });
    expect(pages[0]?.rows).toHaveLength(22);

    expect(pages[1]).toMatchObject({
      kind: 'master',
      pageNumber: 2,
      totalPages: 5,
      startIndex: 22,
    });
    expect(pages[1]?.rows).toHaveLength(5);

    expect(pages[2]).toMatchObject({
      kind: 'room',
      pageNumber: 3,
      totalPages: 5,
      startIndex: 0,
      roomPageNumber: 1,
      roomPageTotal: 2,
      facultySummary: 'Sec 1: Dr Rahman • Sec 2: Prof Karim',
    });
    expect(pages[2]?.rows).toHaveLength(16);

    if (pages[2]?.kind !== 'room') {
      throw new Error('Expected first room page');
    }

    expect(pages[2].sectionSummary).toEqual([
      { section: 1, count: 14, faculty: 'Dr Rahman' },
      { section: 2, count: 7, faculty: 'Prof Karim' },
    ]);

    expect(pages[3]).toMatchObject({
      kind: 'room',
      pageNumber: 4,
      totalPages: 5,
      startIndex: 16,
      roomPageNumber: 2,
      roomPageTotal: 2,
    });
    expect(pages[3]?.rows).toHaveLength(5);

    expect(pages[4]).toMatchObject({
      kind: 'room',
      pageNumber: 5,
      totalPages: 5,
      startIndex: 0,
      roomPageNumber: 1,
      roomPageTotal: 1,
    });
    expect(pages[4]?.rows).toHaveLength(6);
  });

  it('shortens faculty summaries when space is constrained', () => {
    const allocation: RoomAllocation = {
      room: { uid: 'r1', name: 'BC6007-S', capacity: 30 },
      students: [
        { id: '1', name: 'A', section: 1 },
        { id: '2', name: 'B', section: 2 },
      ],
    };

    expect(
      buildRoomFacultySummary(allocation, { 1: 'Rahman', 2: 'Karim' }, 22)
    ).toBe('S1: Rahman • S2: Karim');
  });

  it('builds dynamic table columns from preserved student extras', () => {
    const students: Student[] = [
      {
        id: '1',
        name: 'Alice',
        section: 1,
        room: 'BC5014-S',
        extras: { Program: 'CSE', Shift: 'Morning' },
      },
      {
        id: '2',
        name: 'Bob',
        section: 2,
        room: 'BC5015-S',
        extras: { Shift: 'Evening', Campus: 'Main' },
      },
    ];

    expect(getStudentExtraKeys(students)).toEqual([
      'Program',
      'Shift',
      'Campus',
    ]);

    expect(buildSeatPlanTableColumns(students, 'master')).toMatchObject([
      { kind: 'sl', label: 'SL' },
      { kind: 'id', label: 'Student ID' },
      { kind: 'name', label: 'Student Name' },
      { kind: 'section', label: 'Section' },
      { kind: 'extra', label: 'Program', extraKey: 'Program' },
      { kind: 'extra', label: 'Shift', extraKey: 'Shift' },
      { kind: 'extra', label: 'Campus', extraKey: 'Campus' },
      { kind: 'room', label: 'Room' },
    ]);
  });

  it('reads table values for extra, room, and signature columns', () => {
    const student: Student = {
      id: '1',
      name: 'Alice',
      section: 1,
      room: 'BC5014-S',
      extras: { Program: 'CSE' },
    };
    const [, , , , programColumn, roomColumn] = buildSeatPlanTableColumns(
      [student],
      'master'
    ).slice(0, 6);
    const signatureColumn = buildSeatPlanTableColumns([student], 'room').at(-1);

    expect(programColumn).toBeDefined();
    expect(roomColumn).toBeDefined();
    expect(signatureColumn).toBeDefined();

    expect(getSeatPlanTableValue(student, programColumn!, 0)).toBe('CSE');
    expect(getSeatPlanTableValue(student, roomColumn!, 0)).toBe('BC5014-S');
    expect(getSeatPlanTableValue(student, signatureColumn!, 0)).toBe('');
  });
});

// ────────────────────────────────────────────────
// Seat Planner — shared type definitions
// ────────────────────────────────────────────────

export interface Student {
  /** Student ID (e.g. "2312209") */
  id: string;
  /** Full name */
  name: string;
  /** Section number */
  section: number;
  /** Assigned room name (populated after allocation) */
  room?: string;
}

export interface Room {
  /** Auto-generated UUID */
  uid: string;
  /** Display name, e.g. "BC6007-S" */
  name: string;
  /** Maximum number of students */
  capacity: number;
}

export interface ExamDetails {
  courseCodes: string;
  courseTitle: string;
  examType: string;
  semester: string;
  year: string;
  department: string;
  university: string;
}

export type AllocationMode = 'cohort' | 'mixed';

export type SortOrder =
  | 'section-name'
  | 'section-id'
  | 'id'
  | 'name'
  | 'random';

export interface RoomAllocation {
  room: Room;
  students: Student[];
}

export interface AllocationResult {
  allocations: RoomAllocation[];
  /** Students that could not fit in any room */
  unassigned: Student[];
}

export const DEFAULT_EXAM_DETAILS: ExamDetails = {
  courseCodes: '',
  courseTitle: '',
  examType: 'Final Examination',
  semester: '',
  year: new Date().getFullYear().toString(),
  department: '',
  university: '',
};

/** Deterministic colour palette for section visualisation */
export const SECTION_COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-lime-500',
] as const;

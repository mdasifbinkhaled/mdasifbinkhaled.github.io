import type {
  ExamDetails,
  RoomAllocation,
  SectionFacultyMap,
  Student,
} from './types';

export const MASTER_ROWS_PER_PRINT_PAGE = 26;
export const ROOM_ROWS_PER_PRINT_PAGE = 20;

export interface SectionSummaryItem {
  section: number;
  count: number;
  faculty?: string;
}

export type SeatPlanTableVariant = 'master' | 'room';

export interface SeatPlanTableColumn {
  key: string;
  label: string;
  kind: 'sl' | 'id' | 'name' | 'section' | 'extra' | 'room' | 'signature';
  align?: 'left' | 'center';
  extraKey?: string;
}

export interface MasterPrintPage {
  kind: 'master';
  pageNumber: number;
  totalPages: number;
  rows: Student[];
  startIndex: number;
}

export interface RoomPrintPage {
  kind: 'room';
  pageNumber: number;
  totalPages: number;
  allocation: RoomAllocation;
  rows: Student[];
  startIndex: number;
  roomPageNumber: number;
  roomPageTotal: number;
  sectionSummary: SectionSummaryItem[];
  facultySummary: string | null;
}

export type SeatPlanPrintPage = MasterPrintPage | RoomPrintPage;

export function slugifyFilenamePart(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

export function getStudentExtraKeys(students: readonly Student[]): string[] {
  const keys: string[] = [];
  const seen = new Set<string>();

  for (const student of students) {
    for (const rawKey of Object.keys(student.extras ?? {})) {
      const key = rawKey.trim();
      if (!key) continue;

      const normalizedKey = key.toLocaleLowerCase();
      if (seen.has(normalizedKey)) continue;

      seen.add(normalizedKey);
      keys.push(key);
    }
  }

  return keys;
}

export function buildSeatPlanTableColumns(
  students: readonly Student[],
  variant: SeatPlanTableVariant
): SeatPlanTableColumn[] {
  const baseColumns: SeatPlanTableColumn[] = [
    { key: 'sl', label: 'SL', kind: 'sl', align: 'center' },
    { key: 'id', label: 'Student ID', kind: 'id' },
    { key: 'name', label: 'Student Name', kind: 'name' },
    { key: 'section', label: 'Section', kind: 'section', align: 'center' },
  ];
  const extraColumns = getStudentExtraKeys(students).map((key) => ({
    key: `extra:${key}`,
    label: key,
    kind: 'extra' as const,
    extraKey: key,
  }));

  return variant === 'master'
    ? [
        ...baseColumns,
        ...extraColumns,
        { key: 'room', label: 'Room', kind: 'room' },
      ]
    : [
        ...baseColumns,
        ...extraColumns,
        { key: 'signature', label: 'Signature', kind: 'signature' },
      ];
}

export function getSeatPlanTableValue(
  student: Student,
  column: SeatPlanTableColumn,
  rowIndex: number,
  startIndex = 0
): number | string {
  switch (column.kind) {
    case 'sl':
      return startIndex + rowIndex + 1;
    case 'id':
      return student.id;
    case 'name':
      return student.name;
    case 'section':
      return student.section;
    case 'extra':
      return student.extras?.[column.extraKey ?? ''] ?? '';
    case 'room':
      return student.room ?? 'Unassigned';
    case 'signature':
      return '';
  }
}

export function buildSeatPlanDocumentTitle(details: ExamDetails): string {
  const title = [details.courseCodes, details.courseTitle]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' — ');

  return title || 'Seat plan';
}

export function buildSeatPlanMetaLine(details: ExamDetails): string {
  return [
    details.examType.trim(),
    [details.semester.trim(), details.year.trim()].filter(Boolean).join(' '),
  ]
    .filter(Boolean)
    .join(' • ');
}

export function buildSeatPlanExportFilename(
  details: ExamDetails,
  variant: string,
  extension: string
): string {
  const filenameParts = [
    'seat-plan',
    slugifyFilenamePart(details.courseCodes) || 'untitled-course',
  ];

  const term = slugifyFilenamePart(
    [details.semester, details.year].filter(Boolean).join(' ')
  );
  const examType = slugifyFilenamePart(details.examType);
  const variantSlug = slugifyFilenamePart(variant) || 'export';

  if (term) filenameParts.push(term);
  if (examType) filenameParts.push(examType);
  filenameParts.push(variantSlug);

  return `${filenameParts.join('--')}.${extension.replace(/^\./, '')}`;
}

export function buildSeatPlanBackupFilename(
  details: ExamDetails,
  date = new Date()
): string {
  const stamp = date.toISOString().slice(0, 10);
  const course = slugifyFilenamePart(details.courseCodes) || 'workspace';

  return `seat-planner-backup--${course}--${stamp}.json`;
}

export function getSectionSummaries(
  students: readonly Student[],
  sectionFaculty: SectionFacultyMap = {}
): SectionSummaryItem[] {
  const bySection = new Map<number, number>();

  for (const student of students) {
    bySection.set(student.section, (bySection.get(student.section) ?? 0) + 1);
  }

  return [...bySection.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([section, count]) => {
      const faculty = sectionFaculty[section]?.trim();

      return {
        section,
        count,
        faculty: faculty || undefined,
      };
    });
}

export function buildRoomFacultySummary(
  allocation: RoomAllocation,
  sectionFaculty: SectionFacultyMap = {},
  maxLength = 84
): string | null {
  const facultyEntries = getSectionSummaries(
    allocation.students,
    sectionFaculty
  )
    .filter((item) => item.faculty)
    .map((item) => ({
      full: `Sec ${item.section}: ${item.faculty}`,
      compact: `S${item.section}: ${item.faculty}`,
    }));

  if (facultyEntries.length === 0) return null;

  const fullLine = facultyEntries.map((item) => item.full).join(' • ');
  if (fullLine.length <= maxLength) return fullLine;

  const compactLine = facultyEntries.map((item) => item.compact).join(' • ');
  if (compactLine.length <= maxLength) return compactLine;

  return null;
}

export function buildSectionCountLine(students: readonly Student[]): string {
  const sections = getSectionSummaries(students);

  return sections
    .map((item) => `Sec ${item.section} × ${item.count}`)
    .join(' • ');
}

export function buildSeatPlanPrintPages(
  students: readonly Student[],
  allocations: readonly RoomAllocation[],
  sectionFaculty: SectionFacultyMap = {}
): SeatPlanPrintPage[] {
  const masterPages = chunkItems(students, MASTER_ROWS_PER_PRINT_PAGE).map(
    (rows, index) => ({
      kind: 'master' as const,
      rows,
      startIndex: index * MASTER_ROWS_PER_PRINT_PAGE,
    })
  );

  const roomPages = allocations.flatMap((allocation) => {
    const chunks = chunkItems(allocation.students, ROOM_ROWS_PER_PRINT_PAGE);

    return chunks.map((rows, index) => ({
      kind: 'room' as const,
      allocation,
      rows,
      startIndex: index * ROOM_ROWS_PER_PRINT_PAGE,
      roomPageNumber: index + 1,
      roomPageTotal: chunks.length,
      sectionSummary: getSectionSummaries(allocation.students, sectionFaculty),
      facultySummary: buildRoomFacultySummary(allocation, sectionFaculty),
    }));
  });

  const pages = [...masterPages, ...roomPages];
  const totalPages = pages.length;

  return pages.map((page, index) => ({
    ...page,
    pageNumber: index + 1,
    totalPages,
  }));
}

function chunkItems<T>(items: readonly T[], chunkSize: number): T[][] {
  if (items.length === 0) return [];

  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

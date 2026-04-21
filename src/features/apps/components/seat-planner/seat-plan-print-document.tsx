import {
  buildSeatPlanDocumentTitle,
  buildSeatPlanMetaLine,
  buildSeatPlanPrintPages,
  buildSectionCountLine,
} from './export-utils';
import { DottedField, Th } from './shared-ui';
import type {
  ExamDetails,
  RoomAllocation,
  SectionFacultyMap,
  Student,
} from './types';

interface SeatPlanPrintDocumentProps {
  students: Student[];
  allocations: RoomAllocation[];
  examDetails: ExamDetails;
  sectionFaculty: SectionFacultyMap;
}

export function SeatPlanPrintDocument({
  students,
  allocations,
  examDetails,
  sectionFaculty,
}: SeatPlanPrintDocumentProps) {
  const pages = buildSeatPlanPrintPages(students, allocations, sectionFaculty);

  if (pages.length === 0) return null;

  const title = buildSeatPlanDocumentTitle(examDetails);
  const metaLine = buildSeatPlanMetaLine(examDetails);
  const organisationLine = [examDetails.department, examDetails.university]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' • ');

  return (
    <div className="seat-plan-print-root hidden print:block">
      {pages.map((page) => {
        const pageLabel =
          page.kind === 'master'
            ? 'Master List'
            : `Room Sheet · ${page.allocation.room.name}`;

        return (
          <article
            key={`${page.kind}-${page.pageNumber}`}
            className="seat-plan-print-page flex min-h-full flex-col"
          >
            <header className="mb-4 border-b pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {pageLabel}
                  </p>
                  <h1 className="text-lg font-semibold leading-tight">
                    {title}
                  </h1>
                  {metaLine ? (
                    <p className="text-[11px] text-muted-foreground">
                      {metaLine}
                    </p>
                  ) : null}
                  {organisationLine ? (
                    <p className="text-[11px] text-muted-foreground">
                      {organisationLine}
                    </p>
                  ) : null}
                  {page.kind === 'room' ? (
                    <>
                      <p className="text-[11px] text-muted-foreground">
                        Room {page.allocation.room.name} ·{' '}
                        {page.allocation.students.length}/
                        {page.allocation.room.capacity} seats
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {buildSectionCountLine(page.allocation.students)}
                      </p>
                      {page.facultySummary ? (
                        <p className="text-[11px] text-muted-foreground">
                          Faculty: {page.facultySummary}
                        </p>
                      ) : null}
                    </>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">
                      Rows {page.startIndex + 1}–
                      {page.startIndex + page.rows.length}
                    </p>
                  )}
                </div>

                <div className="shrink-0 text-right text-[11px] text-muted-foreground">
                  <p>
                    Page {page.pageNumber} of {page.totalPages}
                  </p>
                  {page.kind === 'room' && page.roomPageTotal > 1 ? (
                    <p>
                      Room page {page.roomPageNumber} of {page.roomPageTotal}
                    </p>
                  ) : null}
                </div>
              </div>
            </header>

            <div className="overflow-hidden rounded-lg border">
              <table className="w-full border-collapse text-[11px] leading-snug">
                <thead className="bg-muted/60">
                  <tr>
                    <Th className="w-10">SL</Th>
                    <Th className="w-28">Student ID</Th>
                    <Th>Student Name</Th>
                    <Th className="w-16 text-center">Section</Th>
                    <Th className={page.kind === 'master' ? 'w-28' : 'w-40'}>
                      {page.kind === 'master' ? 'Room' : 'Signature'}
                    </Th>
                  </tr>
                </thead>
                <tbody>
                  {page.rows.map((student, rowIndex) => (
                    <tr key={`${student.id}-${rowIndex}`} className="border-t">
                      <td className="px-3 py-1.5 text-muted-foreground">
                        {page.startIndex + rowIndex + 1}
                      </td>
                      <td className="px-3 py-1.5 font-mono text-[10px]">
                        {student.id}
                      </td>
                      <td className="px-3 py-1.5">{student.name}</td>
                      <td className="px-3 py-1.5 text-center">
                        {student.section}
                      </td>
                      <td className="px-3 py-1.5">
                        {page.kind === 'master'
                          ? (student.room ?? 'Unassigned')
                          : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {page.kind === 'room' ? (
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[11px]">
                <DottedField label="Total Present" />
                <DottedField label="Total Absent" />
                <DottedField label="Invigilator Name" />
                <DottedField label="Invigilator Signature" />
              </div>
            ) : null}

            <footer className="mt-auto flex items-end justify-between border-t pt-3 text-[10px] text-muted-foreground">
              <span>{pageLabel}</span>
              <span>
                Page {page.pageNumber} of {page.totalPages}
              </span>
            </footer>
          </article>
        );
      })}
    </div>
  );
}

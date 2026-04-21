import {
  buildSeatPlanTableColumns,
  buildSeatPlanDocumentTitle,
  getSeatPlanTableValue,
  buildSeatPlanMetaLine,
  buildSeatPlanPrintPages,
  buildSectionCountLine,
} from './export-utils';
import { Th } from './shared-ui';
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
  const departmentLine = examDetails.department.trim();
  const universityLine = examDetails.university.trim();
  const masterColumns = buildSeatPlanTableColumns(students, 'master');
  const roomColumns = buildSeatPlanTableColumns(students, 'room');

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
            <header className="mb-4 border-b border-black pb-3 text-black">
              <div className="space-y-1 text-center">
                <h1 className="text-[16px] font-semibold leading-tight">
                  {title}
                </h1>
                {metaLine ? <p className="text-[11px]">{metaLine}</p> : null}
                {departmentLine ? (
                  <p className="text-[11px]">{departmentLine}</p>
                ) : null}
                {universityLine ? (
                  <p className="text-[11px]">{universityLine}</p>
                ) : null}
              </div>

              <div className="mt-3 flex items-stretch justify-between gap-4 border-t border-black pt-2 text-[11px]">
                <div className="space-y-1">
                  {page.kind === 'room' ? (
                    <>
                      <p>
                        {page.allocation.students.length}/
                        {page.allocation.room.capacity} seats occupied
                      </p>
                      <p>{buildSectionCountLine(page.allocation.students)}</p>
                      {page.facultySummary ? (
                        <p>Faculty: {page.facultySummary}</p>
                      ) : null}
                    </>
                  ) : (
                    <p>
                      Rows {page.startIndex + 1}–
                      {page.startIndex + page.rows.length}
                    </p>
                  )}
                </div>

                <div className="min-w-[10rem] border border-black">
                  <div className="flex h-full items-stretch">
                    <div className="border-r border-black px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]">
                      {page.kind === 'master' ? 'Sheet' : 'Room'}
                    </div>
                    <div className="flex-1 px-3 py-1 text-right text-[12px] font-semibold">
                      {page.kind === 'master'
                        ? 'Master List'
                        : page.allocation.room.name}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="overflow-hidden rounded-lg border">
              <table className="w-full border-collapse text-[11px] leading-snug">
                <thead>
                  <tr>
                    {(page.kind === 'master' ? masterColumns : roomColumns).map(
                      (column) => (
                        <Th
                          key={column.key}
                          className={
                            column.kind === 'sl'
                              ? 'w-10 border border-black text-center'
                              : column.kind === 'id'
                                ? 'w-28 border border-black'
                                : column.kind === 'section'
                                  ? 'w-16 border border-black text-center'
                                  : column.kind === 'room' ||
                                      column.kind === 'signature'
                                    ? 'w-28 border border-black'
                                    : 'border border-black'
                          }
                        >
                          {column.label}
                        </Th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {page.rows.map((student, rowIndex) => (
                    <tr key={`${student.id}-${rowIndex}`} className="border-t">
                      {(page.kind === 'master'
                        ? masterColumns
                        : roomColumns
                      ).map((column) => (
                        <td
                          key={column.key}
                          className={
                            column.kind === 'sl'
                              ? 'border border-black px-2 py-1.5 text-center text-muted-foreground'
                              : column.kind === 'id'
                                ? 'border border-black px-2 py-1.5 font-mono text-[10px]'
                                : column.kind === 'section'
                                  ? 'border border-black px-2 py-1.5 text-center'
                                  : 'border border-black px-2 py-1.5'
                          }
                        >
                          {getSeatPlanTableValue(
                            student,
                            column,
                            rowIndex,
                            page.startIndex
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {page.kind === 'room' ? (
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                <PrintFieldBox label="Total Present" />
                <PrintFieldBox label="Total Absent" />
                <PrintFieldBox label="Invigilator Name" />
                <PrintFieldBox label="Invigilator Signature" />
              </div>
            ) : null}

            <footer className="mt-auto flex items-end justify-between border-t border-black pt-3 text-[10px] text-black/70">
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

function PrintFieldBox({ label }: { label: string }) {
  return (
    <div className="flex border border-black">
      <div className="min-w-[7rem] border-r border-black px-2 py-2 font-medium">
        {label}
      </div>
      <div className="h-9 flex-1" />
    </div>
  );
}

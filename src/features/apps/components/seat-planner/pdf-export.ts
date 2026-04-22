import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  buildSectionCountLine,
  buildSeatPlanDocumentTitle,
  buildSeatPlanExportFilename,
  buildSeatPlanMetaLine,
  buildSeatPlanPrintPages,
  buildSeatPlanTableColumns,
  getSeatPlanTableValue,
  type SeatPlanPrintPage,
} from './export-utils';
import type {
  ExamDetails,
  RoomAllocation,
  SectionFacultyMap,
  Student,
} from './types';

const PAGE_MARGIN = {
  top: 14,
  right: 13,
  bottom: 14,
  left: 13,
} as const;

const INK: [number, number, number] = [20, 20, 20];
const INK_MUTED: [number, number, number] = [84, 84, 84];
const GRID: [number, number, number] = [32, 32, 32];
const GRID_SOFT: [number, number, number] = [150, 150, 150];

export function generateMasterListPDF(
  students: Student[],
  details: ExamDetails,
  sectionFaculty: SectionFacultyMap = {}
): void {
  const pages = buildSeatPlanPrintPages(students, [], sectionFaculty);
  renderPdfDocument(pages, details, 'master-list');
}

export function generateRoomSheetsPDF(
  allocations: RoomAllocation[],
  details: ExamDetails,
  sectionFaculty: SectionFacultyMap = {}
): void {
  const pages = buildSeatPlanPrintPages([], allocations, sectionFaculty);
  renderPdfDocument(pages, details, 'room-sheets');
}

export function generateCombinedPDF(
  students: Student[],
  allocations: RoomAllocation[],
  details: ExamDetails,
  sectionFaculty: SectionFacultyMap = {}
): void {
  const pages = buildSeatPlanPrintPages(students, allocations, sectionFaculty);
  renderPdfDocument(pages, details, 'combined');
}

function renderPdfDocument(
  pages: ReturnType<typeof buildSeatPlanPrintPages>,
  details: ExamDetails,
  variant: 'combined' | 'master-list' | 'room-sheets'
): void {
  if (pages.length === 0) return;

  const allStudents = pages.flatMap((page) => page.rows);
  const masterColumns = buildSeatPlanTableColumns(allStudents, 'master');
  const roomColumns = buildSeatPlanTableColumns(allStudents, 'room');
  const orientation = roomColumns.length > 6 ? 'landscape' : 'portrait';

  const doc = new jsPDF({ format: 'a4', unit: 'mm', orientation });
  doc.setDocumentProperties({
    title: buildSeatPlanDocumentTitle(details),
    subject: `Seat planner ${variant}`,
    author: 'MABK Seat Planner',
    keywords: 'seat plan, exam seating, room sheet, printable',
    creator: 'MABK Seat Planner',
  });
  doc.setCreationDate(new Date());

  pages.forEach((page, index) => {
    if (index > 0) doc.addPage('a4', orientation);
    drawPdfPage(
      doc,
      page,
      details,
      page.kind === 'master' ? masterColumns : roomColumns,
      orientation
    );
  });

  doc.save(buildSeatPlanExportFilename(details, variant, 'pdf'));
}

function drawPdfPage(
  doc: jsPDF,
  page: SeatPlanPrintPage,
  details: ExamDetails,
  columns: ReturnType<typeof buildSeatPlanTableColumns>,
  orientation: 'landscape' | 'portrait'
): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const tableIsWide = columns.length > 6;

  let cursorY: number = PAGE_MARGIN.top;

  cursorY = drawPdfPageHeader(doc, page, details, pageWidth, cursorY);

  autoTable(doc, {
    startY: cursorY + 1,
    theme: 'plain',
    margin: {
      left: PAGE_MARGIN.left,
      right: PAGE_MARGIN.right,
      bottom: PAGE_MARGIN.bottom + (page.kind === 'room' ? 18 : 8),
    },
    head: [columns.map((column) => column.label)],
    body: page.rows.map((student, index) =>
      columns.map((column) =>
        getSeatPlanTableValue(student, column, index, page.startIndex)
      )
    ),
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: INK,
      font: 'times',
      fontStyle: 'bold',
      halign: 'left',
    },
    styles: {
      cellPadding: tableIsWide ? 1.45 : 1.8,
      font: 'times',
      fontSize: tableIsWide ? 7.4 : 8.5,
      textColor: INK,
      lineWidth: 0,
      overflow: 'linebreak',
      valign: 'middle',
    },
    columnStyles: buildPdfColumnStyles(columns, orientation),
    didDrawCell: (hookData) => {
      if (hookData.section !== 'head' && hookData.section !== 'body') {
        return;
      }

      doc.setDrawColor(...(hookData.section === 'head' ? GRID : GRID_SOFT));
      doc.setLineWidth(hookData.section === 'head' ? 0.22 : 0.1);
      doc.line(
        hookData.cell.x,
        hookData.cell.y + hookData.cell.height,
        hookData.cell.x + hookData.cell.width,
        hookData.cell.y + hookData.cell.height
      );

      if (hookData.section === 'head') {
        doc.line(
          hookData.cell.x,
          hookData.cell.y,
          hookData.cell.x + hookData.cell.width,
          hookData.cell.y
        );
      }
    },
  });

  if (page.kind === 'room') {
    drawAttendanceFooter(doc, pageHeight, pageWidth);
  }

  drawPageFooter(doc, page, pageWidth, pageHeight);
}

function drawPdfPageHeader(
  doc: jsPDF,
  page: SeatPlanPrintPage,
  details: ExamDetails,
  pageWidth: number,
  cursorY: number
): number {
  const metaLine = buildSeatPlanMetaLine(details);
  const organisationLine = [
    details.department.trim(),
    details.university.trim(),
  ]
    .filter(Boolean)
    .join(' | ');
  const descriptor =
    page.kind === 'master'
      ? 'Master List'
      : `Room Sheet - ${page.allocation.room.name}`;
  const detailLines = buildPdfContextLines(doc, page, pageWidth);
  const rightEdge = pageWidth - PAGE_MARGIN.right;

  doc.setTextColor(...INK);
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.text(buildSeatPlanDocumentTitle(details), pageWidth / 2, cursorY + 6, {
    align: 'center',
  });
  cursorY += 8;

  if (metaLine) {
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.text(metaLine, pageWidth / 2, cursorY, { align: 'center' });
    cursorY += 4.2;
  }

  if (organisationLine) {
    doc.setFont('times', 'normal');
    doc.setFontSize(9.1);
    doc.setTextColor(...INK_MUTED);
    doc.text(organisationLine, pageWidth / 2, cursorY, { align: 'center' });
    cursorY += 4.2;
  }

  doc.setDrawColor(...GRID);
  doc.setLineWidth(0.28);
  doc.line(PAGE_MARGIN.left, cursorY, rightEdge, cursorY);
  doc.setLineWidth(0.08);
  doc.line(PAGE_MARGIN.left, cursorY + 1.2, rightEdge, cursorY + 1.2);
  cursorY += 6;

  doc.setTextColor(...INK);
  doc.setFont('times', 'bold');
  doc.setFontSize(10.6);
  doc.text(descriptor, PAGE_MARGIN.left, cursorY);
  doc.text(
    `Page ${page.pageNumber} of ${page.totalPages}`,
    rightEdge,
    cursorY,
    {
      align: 'right',
    }
  );
  cursorY += 4.8;

  doc.setFont('times', 'normal');
  doc.setFontSize(8.7);
  doc.setTextColor(...INK_MUTED);

  for (const line of detailLines) {
    doc.text(line, PAGE_MARGIN.left, cursorY);
    cursorY += 3.8;
  }

  doc.setDrawColor(...GRID_SOFT);
  doc.setLineWidth(0.18);
  doc.line(PAGE_MARGIN.left, cursorY - 0.8, rightEdge, cursorY - 0.8);

  return cursorY + 2;
}

function buildPdfContextLines(
  doc: jsPDF,
  page: SeatPlanPrintPage,
  pageWidth: number
): string[] {
  const lines =
    page.kind === 'master'
      ? [`Rows ${page.startIndex + 1}-${page.startIndex + page.rows.length}`]
      : [
          `Occupancy ${page.allocation.students.length}/${page.allocation.room.capacity} seats`,
          buildSectionCountLine(page.allocation.students),
          ...(page.facultySummary ? [`Faculty: ${page.facultySummary}`] : []),
        ];
  const maxWidth = pageWidth - PAGE_MARGIN.left - PAGE_MARGIN.right;

  return lines.flatMap((line) =>
    (doc.splitTextToSize(line, maxWidth) as string[]).slice(0, 2)
  );
}

function buildPdfColumnStyles(
  columns: ReturnType<typeof buildSeatPlanTableColumns>,
  orientation: 'landscape' | 'portrait'
) {
  const isLandscape = orientation === 'landscape';

  return Object.fromEntries(
    columns.map((column, index) => [
      index,
      column.kind === 'sl'
        ? { cellWidth: 10, halign: 'center' as const }
        : column.kind === 'id'
          ? {
              cellWidth: isLandscape ? 30 : 26,
              font: 'courier' as const,
            }
          : column.kind === 'section'
            ? { cellWidth: 14, halign: 'center' as const }
            : column.kind === 'extra'
              ? { cellWidth: isLandscape ? 28 : 22 }
              : column.kind === 'room'
                ? { cellWidth: isLandscape ? 36 : 30 }
                : column.kind === 'signature'
                  ? { cellWidth: isLandscape ? 44 : 36 }
                  : { cellWidth: 'auto' as const },
    ])
  );
}

function drawAttendanceFooter(
  doc: jsPDF,
  pageHeight: number,
  pageWidth: number
): void {
  const top = pageHeight - PAGE_MARGIN.bottom - 11;
  const totalWidth = pageWidth - PAGE_MARGIN.left - PAGE_MARGIN.right;
  const fieldWidth = (totalWidth - 10) / 2;

  drawAttendanceField(doc, PAGE_MARGIN.left, top, fieldWidth, 'Total Present');
  drawAttendanceField(
    doc,
    PAGE_MARGIN.left + fieldWidth + 10,
    top,
    fieldWidth,
    'Total Absent'
  );
  drawAttendanceField(
    doc,
    PAGE_MARGIN.left,
    top + 7.5,
    fieldWidth,
    'Invigilator Name'
  );
  drawAttendanceField(
    doc,
    PAGE_MARGIN.left + fieldWidth + 10,
    top + 7.5,
    fieldWidth,
    'Invigilator Signature'
  );
}

function drawAttendanceField(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  label: string
) {
  const labelWidth = Math.min(width * 0.42, doc.getTextWidth(`${label}:`) + 4);

  doc.setFont('times', 'normal');
  doc.setFontSize(8.4);
  doc.setTextColor(...INK);
  doc.text(`${label}:`, x, y);

  doc.setDrawColor(...GRID);
  doc.setLineWidth(0.18);
  doc.line(x + labelWidth, y + 0.3, x + width, y + 0.3);
}

function drawPageFooter(
  doc: jsPDF,
  page: ReturnType<typeof buildSeatPlanPrintPages>[number],
  pageWidth: number,
  pageHeight: number
): void {
  const footerY = pageHeight - PAGE_MARGIN.bottom + 3;

  doc.setDrawColor(...GRID_SOFT);
  doc.setLineWidth(0.2);
  doc.line(
    PAGE_MARGIN.left,
    footerY - 5,
    pageWidth - PAGE_MARGIN.right,
    footerY - 5
  );

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...INK_MUTED);
  doc.text(
    page.kind === 'master'
      ? 'Master list'
      : `Room sheet · ${page.allocation.room.name}`,
    PAGE_MARGIN.left,
    footerY
  );
  doc.text(
    `Page ${page.pageNumber} of ${page.totalPages}`,
    pageWidth - PAGE_MARGIN.right,
    footerY,
    { align: 'right' }
  );
}

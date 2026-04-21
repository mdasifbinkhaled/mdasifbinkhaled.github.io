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
  const metaLine = buildSeatPlanMetaLine(details);
  const departmentLine = details.department.trim();
  const universityLine = details.university.trim();
  const tableIsWide = columns.length > 6;

  let cursorY = PAGE_MARGIN.top + 2;

  doc.setTextColor(...INK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.text(buildSeatPlanDocumentTitle(details), pageWidth / 2, cursorY, {
    align: 'center',
  });
  cursorY += 6;

  doc.setTextColor(...INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);

  if (metaLine) {
    doc.text(metaLine, pageWidth / 2, cursorY, { align: 'center' });
    cursorY += 4.5;
  }

  if (departmentLine) {
    doc.text(departmentLine, pageWidth / 2, cursorY, { align: 'center' });
    cursorY += 4.5;
  }

  if (universityLine) {
    doc.text(universityLine, pageWidth / 2, cursorY, { align: 'center' });
    cursorY += 4.5;
  }

  doc.setDrawColor(...GRID);
  doc.setLineWidth(0.25);
  doc.line(
    PAGE_MARGIN.left,
    cursorY + 1,
    pageWidth - PAGE_MARGIN.right,
    cursorY + 1
  );
  cursorY += 4;

  cursorY += drawPdfSummaryBlock(doc, page, pageWidth, cursorY);

  autoTable(doc, {
    startY: cursorY + 1,
    theme: 'grid',
    margin: {
      left: PAGE_MARGIN.left,
      right: PAGE_MARGIN.right,
      bottom: PAGE_MARGIN.bottom + (page.kind === 'room' ? 24 : 8),
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
      fontStyle: 'bold',
      halign: 'center',
      lineColor: GRID,
      lineWidth: 0.18,
    },
    styles: {
      cellPadding: tableIsWide ? 1.3 : 1.7,
      fontSize: tableIsWide ? 7.2 : 8.3,
      textColor: INK,
      lineColor: GRID_SOFT,
      lineWidth: 0.14,
      overflow: 'linebreak',
      valign: 'middle',
    },
    columnStyles: buildPdfColumnStyles(columns, orientation),
  });

  if (page.kind === 'room') {
    drawAttendanceFooter(doc, pageHeight, pageWidth);
  }

  drawPageFooter(doc, page, pageWidth, pageHeight);
}

function drawPdfSummaryBlock(
  doc: jsPDF,
  page: SeatPlanPrintPage,
  pageWidth: number,
  cursorY: number
): number {
  const boxWidth = page.kind === 'master' ? 45 : 48;
  const textWidth =
    pageWidth - PAGE_MARGIN.left - PAGE_MARGIN.right - boxWidth - 6;
  const primaryText =
    page.kind === 'master'
      ? `Rows ${page.startIndex + 1}–${page.startIndex + page.rows.length}`
      : `${page.allocation.students.length}/${page.allocation.room.capacity} seats occupied`;
  const secondaryText =
    page.kind === 'room'
      ? buildSectionCountLine(page.allocation.students)
      : undefined;
  const tertiaryText =
    page.kind === 'room' ? (page.facultySummary ?? undefined) : undefined;
  const primaryLines = doc.splitTextToSize(primaryText, textWidth) as string[];
  const secondaryLines = secondaryText
    ? (doc.splitTextToSize(secondaryText, textWidth) as string[]).slice(0, 2)
    : [];
  const tertiaryLines = tertiaryText
    ? (
        doc.splitTextToSize(`Faculty: ${tertiaryText}`, textWidth) as string[]
      ).slice(0, 2)
    : [];
  const lineHeight = 3.7;
  const textLineCount =
    primaryLines.length + secondaryLines.length + tertiaryLines.length;
  const blockHeight = Math.max(10, textLineCount * lineHeight + 2);
  const boxX = pageWidth - PAGE_MARGIN.right - boxWidth;
  const boxLabel = page.kind === 'master' ? 'SHEET' : 'ROOM';
  const boxValue =
    page.kind === 'master' ? 'MASTER LIST' : page.allocation.room.name;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(...INK_MUTED);
  let textY = cursorY + 3.6;
  doc.text(primaryLines, PAGE_MARGIN.left, textY);

  if (secondaryLines.length > 0) {
    textY += primaryLines.length * lineHeight;
    doc.text(secondaryLines, PAGE_MARGIN.left, textY);
  }

  if (tertiaryLines.length > 0) {
    textY += secondaryLines.length * lineHeight;
    doc.text(tertiaryLines, PAGE_MARGIN.left, textY);
  }

  doc.setDrawColor(...GRID);
  doc.setLineWidth(0.2);
  doc.rect(boxX, cursorY, boxWidth, blockHeight);
  doc.line(boxX + 12, cursorY, boxX + 12, cursorY + blockHeight);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...INK_MUTED);
  doc.text(boxLabel, boxX + 2, cursorY + 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(...INK);
  doc.text(boxValue, boxX + boxWidth - 2, cursorY + blockHeight / 2 + 1.5, {
    align: 'right',
  });

  return blockHeight + 3;
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
          ? { cellWidth: isLandscape ? 28 : 24 }
          : column.kind === 'section'
            ? { cellWidth: 14, halign: 'center' as const }
            : column.kind === 'extra'
              ? { cellWidth: isLandscape ? 26 : 20 }
              : column.kind === 'room'
                ? { cellWidth: isLandscape ? 34 : 28 }
                : column.kind === 'signature'
                  ? { cellWidth: isLandscape ? 42 : 34 }
                  : { cellWidth: 'auto' as const },
    ])
  );
}

function drawAttendanceFooter(
  doc: jsPDF,
  pageHeight: number,
  pageWidth: number
): void {
  const top = pageHeight - PAGE_MARGIN.bottom - 18;
  const totalWidth = pageWidth - PAGE_MARGIN.left - PAGE_MARGIN.right;
  const fieldWidth = (totalWidth - 4) / 2;

  drawAttendanceField(doc, PAGE_MARGIN.left, top, fieldWidth, 'Total Present');
  drawAttendanceField(
    doc,
    PAGE_MARGIN.left + fieldWidth + 4,
    top,
    fieldWidth,
    'Total Absent'
  );
  drawAttendanceField(
    doc,
    PAGE_MARGIN.left,
    top + 10,
    fieldWidth,
    'Invigilator Name'
  );
  drawAttendanceField(
    doc,
    PAGE_MARGIN.left + fieldWidth + 4,
    top + 10,
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
  const labelWidth = Math.min(32, width * 0.42);

  doc.setDrawColor(...GRID);
  doc.setLineWidth(0.18);
  doc.rect(x, y, width, 8);
  doc.line(x + labelWidth, y, x + labelWidth, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(...INK);
  doc.text(label, x + 2, y + 5);
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

  doc.setFont('helvetica', 'normal');
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

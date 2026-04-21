import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  buildSectionCountLine,
  buildSeatPlanDocumentTitle,
  buildSeatPlanExportFilename,
  buildSeatPlanMetaLine,
  buildSeatPlanPrintPages,
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

const HEADER_FILL: [number, number, number] = [41, 98, 150];
const TEXT_STRONG: [number, number, number] = [15, 23, 42];
const TEXT_MUTED: [number, number, number] = [100, 116, 139];
const BORDER: [number, number, number] = [226, 232, 240];
const ROW_ALT: [number, number, number] = [248, 250, 252];

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

  const doc = new jsPDF({ format: 'a4', unit: 'mm', orientation: 'portrait' });
  doc.setDocumentProperties({
    title: buildSeatPlanDocumentTitle(details),
    subject: `Seat planner ${variant}`,
    author: 'MABK Seat Planner',
    keywords: 'seat plan, exam seating, room sheet, printable',
    creator: 'MABK Seat Planner',
  });
  doc.setCreationDate(new Date());

  pages.forEach((page, index) => {
    if (index > 0) doc.addPage('a4', 'portrait');
    drawPdfPage(doc, page, details);
  });

  doc.save(buildSeatPlanExportFilename(details, variant, 'pdf'));
}

function drawPdfPage(
  doc: jsPDF,
  page: ReturnType<typeof buildSeatPlanPrintPages>[number],
  details: ExamDetails
): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const metaLine = buildSeatPlanMetaLine(details);
  const organisationLine = [details.department, details.university]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' • ');

  let cursorY = PAGE_MARGIN.top;

  doc.setTextColor(...TEXT_STRONG);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(buildSeatPlanDocumentTitle(details), pageWidth / 2, cursorY, {
    align: 'center',
  });
  cursorY += 6;

  doc.setTextColor(...TEXT_MUTED);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);

  if (metaLine) {
    doc.text(metaLine, pageWidth / 2, cursorY, { align: 'center' });
    cursorY += 4.5;
  }

  if (organisationLine) {
    doc.text(organisationLine, pageWidth / 2, cursorY, { align: 'center' });
    cursorY += 4.5;
  }

  doc.setDrawColor(...HEADER_FILL);
  doc.setLineWidth(0.4);
  doc.line(
    PAGE_MARGIN.left,
    cursorY + 2,
    pageWidth - PAGE_MARGIN.right,
    cursorY + 2
  );
  cursorY += 7;

  doc.setTextColor(...TEXT_STRONG);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(
    page.kind === 'master' ? 'Master list' : 'Room sheet',
    PAGE_MARGIN.left,
    cursorY
  );
  doc.text(
    page.kind === 'master'
      ? `Rows ${page.startIndex + 1}–${page.startIndex + page.rows.length}`
      : `Room ${page.allocation.room.name}`,
    pageWidth - PAGE_MARGIN.right,
    cursorY,
    { align: 'right' }
  );
  cursorY += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_MUTED);

  if (page.kind === 'room') {
    doc.text(
      `${page.allocation.students.length}/${page.allocation.room.capacity} seats • ${buildSectionCountLine(page.allocation.students)}`,
      PAGE_MARGIN.left,
      cursorY
    );
    cursorY += 4;

    if (page.facultySummary) {
      doc.text(`Faculty: ${page.facultySummary}`, PAGE_MARGIN.left, cursorY);
      cursorY += 4;
    }
  }

  autoTable(doc, {
    startY: cursorY + 1,
    theme: 'grid',
    margin: {
      left: PAGE_MARGIN.left,
      right: PAGE_MARGIN.right,
    },
    head:
      page.kind === 'master'
        ? [['SL', 'Student ID', 'Student Name', 'Section', 'Room']]
        : [['SL', 'Student ID', 'Student Name', 'Section', 'Signature']],
    body:
      page.kind === 'master'
        ? page.rows.map((student, index) => [
            page.startIndex + index + 1,
            student.id,
            student.name,
            student.section,
            student.room ?? 'Unassigned',
          ])
        : page.rows.map((student, index) => [
            page.startIndex + index + 1,
            student.id,
            student.name,
            student.section,
            '',
          ]),
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    alternateRowStyles: { fillColor: ROW_ALT },
    styles: {
      cellPadding: 1.9,
      fontSize: 8.5,
      textColor: TEXT_STRONG,
      lineColor: BORDER,
      lineWidth: 0.1,
      overflow: 'linebreak',
      valign: 'middle',
    },
    columnStyles:
      page.kind === 'master'
        ? {
            0: { cellWidth: 12, halign: 'center' as const },
            1: { cellWidth: 28 },
            2: { cellWidth: 'auto' as const },
            3: { cellWidth: 18, halign: 'center' as const },
            4: { cellWidth: 28 },
          }
        : {
            0: { cellWidth: 12, halign: 'center' as const },
            1: { cellWidth: 28 },
            2: { cellWidth: 'auto' as const },
            3: { cellWidth: 18, halign: 'center' as const },
            4: { cellWidth: 42 },
          },
  });

  if (page.kind === 'room') {
    drawAttendanceFooter(doc, pageHeight, pageWidth);
  }

  drawPageFooter(doc, page, pageWidth, pageHeight);
}

function drawAttendanceFooter(
  doc: jsPDF,
  pageHeight: number,
  pageWidth: number
): void {
  const labelY = pageHeight - PAGE_MARGIN.bottom - 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_STRONG);

  doc.text('Total Present', PAGE_MARGIN.left, labelY);
  doc.line(39, labelY, 72, labelY);

  doc.text('Total Absent', pageWidth / 2 + 5, labelY);
  doc.line(pageWidth / 2 + 27, labelY, pageWidth - PAGE_MARGIN.right, labelY);

  doc.text('Invigilator Name', PAGE_MARGIN.left, labelY + 9);
  doc.line(42, labelY + 9, 78, labelY + 9);

  doc.text('Invigilator Signature', pageWidth / 2 + 5, labelY + 9);
  doc.line(
    pageWidth / 2 + 38,
    labelY + 9,
    pageWidth - PAGE_MARGIN.right,
    labelY + 9
  );
}

function drawPageFooter(
  doc: jsPDF,
  page: ReturnType<typeof buildSeatPlanPrintPages>[number],
  pageWidth: number,
  pageHeight: number
): void {
  const footerY = pageHeight - PAGE_MARGIN.bottom + 3;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.2);
  doc.line(
    PAGE_MARGIN.left,
    footerY - 5,
    pageWidth - PAGE_MARGIN.right,
    footerY - 5
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
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

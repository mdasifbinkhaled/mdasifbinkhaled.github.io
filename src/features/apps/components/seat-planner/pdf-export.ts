// ────────────────────────────────────────────────
// Seat Planner — PDF generation (jsPDF + autoTable)
// ────────────────────────────────────────────────
// This module is dynamically imported so jsPDF & autoTable are
// only downloaded when the user actually clicks an export button.

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Student, ExamDetails, RoomAllocation } from './types';

// ── shared PDF header ───────────────────────────

const HEADER_FILL: [number, number, number] = [41, 98, 150]; // steel‑blue

function addHeader(doc: jsPDF, d: ExamDetails, startY = 12): number {
  const cx = doc.internal.pageSize.getWidth() / 2;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(
    d.courseCodes + (d.courseTitle ? ` — ${d.courseTitle}` : ''),
    cx,
    startY,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  let y = startY + 7;

  if (d.examType || d.semester || d.year) {
    doc.text(
      [d.examType, [d.semester, d.year].filter(Boolean).join(' ')]
        .filter(Boolean)
        .join(' — '),
      cx,
      y,
      { align: 'center' }
    );
    y += 6;
  }
  if (d.department) {
    doc.text(d.department, cx, y, { align: 'center' });
    y += 6;
  }
  if (d.university) {
    doc.text(d.university, cx, y, { align: 'center' });
    y += 6;
  }

  return y + 4;
}

// column style constants
const COL_SL = { cellWidth: 12, halign: 'center' as const };
const COL_ID = { cellWidth: 28 };
const COL_NAME = { cellWidth: 'auto' as const };
const COL_SEC = { cellWidth: 18, halign: 'center' as const };

// ── master list ─────────────────────────────────

export function generateMasterListPDF(
  students: Student[],
  details: ExamDetails
): void {
  const doc = new jsPDF();
  const tableY = addHeader(doc, details);

  autoTable(doc, {
    startY: tableY,
    head: [['SL', 'Student ID', 'Student Name', 'Section', 'Room Number']],
    body: students.map((s, i) => [
      i + 1,
      s.id,
      s.name,
      s.section,
      s.room ?? 'Unassigned',
    ]),
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    columnStyles: {
      0: COL_SL,
      1: COL_ID,
      2: COL_NAME,
      3: COL_SEC,
      4: { cellWidth: 32 },
    },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    styles: { cellPadding: 2, fontSize: 9 },
  });

  doc.save(filename(details, 'Master_List'));
}

// ── room sheets ─────────────────────────────────

export function generateRoomSheetsPDF(
  allocations: RoomAllocation[],
  details: ExamDetails
): void {
  const doc = new jsPDF();

  allocations.forEach((alloc, idx) => {
    if (idx > 0) doc.addPage();
    renderRoomPage(doc, alloc, details);
  });

  doc.save(filename(details, 'Room_Sheets'));
}

// ── combined (master + rooms) ───────────────────

export function generateCombinedPDF(
  students: Student[],
  allocations: RoomAllocation[],
  details: ExamDetails
): void {
  const doc = new jsPDF();
  const tableY = addHeader(doc, details);

  autoTable(doc, {
    startY: tableY,
    head: [['SL', 'Student ID', 'Student Name', 'Section', 'Room Number']],
    body: students.map((s, i) => [
      i + 1,
      s.id,
      s.name,
      s.section,
      s.room ?? 'Unassigned',
    ]),
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    columnStyles: {
      0: COL_SL,
      1: COL_ID,
      2: COL_NAME,
      3: COL_SEC,
      4: { cellWidth: 32 },
    },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    styles: { cellPadding: 2, fontSize: 9 },
  });

  for (const alloc of allocations) {
    doc.addPage();
    renderRoomPage(doc, alloc, details);
  }

  doc.save(filename(details, 'Seat_Plan'));
}

// ── internals ───────────────────────────────────

function renderRoomPage(
  doc: jsPDF,
  alloc: RoomAllocation,
  details: ExamDetails
): void {
  const pw = doc.internal.pageSize.getWidth();
  const tableY = addHeader(doc, details);

  // room label (right‑aligned)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`Room    ${alloc.room.name}`, pw - 15, tableY - 2, {
    align: 'right',
  });

  autoTable(doc, {
    startY: tableY + 4,
    head: [['SL', 'Student ID', 'Student Name', 'Section', 'Signature']],
    body: alloc.students.map((s, i) => [i + 1, s.id, s.name, s.section, '']),
    headStyles: {
      fillColor: HEADER_FILL,
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    columnStyles: {
      0: COL_SL,
      1: COL_ID,
      2: COL_NAME,
      3: COL_SEC,
      4: { cellWidth: 45 },
    },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    styles: { cellPadding: 2, fontSize: 9 },
  });

  // footer — attendance & invigilator lines
  const finalY: number =
    (doc as unknown as Record<string, { finalY?: number }>).lastAutoTable
      ?.finalY ?? 200;
  const fy = finalY + 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  doc.text('Total Present', 20, fy);
  doc.line(58, fy, 90, fy);

  doc.text('Total Absent', pw / 2 + 15, fy);
  doc.line(pw / 2 + 50, fy, pw / 2 + 82, fy);

  doc.text('Invigilator Name', 20, fy + 12);
  doc.line(62, fy + 12, 95, fy + 12);

  doc.text('Invigilator Signature', pw / 2 + 15, fy + 12);
  doc.line(pw / 2 + 58, fy + 12, pw - 15, fy + 12);
}

function filename(d: ExamDetails, suffix: string): string {
  const base = (d.courseCodes || 'seat-plan')
    .replace(/\//g, '-')
    .replace(/\s+/g, '_');
  return `${base}_${suffix}.pdf`;
}

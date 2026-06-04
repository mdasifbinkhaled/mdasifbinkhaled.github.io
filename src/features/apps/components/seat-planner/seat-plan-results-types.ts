// ────────────────────────────────────────────────
// Seat Planner — SeatPlanResults shared prop types
// ────────────────────────────────────────────────

import type {
  AllocationResult,
  ExamDetails,
  SectionFacultyMap,
  Student,
} from './types';

export interface SeatPlanResultsProps {
  result: AllocationResult;
  stats: {
    total: number;
    assigned: number;
    unassigned: number;
    roomsUsed: number;
    utilisation: number;
    sections: number;
  };
  sections: number[];
  sectionFaculty: SectionFacultyMap;
  allStudentsSorted: Student[];
  examDetails: ExamDetails;
  selectedRoomIdx: number;
  isExporting: boolean;
  printRef: React.RefObject<HTMLDivElement | null>;
  onSelectRoom: (idx: number) => void;
  onReassign: (studentId: string, targetRoom: string) => void;
  onExportPDF: (type: 'master' | 'rooms' | 'combined') => void;
  onExportCSV: () => void;
  onExportPNG: () => void;
  onPrint: () => void;
}

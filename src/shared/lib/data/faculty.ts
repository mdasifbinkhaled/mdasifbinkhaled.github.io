/**
 * Faculty Contact Information
 * Single Source of Truth for faculty emails and details
 */

export interface FacultyMember {
  name: string;
  email: string;
  role?: string;
}

export const FACULTY = {
  // Me
  ASIF: {
    name: 'Md Asif Bin Khaled',
    email: 'mdasifbinkhaled@iub.edu.bd',
    role: 'Senior Lecturer',
  },
  // Colleagues (Extracted from Forensic Audit)
  MOTIUR: {
    name: 'Dr. Motiur Rahman',
    email: 'motiur@iub.edu.bd',
  },
  JUNAYED: {
    name: 'Junayed Ahmed',
    email: 'junayed.nde16sets@iub.edu.bd',
  },
  SAS: {
    name: 'S A M Sashaikot',
    email: 'sashaikot07sets@iub.edu.bd',
  },
  MOSTAFIZ: {
    name: 'Mostafizur Rahman',
    email: 'mostafizs154sets@iub.edu.bd',
  },
  ZAHANGIR: {
    name: 'Dr. Zahangir Alom',
    email: 'zahangir.alam@iub.edu.bd',
  },
} as const;

/**
 * Get faculty email by ID
 */
export const getFacultyEmail = (id: keyof typeof FACULTY) => FACULTY[id].email;

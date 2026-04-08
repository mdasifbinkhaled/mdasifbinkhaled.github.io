export interface Student {
  name: string;
  role:
    | 'Thesis Student'
    | 'Undergraduate Researcher'
    | 'Teaching Assistant'
    | 'Student Mentee';
  period: string;
  project?: string;
  status: 'Current' | 'Alumni';
}

// TODO: Populate with real student data. Required fields per entry:
//   name:    Full name (string)
//   role:    'Thesis Student' | 'Undergraduate Researcher' | 'Teaching Assistant' | 'Student Mentee'
//   period:  e.g. '2024 - Present' or 'Summer 2024'
//   project: Brief description of thesis/project (optional)
//   status:  'Current' | 'Alumni'
export const mentorshipData: Student[] = [];

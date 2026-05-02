export interface PlannerCourse {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[]; // IDs of prerequisite courses
  completed: boolean;
  group?: string; // display section label (e.g. "Core", "Area 01 — Software Engineering")
}

export interface CoursePlannerPreset {
  name: string;
  courses: Omit<PlannerCourse, 'completed'>[];
}

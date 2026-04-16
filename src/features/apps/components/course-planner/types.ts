export interface PlannerCourse {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[]; // IDs of prerequisite courses
  completed: boolean;
}

export interface CoursePlannerPreset {
  name: string;
  courses: Omit<PlannerCourse, 'completed'>[];
}

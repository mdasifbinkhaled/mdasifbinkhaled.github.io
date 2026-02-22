export type GradeComponent = {
  id: string;
  name: string;
  weight: number; // e.g. 25 for 25%
  score: number; // e.g. 85
  maxScore: number; // e.g. 100
};

export type GradingScale = {
  label: string;
  minPercentage: number;
  gpa: number;
};

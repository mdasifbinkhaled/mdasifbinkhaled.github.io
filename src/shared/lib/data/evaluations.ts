/**
 * Teaching Evaluation Data
 * Single Source of Truth for student feedback scores
 */

export interface TeachingEvaluation {
  semester: string;
  year: number;
  courseCode: string;
  section: number;
  score: number; // The specific section score
  averageScore?: number; // The semester average reported in the document
}

export const ACADEMIC_EVALUATIONS: TeachingEvaluation[] = [
  // 1. Spring 2019
  {
    semester: 'Spring',
    year: 2019,
    courseCode: 'CIS101',
    section: 5,
    score: 4.2,
  },
  {
    semester: 'Spring',
    year: 2019,
    courseCode: 'CIS101L',
    section: 5,
    score: 4.14,
  },
  {
    semester: 'Spring',
    year: 2019,
    courseCode: 'CIS101',
    section: 2,
    score: 4.37,
  },
  {
    semester: 'Spring',
    year: 2019,
    courseCode: 'CIS101L',
    section: 2,
    score: 4.38,
  },
  {
    semester: 'Spring',
    year: 2019,
    courseCode: 'CSC101',
    section: 3,
    score: 4.5,
  },
  {
    semester: 'Spring',
    year: 2019,
    courseCode: 'CSC101L',
    section: 3,
    score: 4.61,
  },

  // 2. Summer 2019
  {
    semester: 'Summer',
    year: 2019,
    courseCode: 'CIS101',
    section: 3,
    score: 4.4,
  },
  {
    semester: 'Summer',
    year: 2019,
    courseCode: 'CIS101L',
    section: 3,
    score: 4.35,
  },
  {
    semester: 'Summer',
    year: 2019,
    courseCode: 'CIS101',
    section: 4,
    score: 4.18,
  },
  {
    semester: 'Summer',
    year: 2019,
    courseCode: 'CIS101L',
    section: 4,
    score: 4.17,
  },
  {
    semester: 'Summer',
    year: 2019,
    courseCode: 'CSE211',
    section: 3,
    score: 4.23,
  },
  {
    semester: 'Summer',
    year: 2019,
    courseCode: 'CSE211L',
    section: 3,
    score: 4.28,
  },

  // 3. Autumn 2019
  {
    semester: 'Autumn',
    year: 2019,
    courseCode: 'CSE203',
    section: 4,
    score: 4.2,
  },
  {
    semester: 'Autumn',
    year: 2019,
    courseCode: 'CSE203L',
    section: 4,
    score: 4.29,
  },
  {
    semester: 'Autumn',
    year: 2019,
    courseCode: 'CSE211',
    section: 1,
    score: 4.16,
  },
  {
    semester: 'Autumn',
    year: 2019,
    courseCode: 'CSE211L',
    section: 1,
    score: 4.21,
  },
  {
    semester: 'Autumn',
    year: 2019,
    courseCode: 'CSE499',
    section: 11,
    score: 4.72,
  },

  // 4. Spring 2020
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE203',
    section: 1,
    score: 3.81,
  },
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE203L',
    section: 1,
    score: 3.75,
  },
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE203',
    section: 3,
    score: 4.28,
  },
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE203L',
    section: 3,
    score: 4.24,
  },
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE211',
    section: 2,
    score: 4.33,
  },
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE211L',
    section: 2,
    score: 4.31,
  },
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE211',
    section: 3,
    score: 3.59,
  },
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE211L',
    section: 3,
    score: 3.57,
  },
  {
    semester: 'Spring',
    year: 2020,
    courseCode: 'CSE499',
    section: 9,
    score: 3.5,
  },

  // 5. Summer 2020
  {
    semester: 'Summer',
    year: 2020,
    courseCode: 'CSE211',
    section: 1,
    score: 4.19,
  },
  {
    semester: 'Summer',
    year: 2020,
    courseCode: 'CSE211L',
    section: 1,
    score: 4.17,
  },
  {
    semester: 'Summer',
    year: 2020,
    courseCode: 'CSE211',
    section: 2,
    score: 3.97,
  },
  {
    semester: 'Summer',
    year: 2020,
    courseCode: 'CSE211L',
    section: 2,
    score: 3.99,
  },
  {
    semester: 'Summer',
    year: 2020,
    courseCode: 'CSE211',
    section: 3,
    score: 4.21,
  },
  {
    semester: 'Summer',
    year: 2020,
    courseCode: 'CSE211L',
    section: 3,
    score: 4.17,
  },
  {
    semester: 'Summer',
    year: 2020,
    courseCode: 'CSE499',
    section: 9,
    score: 4.5,
  },

  // 6. Autumn 2020
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE211',
    section: 1,
    score: 4.36,
  },
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE211L',
    section: 1,
    score: 4.34,
  },
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE211',
    section: 2,
    score: 4.29,
  },
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE211L',
    section: 2,
    score: 4.34,
  },
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE211',
    section: 3,
    score: 4.37,
  },
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE211L',
    section: 3,
    score: 4.43,
  },
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE211',
    section: 4,
    score: 4.72,
  },
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE211L',
    section: 4,
    score: 4.75,
  },
  {
    semester: 'Autumn',
    year: 2020,
    courseCode: 'CSE499',
    section: 11,
    score: 3.67,
  },

  // 7. Spring 2021
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSC101',
    section: 7,
    score: 4.5,
  },
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSC101L',
    section: 7,
    score: 4.6,
  },
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSE211',
    section: 1,
    score: 4.73,
  },
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSE211L',
    section: 1,
    score: 4.71,
  },
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSE211',
    section: 2,
    score: 4.41,
  },
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSE211L',
    section: 2,
    score: 4.55,
  },
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSE211',
    section: 4,
    score: 4.4,
  },
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSE211L',
    section: 4,
    score: 4.45,
  },
  {
    semester: 'Spring',
    year: 2021,
    courseCode: 'CSE499',
    section: 11,
    score: 4.08,
  },

  // 8. Summer 2021
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSC101',
    section: 3,
    score: 4.58,
  },
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSC101L',
    section: 3,
    score: 4.61,
  },
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSC101',
    section: 4,
    score: 3.95,
  },
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSC101L',
    section: 4,
    score: 4.02,
  },
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSE211',
    section: 3,
    score: 4.43,
  },
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSE211L',
    section: 3,
    score: 4.44,
  },
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSE211',
    section: 4,
    score: 4.36,
  },
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSE211L',
    section: 4,
    score: 4.28,
  },
  {
    semester: 'Summer',
    year: 2021,
    courseCode: 'CSE499',
    section: 10,
    score: 3.99,
  },

  // 9. Autumn 2021
  {
    semester: 'Autumn',
    year: 2021,
    courseCode: 'CSE104L',
    section: 5,
    score: 4.32,
  },
  {
    semester: 'Autumn',
    year: 2021,
    courseCode: 'CSE211',
    section: 2,
    score: 4.3,
  },
  {
    semester: 'Autumn',
    year: 2021,
    courseCode: 'CSE211L',
    section: 2,
    score: 4.3,
  },
  {
    semester: 'Autumn',
    year: 2021,
    courseCode: 'CSE211',
    section: 3,
    score: 4.27,
  },
  {
    semester: 'Autumn',
    year: 2021,
    courseCode: 'CSE211L',
    section: 3,
    score: 4.28,
  },
  {
    semester: 'Autumn',
    year: 2021,
    courseCode: 'CSE317',
    section: 1,
    score: 4.16,
  },
  {
    semester: 'Autumn',
    year: 2021,
    courseCode: 'CSE317L',
    section: 1,
    score: 4.18,
  },
  {
    semester: 'Autumn',
    year: 2021,
    courseCode: 'CSE499',
    section: 9,
    score: 5,
  },

  // 10. Spring 2022
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE211',
    section: 1,
    score: 4.47,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE211L',
    section: 1,
    score: 4.5,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE211',
    section: 2,
    score: 3.97,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE211L',
    section: 2,
    score: 3.98,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE211',
    section: 3,
    score: 4.36,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE211L',
    section: 3,
    score: 4.38,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE211',
    section: 4,
    score: 4.11,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE211L',
    section: 4,
    score: 4.15,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE498',
    section: 9,
    score: 4.58,
  },
  {
    semester: 'Spring',
    year: 2022,
    courseCode: 'CSE499',
    section: 11,
    score: 4.05,
  },

  // 11. Summer 2022
  {
    semester: 'Summer',
    year: 2022,
    courseCode: 'CSE211',
    section: 1,
    score: 4.49,
  },
  {
    semester: 'Summer',
    year: 2022,
    courseCode: 'CSE211L',
    section: 1,
    score: 4.58,
  },
  {
    semester: 'Summer',
    year: 2022,
    courseCode: 'CSE211',
    section: 2,
    score: 4.54,
  },
  {
    semester: 'Summer',
    year: 2022,
    courseCode: 'CSE211L',
    section: 2,
    score: 4.67,
  },
  {
    semester: 'Summer',
    year: 2022,
    courseCode: 'CSE211',
    section: 3,
    score: 4.45,
  },
  {
    semester: 'Summer',
    year: 2022,
    courseCode: 'CSE211L',
    section: 3,
    score: 4.5,
  },
  {
    semester: 'Summer',
    year: 2022,
    courseCode: 'CSE211',
    section: 5,
    score: 4.53,
  },
  {
    semester: 'Summer',
    year: 2022,
    courseCode: 'CSE211L',
    section: 5,
    score: 4.5,
  },

  // 12. Autumn 2022
  {
    semester: 'Autumn',
    year: 2022,
    courseCode: 'CSE211',
    section: 1,
    score: 4.49,
  },
  {
    semester: 'Autumn',
    year: 2022,
    courseCode: 'CSE211L',
    section: 1,
    score: 4.34,
  },
  {
    semester: 'Autumn',
    year: 2022,
    courseCode: 'CSE211',
    section: 3,
    score: 4.39,
  },
  {
    semester: 'Autumn',
    year: 2022,
    courseCode: 'CSE211L',
    section: 3,
    score: 4.32,
  },
  {
    semester: 'Autumn',
    year: 2022,
    courseCode: 'CSE211',
    section: 4,
    score: 4.49,
  },
  {
    semester: 'Autumn',
    year: 2022,
    courseCode: 'CSE211L',
    section: 4,
    score: 4.33,
  },
  {
    semester: 'Autumn',
    year: 2022,
    courseCode: 'CSE201',
    section: 3,
    score: 4.24,
  },

  // 13. Spring 2023
  {
    semester: 'Spring',
    year: 2023,
    courseCode: 'CSC301',
    section: 1,
    score: 4.2,
  },
  {
    semester: 'Spring',
    year: 2023,
    courseCode: 'CSE211',
    section: 2,
    score: 4.61,
  },
  {
    semester: 'Spring',
    year: 2023,
    courseCode: 'CSE203',
    section: 3,
    score: 4.16,
  },
  {
    semester: 'Spring',
    year: 2023,
    courseCode: 'CSE211',
    section: 3,
    score: 4.52,
  },
  {
    semester: 'Spring',
    year: 2023,
    courseCode: 'CSE211',
    section: 4,
    score: 4.39,
  },

  // 14. Summer 2023
  {
    semester: 'Summer',
    year: 2023,
    courseCode: 'CSC301',
    section: 4,
    score: 4.58,
  },
  {
    semester: 'Summer',
    year: 2023,
    courseCode: 'CSE211',
    section: 5,
    score: 4.69,
  },
  {
    semester: 'Summer',
    year: 2023,
    courseCode: 'CSE211',
    section: 6,
    score: 4.59,
  },
  {
    semester: 'Summer',
    year: 2023,
    courseCode: 'CSE211',
    section: 10,
    score: 4.53,
  },
  {
    semester: 'Summer',
    year: 2023,
    courseCode: 'CSE211',
    section: 12,
    score: 4.37,
  },

  // 15. Autumn 2023
  {
    semester: 'Autumn',
    year: 2023,
    courseCode: 'CSE211',
    section: 2,
    score: 4.6,
  },
  {
    semester: 'Autumn',
    year: 2023,
    courseCode: 'CIS101',
    section: 8,
    score: 4.01,
  },
  {
    semester: 'Autumn',
    year: 2023,
    courseCode: 'CSC301',
    section: 1,
    score: 4.42,
  },
  {
    semester: 'Autumn',
    year: 2023,
    courseCode: 'CSC301',
    section: 2,
    score: 3.84,
  },
  {
    semester: 'Autumn',
    year: 2023,
    courseCode: 'CSC301',
    section: 5,
    score: 4.12,
  },

  // 16. Spring 2024
  {
    semester: 'Spring',
    year: 2024,
    courseCode: 'CIS101',
    section: 11,
    score: 4.07,
  },
  {
    semester: 'Spring',
    year: 2024,
    courseCode: 'CSE211',
    section: 7,
    score: 4.54,
  },
  {
    semester: 'Spring',
    year: 2024,
    courseCode: 'CIS101',
    section: 10,
    score: 3.94,
  },
  {
    semester: 'Spring',
    year: 2024,
    courseCode: 'CSE211',
    section: 4,
    score: 4.29,
  },
  {
    semester: 'Spring',
    year: 2024,
    courseCode: 'CSE211',
    section: 2,
    score: 4.47,
  },

  // 17. Summer 2024
  {
    semester: 'Summer',
    year: 2024,
    courseCode: 'CIS101',
    section: 6,
    score: 4.28,
  },
  {
    semester: 'Summer',
    year: 2024,
    courseCode: 'CSE100',
    section: 8,
    score: 4.45,
  },
  {
    semester: 'Summer',
    year: 2024,
    courseCode: 'CIS101',
    section: 13,
    score: 4.33,
  },
  {
    semester: 'Summer',
    year: 2024,
    courseCode: 'CSE211',
    section: 5,
    score: 4.54,
  },
  {
    semester: 'Summer',
    year: 2024,
    courseCode: 'CIS101',
    section: 1,
    score: 3.9,
  },

  // 18. Autumn 2024
  {
    semester: 'Autumn',
    year: 2024,
    courseCode: 'CIS101',
    section: 5,
    score: 4.15,
  },
  {
    semester: 'Autumn',
    year: 2024,
    courseCode: 'CIS101',
    section: 12,
    score: 3.87,
  },
  {
    semester: 'Autumn',
    year: 2024,
    courseCode: 'CIS101',
    section: 14,
    score: 4.35,
  },
  {
    semester: 'Autumn',
    year: 2024,
    courseCode: 'CSE100',
    section: 6,
    score: 4.51,
  },
  {
    semester: 'Autumn',
    year: 2024,
    courseCode: 'CSE211',
    section: 3,
    score: 4.34,
  },

  // 19. Spring 2025
  {
    semester: 'Spring',
    year: 2025,
    courseCode: 'CIS101',
    section: 1,
    score: 4.19,
  },
  {
    semester: 'Spring',
    year: 2025,
    courseCode: 'CIS101',
    section: 7,
    score: 4.45,
  },
  {
    semester: 'Spring',
    year: 2025,
    courseCode: 'CIS101',
    section: 8,
    score: 3.75,
  },
  {
    semester: 'Spring',
    year: 2025,
    courseCode: 'CSE100',
    section: 12,
    score: 4.62,
  },
  {
    semester: 'Spring',
    year: 2025,
    courseCode: 'CSE211',
    section: 2,
    score: 3.55,
  },

  // 20. Summer 2025
  {
    semester: 'Summer',
    year: 2025,
    courseCode: 'CIS101',
    section: 1,
    score: 4.24,
  },
  {
    semester: 'Summer',
    year: 2025,
    courseCode: 'CIS101',
    section: 2,
    score: 4.26,
  },
  {
    semester: 'Summer',
    year: 2025,
    courseCode: 'CIS101',
    section: 8,
    score: 4.17,
  },
  {
    semester: 'Summer',
    year: 2025,
    courseCode: 'CSE100',
    section: 2,
    score: 4.66,
  },
  {
    semester: 'Summer',
    year: 2025,
    courseCode: 'CSE211',
    section: 3,
    score: 4.63,
  },

  // 21. Autumn 2025
  {
    semester: 'Autumn',
    year: 2025,
    courseCode: 'CIS101',
    section: 8,
    score: 4.61,
  },
  {
    semester: 'Autumn',
    year: 2025,
    courseCode: 'CIS101',
    section: 11,
    score: 3.93,
  },
  {
    semester: 'Autumn',
    year: 2025,
    courseCode: 'CIS101',
    section: 12,
    score: 4.37,
  },
  {
    semester: 'Autumn',
    year: 2025,
    courseCode: 'CSE211',
    section: 2,
    score: 4.9,
  },
  {
    semester: 'Autumn',
    year: 2025,
    courseCode: 'CSE211',
    section: 5,
    score: 4.77,
  },
];

/**
 * Calculates the global weighted average rating across all courses
 */
export const getGlobalAverageRating = (): number => {
  const total = ACADEMIC_EVALUATIONS.reduce((sum, ev) => sum + ev.score, 0);
  return total / ACADEMIC_EVALUATIONS.length;
};

/**
 * Calculates the trend (average per semester)
 */
export const getSemesterTrends = () => {
  const map = new Map<
    string,
    { total: number; count: number; order: number }
  >();

  ACADEMIC_EVALUATIONS.forEach((ev) => {
    const key = `${ev.semester} ${ev.year}`;
    const yearlyWeight = ev.year * 10;
    const semesterWeight =
      ev.semester === 'Spring' ? 1 : ev.semester === 'Summer' ? 2 : 3;
    const order = yearlyWeight + semesterWeight;

    if (!map.has(key)) {
      map.set(key, { total: 0, count: 0, order });
    }
    const entry = map.get(key)!;
    entry.total += ev.score;
    entry.count += 1;
  });

  return Array.from(map.entries())
    .map(([semester, data]) => ({
      semester,
      rating: Number((data.total / data.count).toFixed(2)),
      order: data.order,
      courseCount: data.count,
    }))
    .sort((a, b) => a.order - b.order);
};

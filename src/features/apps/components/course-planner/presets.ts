import type { CoursePlannerPreset } from './types';

export const IUB_CSE_PRESET: CoursePlannerPreset = {
  name: 'IUB — CSE Major',
  courses: [
    // --- Foundation ---
    {
      id: 'mat101',
      code: 'MAT 101',
      title: 'Intro to Mathematics',
      credits: 3,
      prerequisites: [],
    },
    {
      id: 'cse101',
      code: 'CSE 101',
      title: 'Intro to Computer Science',
      credits: 3,
      prerequisites: [],
    },
    {
      id: 'phy111',
      code: 'PHY 111',
      title: 'Principles of Physics I',
      credits: 3,
      prerequisites: [],
    },

    // --- Core (lower) ---
    {
      id: 'cse110',
      code: 'CSE 110',
      title: 'Programming Language I',
      credits: 3,
      prerequisites: ['cse101'],
    },
    {
      id: 'mat201',
      code: 'MAT 201',
      title: 'Calculus & Analytical Geometry',
      credits: 3,
      prerequisites: ['mat101'],
    },
    {
      id: 'cse111',
      code: 'CSE 111',
      title: 'Programming Language II',
      credits: 3,
      prerequisites: ['cse110'],
    },
    {
      id: 'cse201',
      code: 'CSE 201',
      title: 'Discrete Mathematics',
      credits: 3,
      prerequisites: ['mat101', 'cse101'],
    },

    // --- Core (mid) ---
    {
      id: 'cse203',
      code: 'CSE 203',
      title: 'Data Structures',
      credits: 3,
      prerequisites: ['cse111'],
    },
    {
      id: 'cse220',
      code: 'CSE 220',
      title: 'Data Communication',
      credits: 3,
      prerequisites: ['cse110'],
    },

    // --- Core (upper) ---
    {
      id: 'cse211',
      code: 'CSE 211',
      title: 'Algorithms',
      credits: 3,
      prerequisites: ['cse203', 'cse201'],
    },
    {
      id: 'cse250',
      code: 'CSE 250',
      title: 'Circuits & Electronics',
      credits: 3,
      prerequisites: ['phy111'],
    },
    {
      id: 'cse260',
      code: 'CSE 260',
      title: 'Digital Logic Design',
      credits: 3,
      prerequisites: ['cse250'],
    },

    // --- Advanced ---
    {
      id: 'cse303',
      code: 'CSE 303',
      title: 'Database Systems',
      credits: 3,
      prerequisites: ['cse203'],
    },
    {
      id: 'cse305',
      code: 'CSE 305',
      title: 'Software Engineering',
      credits: 3,
      prerequisites: ['cse203'],
    },
    {
      id: 'cse317',
      code: 'CSE 317',
      title: 'Numerical Methods',
      credits: 3,
      prerequisites: ['mat201', 'cse110'],
    },
    {
      id: 'cse331',
      code: 'CSE 331',
      title: 'Automata & Computability',
      credits: 3,
      prerequisites: ['cse201', 'cse211'],
    },
    {
      id: 'cse340',
      code: 'CSE 340',
      title: 'Computer Architecture',
      credits: 3,
      prerequisites: ['cse260'],
    },
    {
      id: 'cse350',
      code: 'CSE 350',
      title: 'Operating Systems',
      credits: 3,
      prerequisites: ['cse203', 'cse340'],
    },

    // --- Capstone ---
    {
      id: 'cse499',
      code: 'CSE 499',
      title: 'Senior Capstone Project',
      credits: 3,
      prerequisites: ['cse303', 'cse305'],
    },
  ],
};

export const PRESETS: CoursePlannerPreset[] = [IUB_CSE_PRESET];

import type { ClassScheduleItem } from '@/shared/types';

export const semesterEndDate = '2026-04-16';

export const notices = [
  {
    id: 'n-discord',
    title: 'Join the Official Discord Server',
    date: '2026-01-20',
    type: 'info' as const,
    link: 'https://discord.gg/qSp9gRAu',
    importance: 'high' as const,
  },
];

export const activeContest = {
  title: 'Algorithms Lab Programming Contest Spring 2026',
  url: 'https://vjudge.net/contest/782172',
  startDate: '2026-01-25',
  endDate: '2026-04-16', // Coincides with semester end
  platform: 'VJudge',
};

export const exams = {
  midterm: {
    date: 'TBA',
    seatPlanUrl: '#',
    syllabus: 'Weeks 1-6',
  },
  final: {
    date: 'TBA',
    seatPlanUrl: '#',
  },
};

export const classSchedule: ClassScheduleItem[] = [
  {
    section: 1,
    theory: {
      faculty: 'Mr. Mohammad Motiur Rahman',
      email: 'motiur@iub.edu.bd',
      days: 'ST',
      time: '08:00-09:30',
      room: 'BC6012',
    },
    lab: {
      faculty: 'Junayed Hossain',
      email: 'junayed.nde16sets@iub.edu.bd',
      days: 'S',
      time: '09:40-11:10',
      room: 'MK7005L',
    },
  },
  {
    section: 2,
    theory: {
      faculty: 'Md Asif Bin Khaled',
      email: 'mdasifbinkhaled@iub.edu.bd',
      days: 'ST',
      time: '09:40-11:10',
      room: 'MK5007',
    },
    lab: {
      faculty: 'Junayed Hossain',
      email: 'junayed.nde16sets@iub.edu.bd',
      days: 'S',
      time: '08:00-09:30',
      room: 'MK7005L',
    },
  },
  {
    section: 3,
    theory: {
      faculty: 'Md Asif Bin Khaled',
      email: 'mdasifbinkhaled@iub.edu.bd',
      days: 'ST',
      time: '11:20-12:50',
      room: 'MK5006',
    },
    lab: {
      faculty: 'Shad Ahmed',
      email: 'sashaikot07sets@iub.edu.bd',
      days: 'S',
      time: '13:00-14:30',
      room: 'MK7005L',
    },
  },
  {
    section: 4,
    theory: {
      faculty: 'Mr. Mohammad Motiur Rahman',
      email: 'motiur@iub.edu.bd',
      days: 'ST',
      time: '13:00-14:30',
      room: 'MK4008',
    },
    lab: {
      faculty: 'Shad Ahmed',
      email: 'sashaikot07sets@iub.edu.bd',
      days: 'S',
      time: '11:20-12:50',
      room: 'MK7005L',
    },
  },
  {
    section: 5,
    theory: {
      faculty: 'Mostafiz Ahammed',
      email: 'mostafizs154sets@iub.edu.bd',
      days: 'MW',
      time: '08:00-09:30',
      room: 'MK5010',
    },
    lab: {
      faculty: 'Shad Ahmed',
      email: 'sashaikot07sets@iub.edu.bd',
      days: 'M',
      time: '09:40-11:10',
      room: 'MK7005L',
    },
  },
  {
    section: 6,
    theory: {
      faculty: 'Mostafiz Ahammed',
      email: 'mostafizs154sets@iub.edu.bd',
      days: 'MW',
      time: '09:40-11:10',
      room: 'MK5005',
      // No email update
    },
    lab: {
      faculty: 'Junayed Hossain',
      email: 'junayed.nde16sets@iub.edu.bd',
      days: 'M',
      time: '08:00-09:30',
      room: 'MK7005L',
    },
  },
  {
    section: 8,
    theory: {
      faculty: 'Md Zahangir Alam',
      email: 'zahangir.alam@iub.edu.bd',
      days: 'MW',
      time: '13:00-14:30',
      room: 'C6007',
    },
    lab: {
      faculty: 'Shad Ahmed',
      email: 'sashaikot07sets@iub.edu.bd',
      days: 'M',
      time: '11:20-12:50',
      room: 'MK7005L',
    },
  },
];

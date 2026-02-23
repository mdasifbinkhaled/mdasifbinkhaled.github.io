import type { NavItem } from '@/shared/types';
// Icon components are no longer directly imported here.
// We will use string names that map to icons in a client component.

export const mainNavItems: NavItem[] = [
  { href: '/', label: 'Home', icon: 'Home', sectionId: 'home' },
  { href: '/about', label: 'About', icon: 'UserCircle', sectionId: 'about' },
  { href: '/research', label: 'Research', icon: 'Cpu', sectionId: 'research' },
  {
    href: '/publications',
    label: 'Publications',
    icon: 'BookOpenText',
    sectionId: 'publications',
  },
  {
    href: '/apps',
    label: 'Student Apps',
    icon: 'Wrench',
    sectionId: 'apps',
  },
  {
    href: '/teaching',
    label: 'Teaching',
    icon: 'Presentation',
    sectionId: 'teaching',
  },
  { href: '/contact', label: 'Contact', icon: 'Send', sectionId: 'contact' },
  // Removed: /experience and /service-awards - content merged into /about
  // { href: "/blog", label: "Blog", icon: "Rss", sectionId: "blog" }, // Uncomment when blog is ready
];

// Teaching sub-navigation with institutions and courses
export const teachingNavItems: NavItem[] = [
  {
    href: '/teaching',
    label: 'Overview',
    icon: 'LayoutDashboard',
    sectionId: 'overview',
  },
  {
    href: '/teaching/iub',
    label: 'IUB Courses',
    icon: 'Building2',
    sectionId: 'iub',
  },
  {
    href: '/teaching/bracu',
    label: 'BRACU Courses',
    icon: 'Building2',
    sectionId: 'bracu',
  },
];

// IUB course navigation - synced with actual course data
// Only 'detailed' tier courses link to their own page; others link to the institution overview
export const iubCourseNavItems: NavItem[] = [
  {
    href: '/teaching/iub/cse211spr26',
    label: 'CSE 211 - Algorithms',
    icon: 'Brain',
    sectionId: 'cse211',
  },
  {
    href: '/teaching/iub',
    label: 'CSE 101 - Introduction to Programming',
    icon: 'Code2',
    sectionId: 'cse101',
  },
  {
    href: '/teaching/iub',
    label: 'CSE 110 - Fundamentals of Computer System',
    icon: 'Server',
    sectionId: 'cse110',
  },
  {
    href: '/teaching/iub',
    label: 'CSE 201 - Discrete Mathematics',
    icon: 'Calculator',
    sectionId: 'cse201',
  },
  {
    href: '/teaching/iub',
    label: 'CSE 203 - Data Structures',
    icon: 'Database',
    sectionId: 'cse203',
  },
  {
    href: '/teaching/iub',
    label: 'CSE 317 - Numerical Methods',
    icon: 'Calculator',
    sectionId: 'cse317',
  },
  {
    href: '/teaching/iub',
    label: 'CSE 331 - Microprocessors',
    icon: 'Cpu',
    sectionId: 'cse331',
  },
];

// BRACU course navigation - synced with actual course data
export const bracuCourseNavItems: NavItem[] = [
  {
    href: '/teaching/bracu/cse420',
    label: 'CSE 420 - Compiler Design Lab',
    icon: 'Code2',
    sectionId: 'cse420',
  },
  {
    href: '/teaching/bracu',
    label: 'CSE 284 - Data Structures & Algorithms Lab',
    icon: 'Database',
    sectionId: 'cse284',
  },
  {
    href: '/teaching/bracu',
    label: 'CSE 423 - Computer Graphics Lab',
    icon: 'Code2',
    sectionId: 'cse423',
  },
  {
    href: '/teaching/bracu',
    label: 'CSE 489 - Android Development Lab',
    icon: 'Code2',
    sectionId: 'cse489',
  },
];

export const navItems = {
  main: mainNavItems,
  teaching: teachingNavItems,
  iub: iubCourseNavItems,
  bracu: bracuCourseNavItems,
};

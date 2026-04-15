import type { NavItem } from '@/shared/types';
import {
  coursesTaughtIUB,
  coursesTaughtBRACU,
} from '@/shared/lib/data/courses';
import type { CourseData } from '@/shared/types';

// ---------------------------------------------------------------------------
// Helper: derive a NavItem from the single source of truth (CourseData)
// ---------------------------------------------------------------------------
function courseToNavItem(course: CourseData): NavItem {
  const institutionSlug = course.institution.toLowerCase(); // 'iub' | 'bracu'
  const courseSlug = course.slug
    ? course.slug.toLowerCase()
    : course.code.toLowerCase().replace(/\s+/g, '');

  // Only 'detailed' tier courses get their own page (via generateStaticParams)
  const href =
    course.tier === 'detailed'
      ? `/teaching/${institutionSlug}/${courseSlug}`
      : `/teaching/${institutionSlug}`;

  return {
    href,
    label: `${course.code} - ${course.title}`,
    icon: course.iconName ?? 'BookOpen',
    sectionId: course.code.toLowerCase().replace(/\s+/g, ''),
  };
}

// ---------------------------------------------------------------------------
// Main navigation (navbar + sidebar)
// ---------------------------------------------------------------------------
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
    href: '/teaching',
    label: 'Teaching',
    icon: 'Presentation',
    sectionId: 'teaching',
  },
  {
    href: '/apps',
    label: 'Apps',
    icon: 'Wrench',
    sectionId: 'apps',
  },
];

// ---------------------------------------------------------------------------
// Secondary navigation — demoted from primary nav, accessible via footer
// ---------------------------------------------------------------------------
export const secondaryNavItems: NavItem[] = [
  {
    href: '/blog',
    label: 'Blog',
    icon: 'TerminalSquare',
    sectionId: 'blog',
  },
  {
    href: '/talks',
    label: 'Talks',
    icon: 'Presentation',
    sectionId: 'talks',
  },
  { href: '/contact', label: 'Contact', icon: 'Send', sectionId: 'contact' },
];

// All page nav items (breadcrumbs, icon lookup, footer)
export const allNavItems: NavItem[] = [...mainNavItems, ...secondaryNavItems];

// ---------------------------------------------------------------------------
// Teaching sub-navigation
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Course navigation — derived from the course data (single source of truth)
// Detailed-tier courses appear first (they have their own page).
// ---------------------------------------------------------------------------
export const iubCourseNavItems: NavItem[] = [
  ...coursesTaughtIUB.filter((c) => c.tier === 'detailed'),
  ...coursesTaughtIUB.filter((c) => c.tier !== 'detailed'),
].map(courseToNavItem);

export const bracuCourseNavItems: NavItem[] = [
  ...coursesTaughtBRACU.filter((c) => c.tier === 'detailed'),
  ...coursesTaughtBRACU.filter((c) => c.tier !== 'detailed'),
].map(courseToNavItem);

// ---------------------------------------------------------------------------
// Aggregated export
// ---------------------------------------------------------------------------
export const navItems = {
  main: mainNavItems,
  secondary: secondaryNavItems,
  all: allNavItems,
  teaching: teachingNavItems,
  iub: iubCourseNavItems,
  bracu: bracuCourseNavItems,
};

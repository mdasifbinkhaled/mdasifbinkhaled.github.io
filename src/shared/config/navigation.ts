import type { NavItem } from '@/shared/types';
import { allCourses } from '@/shared/lib/data/courses';
import type { CourseData } from '@/shared/types';

// ---------------------------------------------------------------------------
// Helper: derive a NavItem for a course that has its own page.
// Only 'detailed' tier courses are routable (via generateStaticParams); the
// rest live in the /teaching record table and are not individually linkable.
// ---------------------------------------------------------------------------
function courseToNavItem(course: CourseData): NavItem {
  const institutionSlug = course.institution.toLowerCase(); // 'iub' | 'bracu'
  const courseSlug = course.slug
    ? course.slug.toLowerCase()
    : course.code.toLowerCase().replace(/\s+/g, '');

  return {
    href: `/teaching/${institutionSlug}/${courseSlug}`,
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
    icon: 'LayoutGrid',
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
// Course navigation — derived from the course data (single source of truth).
// Only courses with their own page (detailed tier) appear; today that's CSE 211.
// Drives the navbar Teaching dropdown + command-palette "Courses" group.
// ---------------------------------------------------------------------------
export const courseNavItems: NavItem[] = allCourses
  .filter((c) => c.tier === 'detailed')
  .map(courseToNavItem);

// ---------------------------------------------------------------------------
// Aggregated export
// ---------------------------------------------------------------------------
export const navItems = {
  main: mainNavItems,
  secondary: secondaryNavItems,
  all: allNavItems,
  courses: courseNavItems,
};

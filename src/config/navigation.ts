
import type { NavItem } from '@/types';
// Icon components are no longer directly imported here.
// We will use string names that map to icons in a client component.

export const mainNavItems: NavItem[] = [
  { href: "/", label: "Home", icon: "Home", sectionId: "home" },
  { href: "/about", label: "About Me", icon: "UserCircle", sectionId: "about" },
  { href: "/experience", label: "Experience", icon: "Briefcase", sectionId: "experience" },
  { href: "/research", label: "Research", icon: "Cpu", sectionId: "research" },
  { href: "/publications", label: "Publications", icon: "BookOpenText", sectionId: "publications" },
  { href: "/teaching", label: "Teaching", icon: "Presentation", sectionId: "teaching" },
  { href: "/service-awards", label: "Service & Awards", icon: "Award", sectionId: "service-awards" },
  // { href: "/blog", label: "Blog", icon: "Rss", sectionId: "blog" }, // Uncomment when blog is ready
  { href: "/contact", label: "Contact", icon: "Send", sectionId: "contact" },
];

// If you have specific teaching pages with sub-navigation:
export const teachingNavItems = (courseBasePath: string): NavItem[] => [
    // Example:
    // { href: `${courseBasePath}/introduction`, label: "Introduction", sectionId: "intro" },
    // { href: `${courseBasePath}/module1`, label: "Module 1", sectionId: "mod1" },
];

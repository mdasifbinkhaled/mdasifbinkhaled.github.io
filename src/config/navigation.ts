
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

// Teaching sub-navigation with institutions and courses
export const teachingNavItems: NavItem[] = [
  { href: "/teaching", label: "Overview", icon: "LayoutDashboard", sectionId: "overview" },
  { href: "/teaching/iub", label: "IUB Courses", icon: "Building2", sectionId: "iub" },
  { href: "/teaching/bracu", label: "BRACU Courses", icon: "Building2", sectionId: "bracu" },
];

// IUB course navigation
export const iubCourseNavItems: NavItem[] = [
  { href: "/teaching/iub/cse101", label: "CSE 101 - Introduction to Programming", icon: "Code2", sectionId: "cse101" },
  { href: "/teaching/iub/cse221", label: "CSE 221 - Algorithms", icon: "Brain", sectionId: "cse221" },
  { href: "/teaching/iub/cse220", label: "CSE 220 - Data Structures", icon: "Database", sectionId: "cse220" },
  { href: "/teaching/iub/cse171", label: "CSE 171 - Discrete Mathematics", icon: "Calculator", sectionId: "cse171" },
  { href: "/teaching/iub/cse173", label: "CSE 173 - Numerical Methods", icon: "Calculator", sectionId: "cse173" },
  { href: "/teaching/iub/cse350", label: "CSE 350 - Finite Automata", icon: "BookOpen", sectionId: "cse350" },
  { href: "/teaching/iub/cse110", label: "CSE 110 - Computer Fundamentals", icon: "Server", sectionId: "cse110" },
];

// BRACU course navigation
export const bracuCourseNavItems: NavItem[] = [
  { href: "/teaching/bracu/cse110", label: "CSE 110 - Programming Language I", icon: "Code2", sectionId: "cse110" },
  { href: "/teaching/bracu/cse111", label: "CSE 111 - Programming Language II", icon: "Code2", sectionId: "cse111" },
  { href: "/teaching/bracu/cse260", label: "CSE 260 - Digital Logic Design", icon: "Server", sectionId: "cse260" },
  { href: "/teaching/bracu/cse220", label: "CSE 220 - Data Structures", icon: "Database", sectionId: "cse220" },
  { href: "/teaching/bracu/cse221", label: "CSE 221 - Algorithms", icon: "Brain", sectionId: "cse221" },
];

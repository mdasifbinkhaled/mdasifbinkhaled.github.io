import {
  Home,
  UserCircle,
  Briefcase,
  BookOpenText,
  Cpu,
  Award,
  Send,
  Presentation,
  LayoutDashboard,
  LayoutGrid,
  Building2,
  Code,
  Code2,
  Brain,
  Database,
  Calculator,
  BookOpen,
  Heart,
  Server,
  Users,
  Wrench,
  Timer,
  CalendarDays,
  Target,
  TerminalSquare,
  Clock,
  GitBranch,
  Search,
  type LucideProps,
} from 'lucide-react';

export type IconName = keyof typeof iconComponents;

export const iconComponents = {
  Home,
  UserCircle,
  Briefcase,
  BookOpenText,
  Cpu,
  Award,
  Send,
  Presentation,
  LayoutDashboard,
  LayoutGrid,
  Building2,
  Code,
  Code2,
  Brain,
  Database,
  Calculator,
  BookOpen,
  Heart,
  Server,
  Users,
  Wrench,
  Timer,
  CalendarDays,
  Target,
  TerminalSquare,
  Clock,
  GitBranch,
  Search,
};

interface IconComponentProps extends LucideProps {
  name?: IconName;
}

export function Icon({ name, className, ...props }: IconComponentProps) {
  if (!name) {
    return null;
  }
  const LucideComponent = iconComponents[name];

  if (!LucideComponent) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Icon "${name}" not found.`);
    }
    return null;
  }

  return <LucideComponent className={className} {...props} />;
}

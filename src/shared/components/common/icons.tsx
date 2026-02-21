'use client';

import {
  Home,
  UserCircle,
  Briefcase,
  BookOpenText,
  Rss,
  Cpu,
  Award,
  Send,
  Presentation,
  LayoutDashboard,
  Building2,
  Code2,
  Brain,
  Database,
  Calculator,
  BookOpen,
  Server,
  Users,
  Wrench,
  Timer,
  CalendarDays,
  type LucideProps,
} from 'lucide-react';

export type IconName = keyof typeof iconComponents;

const iconComponents = {
  Home,
  UserCircle,
  Briefcase,
  BookOpenText,
  Rss,
  Cpu,
  Award,
  Send,
  Presentation,
  LayoutDashboard,
  Building2,
  Code2,
  Brain,
  Database,
  Calculator,
  BookOpen,
  Server,
  Users,
  Wrench,
  Timer,
  CalendarDays,
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

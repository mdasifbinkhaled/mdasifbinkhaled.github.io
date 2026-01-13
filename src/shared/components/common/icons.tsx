// @/shared/components/common/icons.tsx
'use client'; // Ensure this can be used in other client components

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
  type LucideProps,
} from 'lucide-react';

// Define the IconName type based on the keys of iconComponents
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
};

interface IconComponentProps extends LucideProps {
  name?: IconName; // Use the IconName type
}

export function Icon({ name, className, ...props }: IconComponentProps) {
  if (!name) {
    return null;
  }
  const LucideComponent = iconComponents[name];

  if (!LucideComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null; // Or a default fallback icon
  }

  return <LucideComponent className={className} {...props} />;
}

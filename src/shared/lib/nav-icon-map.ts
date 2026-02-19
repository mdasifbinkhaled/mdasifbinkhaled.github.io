/**
 * Shared mapping from navigation icon string names → Lucide React components.
 *
 * Used by profile-sidebar and command-menu to resolve the `icon` field
 * defined in navigation.ts config items. Keep this in sync with any
 * new icon names added to mainNavItems / teachingNavItems / courseNavItems.
 */
import {
  Home,
  UserCircle,
  Cpu,
  BookOpenText,
  Presentation,
  Send,
  LayoutDashboard,
  Building2,
  Code2,
  Server,
  Calculator,
  Database,
  Brain,
  Laptop,
} from 'lucide-react';
import type { ElementType } from 'react';

export const navIconMap: Record<string, ElementType> = {
  Home,
  UserCircle,
  Cpu,
  BookOpenText,
  Presentation,
  Send,
  LayoutDashboard,
  Building2,
  Code2,
  Server,
  Calculator,
  Database,
  Brain,
  Laptop,
};

import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Archive,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  CircleUserRound,
  Code2,
  Copy,
  Eye,
  FileText,
  Flag,
  FlaskConical,
  Folder,
  GraduationCap,
  History,
  Link,
  ListChecks,
  ListTree,
  LocateFixed,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Presentation,
  ShieldCheck,
  Star,
  Trophy,
  Video,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icon registry for the course-page template. Maps the kebab-case names used
 * in markup and data (CourseIconName) to lucide-react components, so the
 * design's data-driven icons stay tree-shakeable instead of a UMD global.
 */
const ICONS = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-up-right': ArrowUpRight,
  archive: Archive,
  award: Award,
  'book-open': BookOpen,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevrons-down-up': ChevronsDownUp,
  'chevrons-up-down': ChevronsUpDown,
  'circle-user-round': CircleUserRound,
  'code-2': Code2,
  copy: Copy,
  eye: Eye,
  'file-text': FileText,
  flag: Flag,
  'flask-conical': FlaskConical,
  folder: Folder,
  'graduation-cap': GraduationCap,
  history: History,
  link: Link,
  'list-checks': ListChecks,
  'list-tree': ListTree,
  'locate-fixed': LocateFixed,
  mail: Mail,
  'map-pin': MapPin,
  megaphone: Megaphone,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  presentation: Presentation,
  'shield-check': ShieldCheck,
  star: Star,
  trophy: Trophy,
  video: Video,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

/** Decorative icon. Size is controlled by the scoped CSS (svg rules). */
export function Ic({ name, className }: { name: IconKey; className?: string }) {
  const Cmp = ICONS[name];
  return <Cmp className={className} aria-hidden="true" />;
}

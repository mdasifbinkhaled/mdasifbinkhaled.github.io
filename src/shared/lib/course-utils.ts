import {
  Code2,
  ExternalLink,
  FileText,
  Globe,
  MessageCircle,
  Presentation,
  Video,
  BookOpenText,
} from 'lucide-react';
import type { CourseLink } from '@/shared/types';
import type { LucideIcon } from 'lucide-react';

/**
 * Formats a URL segment into a human-readable title.
 * Handles institution codes (IUB) and course slugs (cse211sum26 -> CSE 211 Summer 2026).
 */
export function formatBreadcrumbTitle(segment: string): string {
  const institutionCodes = ['iub', 'bracu', 'nsu', 'aiub'];
  const courseCodePattern = /^[a-z]{2,4}\d{3,4}$/i;

  if (institutionCodes.includes(segment.toLowerCase())) {
    return segment.toUpperCase();
  }

  if (courseCodePattern.test(segment)) {
    // Course codes: "cse211" -> "CSE 211"
    const match = segment.match(/^([a-z]+)(\d+)$/i);
    if (match && match[1] && match[2]) {
      return `${match[1].toUpperCase()} ${match[2]}`;
    }
    return segment.toUpperCase();
  }

  // Complex course codes: "cse211sum26" -> "CSE 211 Summer 2026"
  const complexMatch = segment.match(
    /^([a-z]+)(\d+)(spr|sum|aut|win|fal)(\d{2})$/i
  );

  if (complexMatch) {
    const code = complexMatch[1] ?? '';
    const num = complexMatch[2] ?? '';
    const sem = complexMatch[3] ?? '';
    const year = complexMatch[4] ?? '';

    const semesterMap: Record<string, string> = {
      spr: 'Spring',
      sum: 'Summer',
      aut: 'Autumn',
      win: 'Winter',
      fal: 'Fall',
    };
    return `${code.toUpperCase()} ${num} ${semesterMap[sem.toLowerCase()] || sem} 20${year}`;
  }

  // Normal title case for other segments
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Maps a course link type to its corresponding Lucide icon.
 */
export function getCourseLinkIcon(type: CourseLink['type']): LucideIcon {
  switch (type) {
    case 'outline':
      return FileText;
    case 'slides':
      return Presentation;
    case 'video':
      return Video;
    case 'discord':
      return MessageCircle;
    case 'site':
      return Globe;
    case 'problem-set':
      return Code2;
    case 'note':
      return BookOpenText;
    case 'other':
    default:
      return ExternalLink;
  }
}

/**
 * Canonical course URL slug — the single source of truth used by the dynamic
 * route's `generateStaticParams`, the link path, the sitemap, and the JSON-LD.
 * A blank/whitespace slug falls back to the normalized code; the result is
 * always lowercased and space-stripped so every producer emits byte-identical
 * paths (a divergence here is a static-export 404).
 */
export function getCourseSlug(course: { slug?: string; code: string }): string {
  const raw = course.slug?.trim() ? course.slug : course.code;
  return raw.toLowerCase().replace(/\s+/g, '');
}

/** Canonical institution URL segment (lowercased, space-stripped). */
export function getCourseInstitutionSlug(institution: string): string {
  return institution.toLowerCase().replace(/\s+/g, '');
}

/**
 * Generates the canonical local URL path for a course detail page.
 */
export function getCoursePath(course: {
  slug?: string;
  code: string;
  institution: string;
}): string {
  return `/teaching/${getCourseInstitutionSlug(course.institution)}/${getCourseSlug(course)}`;
}

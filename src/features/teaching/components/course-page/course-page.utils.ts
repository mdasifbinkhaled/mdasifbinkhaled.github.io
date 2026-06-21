import type { CourseAnnouncement, CourseData } from '@/shared/types';

/** Fixed section order for the course page. */
export const SECTION_DEFS = [
  { id: 'overview', label: 'Overview' },
  { id: 'sections', label: 'Sections' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'resources', label: 'Resources' },
] as const;

export type SectionId = (typeof SECTION_DEFS)[number]['id'];

/** First numeric week of a `week` value (handles ranges like "8–9"). */
export function weekFirst(week: number | string): number {
  return typeof week === 'string' ? parseInt(week, 10) : week;
}

/**
 * Live current-week from the term start date, clamped to [1, totalWeeks].
 * Returns null when there's no start date (caller falls back to data).
 */
export function computeCurrentWeek(
  termStartIso: string | undefined,
  totalWeeks: number,
  now: Date
): number | null {
  if (!termStartIso) return null;
  const start = new Date(termStartIso).getTime();
  if (Number.isNaN(start)) return null;
  const diffDays = (now.getTime() - start) / 86_400_000;
  const week = Math.floor(diffDays / 7) + 1;
  return Math.min(Math.max(week, 1), Math.max(totalWeeks, 1));
}

export interface ThisWeek {
  week: number | string;
  title: string;
  theory?: string;
  lab?: string;
  unit?: string;
}

/** The unit/week entry that contains `currentWeek` (range-aware). */
export function deriveThisWeek(
  course: CourseData,
  currentWeek: number
): ThisWeek | null {
  for (const unit of course.units ?? []) {
    for (const w of unit.weeks) {
      const first = weekFirst(w.week);
      const last =
        typeof w.week === 'string' && /[–-]/.test(w.week)
          ? parseInt(w.week.split(/[–-]/)[1] ?? '', 10) || first
          : first;
      if (currentWeek >= first && currentWeek <= last) {
        return {
          week: w.week,
          title: w.title,
          theory: w.theory,
          lab: w.lab,
          unit: unit.label,
        };
      }
    }
  }
  return null;
}

export interface NoticeItem {
  tag: CourseAnnouncement['tag'];
  title: string;
  date?: string;
  target?: string;
}

interface ExamLite {
  name: string;
  date: string;
}

const isTba = (date: string): boolean => /tba|announced/i.test(date);

/** Flatten all exams from the dual schemes (or the legacy top-level exams). */
export function allExams(course: CourseData): ExamLite[] {
  const schemes = course.assessmentSchemes;
  if (schemes) {
    const out: ExamLite[] = [];
    for (const part of [schemes.theory, schemes.lab]) {
      if (!part?.exams) continue;
      for (const exam of [part.exams.midterm, part.exams.final]) {
        if (exam) out.push({ name: exam.name, date: exam.date });
      }
    }
    return out;
  }
  return [];
}

/**
 * Build the notice-board rows: auto-generated exam + assignment items
 * (active courses only) followed by explicit announcements. When every exam
 * date is TBA they collapse into a single "dates to be announced" row.
 */
export function buildNotices(course: CourseData): NoticeItem[] {
  const items: NoticeItem[] = [];
  if (course.status !== 'completed') {
    const exams = allExams(course);
    const allTba = exams.length > 0 && exams.every((e) => isTba(e.date));
    if (allTba) {
      items.push({
        tag: 'exam',
        title: 'Midterm & final dates — to be announced',
        target: 'assessment',
      });
    } else {
      for (const exam of exams) {
        items.push(
          isTba(exam.date)
            ? {
                tag: 'exam',
                title: `${exam.name} — date to be announced`,
                target: 'assessment',
              }
            : {
                tag: 'exam',
                title: `${exam.name} · ${exam.date}`,
                target: 'assessment',
              }
        );
      }
    }
    for (const a of course.assignments ?? []) {
      const status = a.status ?? 'upcoming';
      items.push({
        tag: status === 'upcoming' ? 'soon' : 'info',
        title: `${a.title} — ${status === 'upcoming' ? 'coming soon' : status}`,
        target: 'assignments',
      });
    }
  }
  for (const a of course.announcements ?? []) items.push(a);
  return items;
}

export interface DerivedSections {
  visible: { id: SectionId; label: string }[];
  num: Record<string, string>;
}

/**
 * Defensive section list: drop sections whose data is absent and re-number
 * the survivors 01, 02, 03… so numbering is always sequential.
 */
export function deriveSections(course: CourseData): DerivedSections {
  const present: Record<SectionId, boolean> = {
    overview: true,
    sections: !!course.sectionsRoster?.rows?.length,
    syllabus: !!course.units?.length,
    assessment: !!(
      course.assessmentSchemes?.theory || course.assessmentSchemes?.lab
    ),
    assignments: !!course.assignments?.length,
    resources: !!course.resourceSections?.length,
  };
  const visible = SECTION_DEFS.filter((s) => present[s.id]).map((s) => ({
    id: s.id,
    label: s.label,
  }));
  const num: Record<string, string> = {};
  visible.forEach((s, i) => {
    num[s.id] = String(i + 1).padStart(2, '0');
  });
  return { visible, num };
}

/**
 * Manual rAF smooth-scroll (native `scrollIntoView`/`behavior:'smooth'` is
 * unreliable in some embedded contexts). Lands instantly if rAF is throttled.
 */
export function smoothTo(top: number): void {
  const start = window.scrollY;
  const dist = top - start;
  if (Math.abs(dist) < 2) return;
  const dur = Math.min(650, Math.max(280, Math.abs(dist) * 0.45));
  const t0 = performance.now();
  const ease = (t: number): number =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  let raf = 0;
  const step = (now: number): void => {
    const p = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, start + dist * ease(p));
    if (p < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  window.setTimeout(() => {
    if (
      Math.abs(window.scrollY - top) > 4 &&
      performance.now() - t0 > dur + 250
    ) {
      cancelAnimationFrame(raf);
      window.scrollTo(0, top);
    }
  }, dur + 300);
}

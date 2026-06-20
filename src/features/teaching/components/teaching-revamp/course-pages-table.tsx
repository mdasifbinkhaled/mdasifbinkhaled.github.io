import Link from 'next/link';
import { ArrowRight, Coffee } from 'lucide-react';
import type { CourseData } from '@/shared/types';
import { allCourses } from '@/shared/lib/data/courses';
import { getCoursePath } from '@/shared/lib/course-utils';

/**
 * §4 — featured table of the courses that own a dedicated Command-Center page
 * (`tier === 'detailed'`). The whole row is a `<Link>` into the course page.
 * Featured chrome: a 3px primary top bar + primary/25 border. Off-term → a calm
 * empty-state card. Server component (rows are links — no client state).
 */
export function CoursePagesTable() {
  const pages = allCourses.filter((c) => c.tier === 'detailed');

  if (pages.length === 0) {
    return (
      <div className="flex flex-wrap items-center gap-4.5 rounded-xl border border-border bg-card px-6 py-6 shadow-xs">
        <span className="grid size-11 shrink-0 place-items-center rounded-md border border-border bg-muted/50 text-muted-foreground">
          <Coffee className="size-5" aria-hidden />
        </span>
        <div>
          <p className="text-base font-semibold">No course page this term</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Between semesters — the full teaching record is below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/25 bg-card shadow-sm before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-[3px] before:bg-primary">
      {/* Header row */}
      <div
        aria-hidden
        className="grid grid-cols-[124px_1fr_104px] items-center gap-4 border-b border-primary/20 bg-linear-to-b from-muted/55 to-muted/30 px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-[124px_1fr_132px_104px_92px]"
      >
        <span>Course</span>
        <span>Title</span>
        <span className="hidden sm:block">Term</span>
        <span className="hidden sm:block">Status</span>
        <span className="text-right">Open</span>
      </div>
      <div>
        {pages.map((c) => (
          <CoursePageRow key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}

function CoursePageRow({ course }: { course: CourseData }) {
  const term = `${course.semester} ${course.year}`;
  const live = course.status === 'ongoing';

  return (
    <Link
      href={getCoursePath(course)}
      aria-label={`Open ${course.code} · ${course.title} course page`}
      className="group grid grid-cols-[124px_1fr_104px] items-center gap-4 border-t border-border px-6 py-4 transition-colors first:border-t-0 hover:bg-primary/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:[outline-offset:-2px] sm:grid-cols-[124px_1fr_132px_104px_92px]"
    >
      <span className="whitespace-nowrap font-mono text-sm font-semibold tracking-tight text-primary">
        {course.code}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-base font-semibold">{course.title}</span>
        {course.description && (
          <span className="truncate text-xs text-muted-foreground">
            {course.description}
          </span>
        )}
      </span>
      <span className="hidden whitespace-nowrap font-mono text-sm tracking-tight text-muted-foreground sm:block">
        {term}
      </span>
      <span className="hidden sm:flex">
        {live ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.04em] text-success-emphasis">
            <span className="relative size-[5px] rounded-full bg-success before:absolute before:-inset-[3px] before:rounded-full before:bg-success/40 before:motion-safe:animate-ping" />
            Live
          </span>
        ) : (
          <span className="rounded-full bg-muted/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.04em] text-muted-foreground">
            Archived
          </span>
        )}
      </span>
      <span className="flex items-center justify-end">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
          Open <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

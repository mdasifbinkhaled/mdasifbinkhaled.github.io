import type { CourseData, CourseInstitution } from '@/shared/types';
import { Badge } from '@/shared/components/ui/badge';
import { institutionNames } from '@/shared/lib/data/courses';

const LEVEL_LABEL: Record<string, string> = {
  undergraduate: 'Undergraduate',
  graduate: 'Graduate',
};

/** Newest first; stable for equal years. */
function byNewest(a: CourseData, b: CourseData): number {
  return b.year - a.year;
}

function InstitutionTable({
  institution,
  courses,
}: {
  institution: CourseInstitution;
  courses: CourseData[];
}) {
  const name = institutionNames[institution];
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {name}
      </h3>
      {/* Focusable scroll region so narrow viewports stay keyboard-operable (WebKit). */}
      <div
        className="overflow-x-auto rounded-lg border border-border"
        tabIndex={0}
        role="group"
        aria-label={`Courses taught at ${name}, scroll horizontally`}
      >
        <table className="w-full text-sm">
          <caption className="sr-only">Courses taught at {name}</caption>
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Code
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Title
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Term
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Level
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {[...courses].sort(byNewest).map((c) => (
              <tr
                key={c.id}
                className="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/20"
              >
                <td className="whitespace-nowrap px-4 py-2.5 font-mono font-medium text-primary">
                  {c.code}
                </td>
                <td className="px-4 py-2.5 text-foreground">{c.title}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">
                  {c.semester} {c.year}
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant="secondary" className="font-normal">
                    {LEVEL_LABEL[c.level] ?? c.level}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">
                  {c.role ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Compact "Teaching record" — every course taught, grouped by institution,
 * newest first. A scannable archive (no per-course page); the prominent
 * "Courses" section above it carries the active, page-worthy courses.
 */
export function TeachingRecordTable({ courses }: { courses: CourseData[] }) {
  const institutions = Array.from(
    new Set(courses.map((c) => c.institution))
  ) as CourseInstitution[];

  return (
    <div className="space-y-8">
      {institutions.map((institution) => (
        <InstitutionTable
          key={institution}
          institution={institution}
          courses={courses.filter((c) => c.institution === institution)}
        />
      ))}
    </div>
  );
}

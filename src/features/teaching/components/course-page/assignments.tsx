import type { CourseData } from '@/shared/types';
import { SectionCard, type SectionToggle } from './section-card';
import { Ic } from './course-icons';

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  closed: 'Closed',
  upcoming: 'Coming soon',
};

/** 05 Assignments: flat list with status chips. */
export function Assignments({
  course,
  sec,
}: {
  course: CourseData;
  sec: SectionToggle;
}) {
  const items = course.assignments ?? [];
  if (!items.length) return null;
  return (
    <SectionCard id="assignments" title="Assignments" sec={sec}>
      {items.map((a) => {
        const status = a.status ?? 'upcoming';
        return (
          <div className="asg" key={a.title}>
            <span className="asg__icon">
              <Ic name="file-text" />
            </span>
            <span className="asg__body">
              <span className="asg__title">{a.title}</span>
              {a.description ? (
                <span className="asg__desc">{a.description}</span>
              ) : null}
            </span>
            <span className="badge-soon">{STATUS_LABEL[status] ?? status}</span>
          </div>
        );
      })}
    </SectionCard>
  );
}

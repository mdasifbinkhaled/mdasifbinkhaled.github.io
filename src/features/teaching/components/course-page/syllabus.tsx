import { Fragment } from 'react';
import type { CourseData, CourseMaterial } from '@/shared/types';
import { SectionCard, type SectionToggle } from './section-card';
import { Ic } from './course-icons';
import { smoothTo, weekFirst } from './course-page.utils';

const DEFAULT_MATERIALS: CourseMaterial[] = [
  { label: 'Slides', icon: 'presentation' },
  { label: 'Lab notebook', icon: 'flask-conical' },
  { label: 'Practice set', icon: 'list-checks' },
];

function weekState(
  week: number | string,
  currentWeek: number,
  completed: boolean
): 'is-past' | 'is-current' | 'is-future' {
  if (completed) return 'is-past';
  const str = String(week);
  const first = weekFirst(week);
  const last = /[–-]/.test(str)
    ? parseInt(str.split(/[–-]/)[1] ?? '', 10) || first
    : first;
  if (currentWeek > last) return 'is-past';
  if (currentWeek >= first && currentWeek <= last) return 'is-current';
  return 'is-future';
}

interface SyllabusProps {
  course: CourseData;
  sec: SectionToggle;
  openWeeks: Set<string>;
  onToggleWeek: (key: string) => void;
  currentWeek: number;
}

/** 03 Syllabus & curriculum: unit-grouped weeks with expandable material rows. */
export function Syllabus({
  course,
  sec,
  openWeeks,
  onToggleWeek,
  currentWeek,
}: SyllabusProps) {
  const completed = course.status === 'completed';
  const units = course.units ?? [];

  const action = !completed ? (
    <button
      type="button"
      className="jumpnow"
      onClick={() => {
        const el = document.querySelector('.syl__row.is-current');
        if (el) smoothTo(el.getBoundingClientRect().top + window.scrollY - 120);
      }}
    >
      <Ic name="locate-fixed" /> Current week
    </button>
  ) : undefined;

  return (
    <SectionCard
      id="syllabus"
      title="Syllabus & curriculum"
      sec={sec}
      action={action}
    >
      <div className="syl">
        <div className="syl__head">
          <span>Wk</span>
          <span>Topic</span>
          <span className="syl__col-th">Theory</span>
          <span className="syl__col-lab">Lab</span>
        </div>
        {units.map((unit) => (
          <Fragment key={unit.label}>
            <div className="syl__unit">{unit.label}</div>
            {unit.weeks.map((w) => {
              const key = String(w.week);
              const state = weekState(w.week, currentWeek, completed);
              const open = openWeeks.has(key);
              const materials = w.materials ?? DEFAULT_MATERIALS;
              return (
                <div
                  className={`syl__rowwrap ${state}${open ? ' is-open' : ''}`}
                  key={key}
                >
                  <div className={`syl__row ${state}`}>
                    <button
                      type="button"
                      className="syl__expand"
                      aria-expanded={open}
                      aria-controls={`syl-${key}`}
                      onClick={() => onToggleWeek(key)}
                    >
                      <span className="syl__wk">
                        {key.padStart(2, '0')}
                        {state === 'is-current' ? (
                          <span className="syl__now">Now</span>
                        ) : null}
                      </span>
                      <span className="syl__topic">
                        <Ic name="chevron-right" className="syl__chev" />
                        <span className="syl__topictext">{w.title}</span>
                      </span>
                    </button>
                    <span className="syl__cell syl__col-th">{w.theory}</span>
                    <span className="syl__cell syl__col-lab">{w.lab}</span>
                  </div>
                  <div className="syl__detail" id={`syl-${key}`}>
                    <div className="syl__detail-inner">
                      <div className="syl__mats">
                        <span className="syl__mats-lbl">Materials</span>
                        {materials.map((m) =>
                          m.url ? (
                            <a
                              className="matchip"
                              key={m.label}
                              href={m.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Ic name={m.icon} /> {m.label}
                            </a>
                          ) : (
                            <span
                              className="matchip matchip--pending"
                              key={m.label}
                              title={`${m.label} — link will be published`}
                            >
                              <Ic name={m.icon} /> {m.label}
                            </span>
                          )
                        )}
                        <span className="syl__mats-note">
                          Links publish as the term progresses.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </SectionCard>
  );
}

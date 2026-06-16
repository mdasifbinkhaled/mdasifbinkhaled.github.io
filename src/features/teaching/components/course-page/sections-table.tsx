import { useState } from 'react';
import type { CourseData } from '@/shared/types';
import { SectionCard, type SectionToggle } from './section-card';
import { Ic } from './course-icons';

/** 02 Sections & schedule: coordinator roster (All/Mine toggle). Real table. */
export function SectionsTable({
  course,
  sec,
}: {
  course: CourseData;
  sec: SectionToggle;
}) {
  const roster = course.sectionsRoster;
  const [scope, setScope] = useState<'all' | 'mine'>('all');
  if (!roster?.rows?.length) return null;

  const hasMine = roster.rows.some((r) => r.mine);
  const rows =
    scope === 'mine' ? roster.rows.filter((r) => r.mine) : roster.rows;

  const action = hasMine ? (
    <div className="segtoggle" role="group" aria-label="Section scope">
      <button
        type="button"
        className={`segtoggle__btn${scope === 'all' ? ' is-on' : ''}`}
        aria-pressed={scope === 'all'}
        onClick={() => setScope('all')}
      >
        All sections
      </button>
      <button
        type="button"
        className={`segtoggle__btn${scope === 'mine' ? ' is-on' : ''}`}
        aria-pressed={scope === 'mine'}
        onClick={() => setScope('mine')}
      >
        Mine
      </button>
    </div>
  ) : undefined;

  return (
    <SectionCard
      id="sections"
      title="Sections & schedule"
      sec={sec}
      action={action}
    >
      {roster.coordinator ? (
        <p className="sectionsnote">
          <Ic name="shield-check" /> You coordinate this course — every section
          across instructors is listed here.
        </p>
      ) : null}
      <table className="sectbl">
        <caption>All sections of {course.code} across instructors</caption>
        <thead>
          <tr>
            <th>Sec</th>
            <th>Instructor</th>
            <th className="sectbl__col-days">Days</th>
            <th className="sectbl__col-time">Time</th>
            <th className="sectbl__col-room">Room</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.sec}>
              <td className="sectbl__sec">{r.sec}</td>
              <td className="sectbl__inst">{r.instructor}</td>
              <td className="sectbl__col-days">{r.days}</td>
              <td className="sectbl__col-time">{r.time}</td>
              <td className="sectbl__col-room">
                <Ic name="map-pin" className="sectbl__pin" />
                {r.room}
              </td>
              <td>
                <span
                  className={`typetag typetag--${r.type === 'Lab' ? 'lab' : 'theory'}`}
                >
                  {r.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {roster.note ? <p className="sectbl__note">{roster.note}</p> : null}
    </SectionCard>
  );
}

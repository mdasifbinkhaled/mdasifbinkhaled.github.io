import type { CourseData } from '@/shared/types';
import { Ic } from './course-icons';
import { buildNotices } from './course-page.utils';

/** Auto-generated notice board: exam/assignment cues + explicit announcements. */
export function NoticeStrip({
  course,
  onJump,
}: {
  course: CourseData;
  onJump: (id: string) => void;
}) {
  const items = buildNotices(course);
  if (!items.length) return null;
  const rawDate = course.announcements?.[0]?.date ?? null;
  const updated = rawDate ? rawDate.replace(/^posted\s+/i, '') : null;

  return (
    <section className="notice" aria-label="Notice board">
      <div className="notice__head">
        <div className="notice__title">
          <Ic name="megaphone" /> Notice board{' '}
          <span className="notice__count">{items.length}</span>
        </div>
        {updated ? (
          <div className="notice__updated">
            <Ic name="history" /> Updated {updated}
          </div>
        ) : null}
      </div>
      <div className="notice__items">
        {items.map((item, i) => {
          const inner = (
            <>
              <span className={`ann__tag ann__tag--${item.tag}`}>
                {item.tag}
              </span>
              <span className="ncard__title">{item.title}</span>
              {item.date ? (
                <span className="ncard__date">{item.date}</span>
              ) : null}
              {item.target ? (
                <Ic name="arrow-right" className="ncard__go" />
              ) : null}
            </>
          );
          const key = `${item.tag}-${i}`;
          const target = item.target;
          return target ? (
            <button
              type="button"
              className="ncard ncard--link"
              key={key}
              onClick={() => onJump(target)}
            >
              {inner}
            </button>
          ) : (
            <div className="ncard" key={key}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}

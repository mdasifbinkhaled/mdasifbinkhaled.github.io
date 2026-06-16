import type { CourseData } from '@/shared/types';
import { Ic } from './course-icons';
import { copyToClipboard } from './copy-link';
import type { ThisWeek } from './course-page.utils';

/** Retrospective band shown for completed courses (replaces the "This Week" band). */
export function SummaryBand({ course }: { course: CourseData }) {
  const s = course.summary;
  if (!s) return null;
  const unitCount = course.units?.length ?? 0;
  return (
    <section className="now" aria-label="Course summary">
      <div className="now__inner">
        <div className="now__weeknum">
          <div className="now__weeklbl">Final</div>
          <div className="now__weekval">
            {course.rating ? course.rating.toFixed(1) : '✓'}
          </div>
          {course.rating ? (
            <div className="now__weeklbl now__ratingsub">/ 5 rating</div>
          ) : null}
        </div>
        <div>
          <div className="now__eyebrow">
            Retrospective · {course.semester} {course.year}
          </div>
          <div className="now__title">{s.headline}</div>
          <div className="now__rows">
            <div className="now__row">
              <span className="now__rowk">Status</span>
              <span className="now__rowv">{s.detail}</span>
            </div>
            <div className="now__row">
              <span className="now__rowk">Scope</span>
              <span className="now__rowv">
                {course.totalWeeks} weeks · {unitCount} units ·{' '}
                {course.outcomes.length} learning outcomes
              </span>
            </div>
          </div>
        </div>
        <div className="now__side">
          <div className="now__milestone">
            <div className="now__mk">
              <Ic name="archive" /> Archive
            </div>
            {s.stats.map((x) => (
              <div key={x.k} className="now__stat">
                <span className="now__md">{x.k}</span>
                <span className="now__mv">{x.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface NowBandProps {
  course: CourseData;
  thisWeek: ThisWeek;
  onJump: (id: string) => void;
  onJumpToWeek: () => void;
}

/** Active-course "This Week" band — week numeral, detail, milestone, contest CTA. */
export function NowBand({
  course,
  thisWeek,
  onJump,
  onJumpToWeek,
}: NowBandProps) {
  const contest = course.activeContest;
  const contestUrl = contest?.url;
  return (
    <section className="now" aria-label="This week">
      <div className="now__inner">
        <div className="now__weeknum">
          <div className="now__weeklbl">Week</div>
          <div className="now__weekval">
            {String(thisWeek.week).padStart(2, '0')}
          </div>
        </div>
        <div>
          {thisWeek.unit ? (
            <div className="now__eyebrow">This week · {thisWeek.unit}</div>
          ) : (
            <div className="now__eyebrow">This week</div>
          )}
          <div className="now__title">{thisWeek.title}</div>
          <div className="now__rows">
            {thisWeek.theory ? (
              <div className="now__row">
                <span className="now__rowk">Theory</span>
                <span className="now__rowv">{thisWeek.theory}</span>
              </div>
            ) : null}
            {thisWeek.lab ? (
              <div className="now__row">
                <span className="now__rowk">Lab</span>
                <span className="now__rowv">{thisWeek.lab}</span>
              </div>
            ) : null}
          </div>
          <div className="now__actions">
            <button type="button" className="hubact" onClick={onJumpToWeek}>
              <Ic name="list-tree" /> Open in syllabus
            </button>
          </div>
        </div>
        <div className="now__side">
          {course.nextMilestone ? (
            <button
              type="button"
              className="now__milestone now__milestone--link"
              onClick={() => onJump('assessment')}
              title="Open examinations"
            >
              <span className="now__mk">
                <Ic name="flag" /> Next milestone
                <Ic name="arrow-right" className="now__mkchev" />
              </span>
              <span className="now__mv">{course.nextMilestone.label}</span>
              <span className="now__md">{course.nextMilestone.detail}</span>
            </button>
          ) : null}
          {contest ? (
            <>
              <a
                className="btn-contest"
                href={contestUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Ic name="trophy" /> Join the lab contest
              </a>
              <span className="now__contesttag">
                <span className="pulse" aria-hidden="true" /> {contest.platform}{' '}
                · live now
                {contestUrl ? (
                  <button
                    type="button"
                    className="copychip"
                    title="Copy contest link"
                    aria-label="Copy contest link"
                    onClick={() => copyToClipboard(contestUrl)}
                  >
                    <Ic name="copy" />
                  </button>
                ) : null}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

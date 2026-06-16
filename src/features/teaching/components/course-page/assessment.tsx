import type { CourseData, CourseScheme } from '@/shared/types';
import { SectionCard, type SectionToggle } from './section-card';
import { Ic } from './course-icons';

/** A single grade-breakdown scheme (Theory or Lab), a clean bar-chart list. */
function Scheme({ part }: { part: CourseScheme }) {
  const maxPct = Math.max(...part.grading.map((g) => g.pct), 1);
  const total = part.grading.reduce((sum, g) => sum + g.pct, 0);
  const icon = /lab/i.test(part.label) ? 'flask-conical' : 'book-open';
  return (
    <div className="ascard">
      <div className="ascard__top">
        <span className="ascard__icon">
          <Ic name={icon} />
        </span>
        <span className="ascard__label">{part.label}</span>
        {part.credits ? (
          <span className="ascard__cr">
            {part.credits} {part.credits === 1 ? 'credit' : 'credits'}
          </span>
        ) : null}
        {part.placeholder ? (
          <span className="ascheme__draft">Draft</span>
        ) : null}
      </div>
      <div className="asgrade">
        <div className="asgrade__list">
          {part.grading.map((g) => (
            <div className="asgrade__row" key={g.label}>
              <span className="asgrade__name">{g.label}</span>
              <span className="asgrade__track">
                <span
                  className="asgrade__fill"
                  style={{ width: `${(g.pct / maxPct) * 100}%` }}
                />
              </span>
              <span className="asgrade__pct">{g.pct}%</span>
            </div>
          ))}
          <div className="asgrade__row asgrade__row--total">
            <span className="asgrade__name">Total</span>
            <span />
            <span className="asgrade__pct">{total}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 04 Assessment: dual theory/lab schemes side by side. */
export function Assessment({
  course,
  sec,
}: {
  course: CourseData;
  sec: SectionToggle;
}) {
  const schemes = course.assessmentSchemes;
  const parts = schemes
    ? [schemes.theory, schemes.lab].filter((p): p is CourseScheme => Boolean(p))
    : [];
  if (!parts.length) return null;
  return (
    <SectionCard id="assessment" title="Assessment" sec={sec}>
      <div
        className={`aschemes${parts.length === 1 ? ' aschemes--single' : ''}`}
      >
        {parts.map((p) => (
          <Scheme part={p} key={p.label} />
        ))}
      </div>
    </SectionCard>
  );
}

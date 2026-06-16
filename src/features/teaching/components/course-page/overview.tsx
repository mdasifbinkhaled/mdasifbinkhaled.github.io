import type { CourseData } from '@/shared/types';
import { SectionCard, type SectionToggle } from './section-card';

interface Fact {
  k: string;
  v: string;
}

/** 01 Overview: facts strip · description lede · learning outcomes · technologies. */
export function Overview({
  course,
  sec,
}: {
  course: CourseData;
  sec: SectionToggle;
}) {
  const weekCount =
    course.totalWeeks ??
    course.units?.reduce((n, u) => n + u.weeks.length, 0) ??
    0;
  const unitCount = course.units?.length ?? 0;
  const sectionCount = course.sectionsRoster?.rows?.length ?? 0;
  const dual = !!(
    course.assessmentSchemes?.theory && course.assessmentSchemes?.lab
  );
  const facts: Fact[] = [
    weekCount ? { k: 'Duration', v: `${weekCount} weeks` } : null,
    unitCount ? { k: 'Units', v: String(unitCount) } : null,
    dual ? { k: 'Structure', v: 'Theory + Lab' } : null,
    sectionCount ? { k: 'Sections', v: String(sectionCount) } : null,
  ].filter((f): f is Fact => f !== null);

  return (
    <SectionCard id="overview" title="Overview" sec={sec}>
      {facts.length ? (
        <div className="facts">
          {facts.map((f) => (
            <div className="fact" key={f.k}>
              <div className="fact__k">{f.k}</div>
              <div className="fact__v">{f.v}</div>
            </div>
          ))}
        </div>
      ) : null}
      <p className="lede">{course.description}</p>
      <div className="outcomes__lbl">Learning outcomes</div>
      <ul className="outcomes">
        {course.outcomes.map((o, i) => (
          <li className="outcome" key={o}>
            <span className="outcome__n">{String(i + 1).padStart(2, '0')}</span>
            <span className="outcome__t">{o}</span>
          </li>
        ))}
      </ul>
      {course.technologies?.length ? (
        <div className="tech">
          {course.technologies.map((t) => (
            <span className="tech__tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </SectionCard>
  );
}

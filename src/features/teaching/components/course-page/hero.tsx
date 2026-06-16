import type { CourseData } from '@/shared/types';
import { Ic } from './course-icons';

const LEVEL_LABEL: Record<string, string> = {
  undergraduate: 'Undergraduate',
  graduate: 'Graduate',
};

/** Hero: meta line → title → status/credits/level pills (active vs completed). */
export function Hero({ course }: { course: CourseData }) {
  const completed = course.status === 'completed';
  return (
    <header className="hero">
      <div className="hero__meta">
        <span className="hero__code">{course.code}</span>
        <span className="hero__pipe" aria-hidden="true" />
        <span className="hero__metatxt">
          {course.semester} {course.year}
        </span>
        <span className="hero__pipe" aria-hidden="true" />
        <span className="hero__metatxt">
          {course.institutionShort ?? course.institution}
        </span>
      </div>
      <h1 className="hero__title">{course.title}</h1>
      <div className="hero__pills">
        {completed ? (
          <span className="hpill hpill--done">
            <Ic name="check" /> Completed
          </span>
        ) : (
          <span className="hpill hpill--live">
            <span className="pulse" aria-hidden="true" /> Active Course
          </span>
        )}
        <span className="hpill">
          <Ic name="award" /> {course.credits}{' '}
          {course.credits === 1 ? 'Credit' : 'Credits'}
        </span>
        <span className="hpill">
          <Ic name="graduation-cap" />{' '}
          {LEVEL_LABEL[course.level] ?? course.level}
        </span>
        {completed && course.rating ? (
          <span className="hpill">
            <Ic name="star" /> {course.rating.toFixed(1)} avg. rating
          </span>
        ) : null}
      </div>
    </header>
  );
}

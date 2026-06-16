'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { CourseData } from '@/shared/types';
import { useScrollspy } from '@/shared/hooks/use-scrollspy';
import { useIsClient } from '@/shared/hooks/use-is-client';
import { Ic } from './course-icons';
import { Hero } from './hero';
import { NowBand, SummaryBand } from './bands';
import { NoticeStrip } from './notice-strip';
import { SectionNav } from './section-nav';
import { Overview } from './overview';
import { SectionsTable } from './sections-table';
import { Syllabus } from './syllabus';
import { Assessment } from './assessment';
import { Assignments } from './assignments';
import { Resources } from './resources';
import { Rail } from './rail';
import {
  computeCurrentWeek,
  deriveSections,
  deriveThisWeek,
  smoothTo,
} from './course-page.utils';
import './course-page.css';

/**
 * Data-driven "Command Center" course page. Renders an active or completed
 * course from one `CourseData` object, dropping sections whose data is absent.
 */
export function CoursePage({ course }: { course: CourseData }) {
  const completed = course.status === 'completed';
  const totalWeeks =
    course.totalWeeks ??
    course.units?.reduce((n, u) => n + u.weeks.length, 0) ??
    1;

  const { visible, num } = useMemo(() => deriveSections(course), [course]);
  const navIds = useMemo(() => visible.map((s) => s.id), [visible]);
  const active = useScrollspy(navIds);

  // Server renders the authored week (deterministic for hydration); the client
  // recomputes the live week from the term start date after hydration.
  const isClient = useIsClient();
  const currentWeek = isClient
    ? (computeCurrentWeek(course.termStartDate, totalWeeks, new Date()) ??
      course.currentWeek ??
      1)
    : (course.currentWeek ?? 1);

  const [openWeeks, setOpenWeeks] = useState<Set<string>>(() => {
    const seed = new Set<string>();
    if (!completed) {
      const tw = deriveThisWeek(course, course.currentWeek ?? 1);
      if (tw) seed.add(String(tw.week));
    }
    return seed;
  });
  const [openSecs, setOpenSecs] = useState<Set<string>>(
    () => new Set(['overview', 'sections', 'syllabus', 'assessment'])
  );

  const toggleSec = (id: string): void =>
    setOpenSecs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const toggleWeek = (key: string): void =>
    setOpenWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const allOpen = visible.every((s) => openSecs.has(s.id));
  const toggleAll = (): void =>
    setOpenSecs(allOpen ? new Set() : new Set(visible.map((s) => s.id)));

  const jump = (id: string): void => {
    setOpenSecs((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) smoothTo(el.getBoundingClientRect().top + window.scrollY - 78);
    });
  };
  const jumpToWeek = (): void => {
    const tw = deriveThisWeek(course, currentWeek);
    if (tw) setOpenWeeks((prev) => new Set(prev).add(String(tw.week)));
    jump('syllabus');
  };

  const thisWeek = deriveThisWeek(course, currentWeek);
  const secFor = (id: string) => ({
    num: num[id] ?? '',
    open: openSecs.has(id),
    onToggle: toggleSec,
  });
  const has = (id: string): boolean => visible.some((s) => s.id === id);

  return (
    <div className="cp">
      <div className="topbar">
        <Link className="crumb" href="/teaching">
          <Ic name="arrow-left" /> Teaching
        </Link>
      </div>

      <Hero course={course} />

      <div className="top">
        {completed ? (
          <SummaryBand course={course} />
        ) : thisWeek ? (
          <NowBand
            course={course}
            thisWeek={thisWeek}
            onJump={jump}
            onJumpToWeek={jumpToWeek}
          />
        ) : null}
      </div>

      <NoticeStrip course={course} onJump={jump} />

      <SectionNav
        items={visible}
        active={active}
        allOpen={allOpen}
        onJump={jump}
        onToggleAll={toggleAll}
      />

      <div className="body">
        <main className="main">
          {has('overview') ? (
            <Overview course={course} sec={secFor('overview')} />
          ) : null}
          {has('sections') ? (
            <SectionsTable course={course} sec={secFor('sections')} />
          ) : null}
          {has('syllabus') ? (
            <Syllabus
              course={course}
              sec={secFor('syllabus')}
              openWeeks={openWeeks}
              onToggleWeek={toggleWeek}
              currentWeek={currentWeek}
            />
          ) : null}
          {has('assessment') ? (
            <Assessment course={course} sec={secFor('assessment')} />
          ) : null}
          {has('assignments') ? (
            <Assignments course={course} sec={secFor('assignments')} />
          ) : null}
          {has('resources') ? (
            <Resources course={course} sec={secFor('resources')} />
          ) : null}
        </main>
        <Rail course={course} />
      </div>

      <footer className="foot">
        {course.pastOfferings?.length ? (
          <div className="foot__archive">
            <span className="foot__lbl">
              <Ic name="history" /> Past offerings
            </span>
            <div className="foot__terms">
              {course.pastOfferings.map((p) => (
                <span className="foot__term" key={p}>
                  {p}
                </span>
              ))}
            </div>
            <span className="foot__archnote">
              Past exams &amp; problem sets archived per term.
            </span>
          </div>
        ) : null}
        <div className="foot__colophon">
          <div className="foot__ident">
            <span className="foot__mark" aria-hidden="true">
              <Ic name="graduation-cap" />
            </span>
            <span className="foot__identmeta">
              <span className="foot__identa">
                {course.code} · {course.title}
              </span>
              <span className="foot__identb">
                {course.institution}
                {course.staff ? ` · Published by ${course.staff.name}` : ''}
              </span>
            </span>
          </div>
          <button
            type="button"
            className="foot__top"
            onClick={() => smoothTo(0)}
          >
            <Ic name="arrow-up" /> Back to top
          </button>
        </div>
      </footer>
    </div>
  );
}

import { useState } from 'react';
import type { CourseData } from '@/shared/types';
import { SectionCard, type SectionToggle } from './section-card';
import { Ic, type IconKey } from './course-icons';

/** Map a resource group (by its first word) to a representative icon. */
const GROUP_ICON: Record<string, IconKey> = {
  Interactive: 'eye',
  Practice: 'trophy',
  Reference: 'book-open',
  Recommended: 'video',
  Course: 'folder',
  Video: 'video',
};

const firstWord = (s: string): string => s.split(' ')[0] ?? s;

/** 06 Resources: filter chips + grouped, URL-aware link lists. */
export function Resources({
  course,
  sec,
}: {
  course: CourseData;
  sec: SectionToggle;
}) {
  const sections = course.resourceSections ?? [];
  const [filter, setFilter] = useState('All');
  if (!sections.length) return null;

  const chips = Array.from(
    new Set(['All', ...sections.map((g) => firstWord(g.title)), 'New'])
  );
  const groups = sections
    .map((g) => ({
      title: g.title,
      items: g.items.filter((it) =>
        filter === 'All'
          ? true
          : filter === 'New'
            ? it.isNew
            : g.title.startsWith(filter)
      ),
    }))
    .filter((g) => g.items.length);

  return (
    <SectionCard id="resources" title="Resources" sec={sec}>
      <div className="fchips" role="group" aria-label="Filter resources">
        {chips.map((c) => (
          <button
            type="button"
            key={c}
            className={`fchip${filter === c ? ' is-on' : ''}`}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      {groups.map((g) => {
        const icon = GROUP_ICON[firstWord(g.title)] ?? 'link';
        return (
          <div className="resgroup" key={g.title}>
            <div className="resgroup__lbl">{g.title}</div>
            {g.items.map((it) => {
              const content = (
                <>
                  <span className="res__icon">
                    <Ic name={icon} />
                  </span>
                  <span className="res__body">
                    <span className="res__title">
                      {it.label}
                      {it.isNew ? <span className="badge-new">New</span> : null}
                    </span>
                    {it.description ? (
                      <span className="res__desc">{it.description}</span>
                    ) : null}
                  </span>
                  {it.url ? (
                    <span className="res__open">
                      Open <Ic name="arrow-up-right" />
                    </span>
                  ) : null}
                </>
              );
              return it.url ? (
                <a
                  className="res"
                  key={it.label}
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div className="res" key={it.label}>
                  {content}
                </div>
              );
            })}
          </div>
        );
      })}
      {groups.length === 0 ? (
        <p className="res-empty">Nothing matches this filter yet.</p>
      ) : null}
    </SectionCard>
  );
}

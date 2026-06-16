import type { ReactNode } from 'react';
import { Ic } from './course-icons';

export interface SectionToggle {
  num: string;
  open: boolean;
  onToggle: (id: string) => void;
}

interface SectionCardProps {
  id: string;
  title: string;
  sec: SectionToggle;
  action?: ReactNode;
  children: ReactNode;
}

/** Collapsible numbered section card — the repeating unit of the page body. */
export function SectionCard({
  id,
  title,
  sec,
  action,
  children,
}: SectionCardProps) {
  return (
    <section className={`sec${sec.open ? ' is-open' : ''}`} id={id}>
      <div className="sec__head">
        <button
          type="button"
          className="sec__toggle"
          aria-expanded={sec.open}
          aria-controls={`${id}-panel`}
          onClick={() => sec.onToggle(id)}
        >
          <span className="sec__num">{sec.num}</span>
          <h2 className="sec__title">{title}</h2>
          <span className="sec__rule" aria-hidden="true" />
          <span className="sec__chev">
            <Ic name="chevron-down" />
          </span>
        </button>
        {action ? <div className="sec__action">{action}</div> : null}
      </div>
      <div className="sec__panel" id={`${id}-panel`}>
        <div className="sec__pad">{children}</div>
      </div>
    </section>
  );
}

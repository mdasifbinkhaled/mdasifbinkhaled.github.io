import { Ic } from './course-icons';

interface SectionNavProps {
  items: { id: string; label: string }[];
  active: string;
  allOpen: boolean;
  onJump: (id: string) => void;
  onToggleAll: () => void;
}

/** Sticky floating pill toolbar with scrollspy + expand/collapse-all control. */
export function SectionNav({
  items,
  active,
  allOpen,
  onJump,
  onToggleAll,
}: SectionNavProps) {
  return (
    <nav className="secnav" aria-label="On this page">
      <div className="secnav__chips">
        {items.map((s) => (
          <button
            type="button"
            key={s.id}
            className={`secnav__chip${active === s.id ? ' is-on' : ''}`}
            aria-current={active === s.id ? 'true' : undefined}
            onClick={() => onJump(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="secnav__all"
        onClick={onToggleAll}
        aria-label={allOpen ? 'Collapse all sections' : 'Expand all sections'}
      >
        <Ic name={allOpen ? 'chevrons-down-up' : 'chevrons-up-down'} />{' '}
        {allOpen ? 'Collapse sections' : 'Expand sections'}
      </button>
    </nav>
  );
}

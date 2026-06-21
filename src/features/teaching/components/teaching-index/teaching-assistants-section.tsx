import { Info } from 'lucide-react';
import { teachingAssistants } from '@/shared/lib/data/teaching-assistants';

/**
 * §7 — teaching assistants. Sample badge + note while draft. A simple table:
 * Member (initials avatar + name) · Course (mono) · Term · Role. Server
 * component — placeholder initials, no client state. (A per-TA profile link
 * can return as a column once the records carry real URLs.)
 */
export function TeachingAssistantsSection() {
  const { draft, note, rows } = teachingAssistants;

  return (
    <>
      {draft && note && (
        <p className="-mt-0.5 mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info
            className="size-3.5 shrink-0 text-warning-emphasis"
            aria-hidden
          />
          {note}
        </p>
      )}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div
          tabIndex={0}
          role="group"
          aria-label="Teaching assistants, scroll horizontally"
          className="overflow-x-auto focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <div className="min-w-[560px]">
            <div
              aria-hidden
              className="grid grid-cols-[minmax(180px,1.5fr)_116px_132px_1fr] gap-4 bg-linear-to-b from-muted/55 to-muted/30 px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
            >
              <span>Member</span>
              <span>Course</span>
              <span>Term</span>
              <span>Role</span>
            </div>
            {rows.map((r) => {
              const initials = r.name.replace(/[^A-Z]/g, '');
              return (
                <div
                  key={`${r.name}-${r.course}-${r.term}`}
                  className="grid grid-cols-[minmax(180px,1.5fr)_116px_132px_1fr] items-center gap-4 border-t border-border px-6 py-3.5 transition-colors first:border-t-0 even:bg-muted/22 hover:bg-muted/35"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-[38px] shrink-0 place-items-center rounded-full bg-muted/80 font-mono text-xs font-bold text-muted-foreground shadow-[0_0_0_3px_hsl(var(--muted)/0.5)]">
                      {initials}
                    </span>
                    <span className="truncate text-base font-semibold">
                      {r.name}
                    </span>
                  </span>
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {r.course}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {r.term}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {r.role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

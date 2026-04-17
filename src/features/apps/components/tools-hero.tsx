import { apps } from '@/shared/config/apps';

export function ToolsHero() {
  const activeCount = apps.filter((a) => a.status === 'active').length;

  return (
    <div className="relative overflow-hidden bg-primary/5 py-16 sm:py-24 rounded-3xl border mb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-primary)/0.06,transparent_60%)]" />
      <div className="relative px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          Apps &amp; Utilities
        </h1>
        <p className="text-lg leading-8 text-muted-foreground mb-8">
          A collection of intuitive, browser-based tools for academic planning —
          grade calculators, seat planners, and more. All processing happens
          locally in your browser.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          {activeCount} tools available
        </div>
      </div>
    </div>
  );
}

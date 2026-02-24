export function ToolsHero() {
  return (
    <div className="relative overflow-hidden bg-primary/5 py-16 sm:py-24 rounded-3xl border mb-12">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="relative px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          Apps & Utilities
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          A collection of intuitive, browser-based tools for academic planning —
          grade calculators, seat planners, and more. All processing happens
          locally in your browser.
        </p>
      </div>
    </div>
  );
}

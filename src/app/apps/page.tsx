import type { Metadata } from 'next';
import { ToolsHero, ToolCard } from '@/features/apps';
import { siteConfig } from '@/shared/config/site';
import { getAppsByCategory } from '@/shared/config/apps';

export const metadata: Metadata = {
  title: `Apps | ${siteConfig.author}`,
  description:
    'A suite of interactive academic utilities including grade calculators, seat planners, and study aids.',
  alternates: {
    canonical: '/apps',
  },
  openGraph: {
    title: `Apps | ${siteConfig.author}`,
    description:
      'A suite of interactive academic utilities including grade calculators, seat planners, and study aids.',
  },
};

export default function AppsPage() {
  const groups = getAppsByCategory();

  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <ToolsHero />

      {groups.map((group) => (
        <section key={group.category} className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">{group.label}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((app) => (
              <ToolCard key={app.slug} app={app} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

import { Icon } from '@/shared/components/common/icons';
import type { AppDefinition } from '@/shared/types';
import Link from 'next/link';

interface ToolCardProps {
  app: AppDefinition;
}

export function ToolCard({ app }: ToolCardProps) {
  const { slug, title, description, icon, status } = app;
  const isPlanned = status === 'planned';
  const href = `/apps/${slug}`;

  return (
    <div
      className={`relative group flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 ${
        isPlanned
          ? 'bg-muted/30 border-dashed opacity-75'
          : 'bg-card hover:shadow-lg hover:-translate-y-1 hover:border-primary/50'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
              isPlanned
                ? 'bg-muted text-muted-foreground'
                : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
            }`}
          >
            <Icon name={icon} className="h-6 w-6" />
          </div>
          {status !== 'active' && (
            <span
              className={`px-2.5 py-1 text-xs font-semibold tracking-wide rounded-full uppercase ${
                status === 'beta'
                  ? 'bg-amber-100/80 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {status}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-lg tracking-tight mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {!isPlanned ? (
        <Link
          href={href}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="sr-only">Go to {title}</span>
        </Link>
      ) : null}
    </div>
  );
}

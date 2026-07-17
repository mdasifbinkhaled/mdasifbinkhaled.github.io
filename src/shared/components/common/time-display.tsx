'use client';

import type { ReactNode } from 'react';
import { useDhakaTime } from '@/shared/hooks';
import { siteConfig } from '@/shared/config';

interface TimeDisplayProps {
  /** IANA time zone of the site owner's location (defaults to Dhaka). */
  homeTimeZone?: string;
  isCollapsed?: boolean;
}

const pct = (n: number) => `${Math.max(0, Math.min(100, n * 100))}%`;

/** A 24-hour sky: midnight → sunrise → noon → sunset → midnight. */
const SKY_GRADIENT =
  'linear-gradient(90deg,' +
  '#334155 0%,#5b6b86 12%,#f0a868 24%,#bfe0f5 50%,#f0a868 76%,#5b6b86 88%,#334155 100%)';

export function TimeDisplay({
  homeTimeZone = 'Asia/Dhaka',
  isCollapsed = false,
}: TimeDisplayProps) {
  const t = useDhakaTime(homeTimeZone);
  if (!t.ready) return null;

  // "Dhaka, Bangladesh" → "Bangladesh"
  const homeCountry = siteConfig.address.split(',').slice(1).join(',').trim();
  const apart =
    t.offsetLabel === 'same time'
      ? 'Same time as you'
      : `You're ${t.offsetLabel}`;

  const detail =
    `${siteConfig.address} · ${t.homeTime} · ${t.homeDate} · ${t.homeGmtLabel}\n` +
    `You · ${t.viewerCity} · ${t.viewerTime} · ${t.viewerDate} · ${t.viewerGmtLabel}\n` +
    `${t.apartLabel} · Sunrise ${t.sunrise} · Sunset ${t.sunset}`;

  if (isCollapsed) {
    return (
      <div
        className="flex w-full cursor-help justify-center rounded-md py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent/50"
        title={detail}
      >
        <span className="font-mono text-[11px] font-semibold tabular-nums">
          {t.homeTime.replace(/\s?[AP]M$/i, '')}
        </span>
      </div>
    );
  }

  const personRow = (
    dot: ReactNode,
    name: string,
    time: string,
    place: string,
    date: string,
    gmt: string
  ) => (
    <div>
      <div className="flex items-baseline gap-2 text-xs">
        {dot}
        <span className="font-medium text-sidebar-foreground">{name}</span>
        <span className="ml-auto font-mono font-semibold tabular-nums text-sidebar-foreground">
          {time}
        </span>
      </div>
      <div className="pl-4 text-[10px] leading-tight text-muted-foreground">
        {place} · {date} · {gmt}
      </div>
    </div>
  );

  return (
    <div
      className="mt-4 rounded-lg border border-sidebar-border/60 px-3 py-3"
      title={detail}
    >
      {/* Dhaka's label above the bar (colour-matched to its filled marker) */}
      <div className="relative mb-1 h-3 text-[9px] font-medium text-primary">
        <span
          className="absolute -translate-x-1/2 whitespace-nowrap"
          style={{ left: pct(t.dayProgress) }}
        >
          {siteConfig.locationLabel}
        </span>
      </div>

      {/* Gradient day-strip with two identifiable markers */}
      <div
        className="relative h-2 rounded-full"
        style={{ background: SKY_GRADIENT }}
      >
        <div
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-sidebar"
          style={{ left: pct(t.dayProgress) }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sidebar-foreground bg-sidebar ring-2 ring-sidebar"
          style={{ left: pct(t.viewerDayProgress) }}
          aria-hidden="true"
        />
      </div>

      {/* The viewer's label below the bar — never collides with Dhaka's */}
      <div className="relative mb-3 mt-1 h-3 text-[9px] font-medium text-muted-foreground">
        <span
          className="absolute -translate-x-1/2 whitespace-nowrap"
          style={{ left: pct(t.viewerDayProgress) }}
        >
          You
        </span>
      </div>

      {/* Two rows */}
      <div className="space-y-2">
        {personRow(
          <span className="size-2 shrink-0 translate-y-px rounded-full bg-primary" />,
          siteConfig.locationLabel,
          t.homeTime,
          homeCountry,
          t.homeDate,
          t.homeGmtLabel
        )}
        {personRow(
          <span className="size-2 shrink-0 translate-y-px rounded-full border-[1.5px] border-sidebar-foreground" />,
          'You',
          t.viewerTime,
          t.viewerCity,
          t.viewerDate,
          t.viewerGmtLabel
        )}
      </div>

      {/* Difference — one consistent place */}
      <div className="mt-2.5 border-t border-sidebar-border/40 pt-2 text-center text-[10px] font-medium text-muted-foreground">
        {apart}
      </div>
    </div>
  );
}

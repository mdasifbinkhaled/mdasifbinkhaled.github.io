'use client';

import { useEffect, useState } from 'react';
import { useIsClient } from './use-is-client';
import {
  formatApartLabel,
  formatGmtLabel,
  formatOffsetLabel,
  getDhakaPhase,
  getMinuteOfDay,
  getSunTimes,
  getTimeZoneOffsetMinutes,
  type DhakaPhase,
} from '@/shared/lib/time';

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
};

/** Coordinates paired with the default home zone (Dhaka), for sunrise/sunset. */
const DHAKA_COORDS = { latitude: 23.8103, longitude: 90.4125 };

export interface DhakaTime extends DhakaPhase {
  /** False until mounted on the client — render nothing while false (avoids hydration mismatch). */
  ready: boolean;
  /** Home (Dhaka) time, e.g. "3:24 PM". */
  homeTime: string;
  /** Home full date, e.g. "Fri, Jul 18". */
  homeDate: string;
  /** Home zone offset label, e.g. "GMT+6". */
  homeGmtLabel: string;
  /** Viewer's local time, e.g. "4:24 AM". */
  viewerTime: string;
  /** Viewer's full date, e.g. "Thu, Jul 17" — reveals date-line differences. */
  viewerDate: string;
  /** Viewer zone offset label, e.g. "GMT-5". */
  viewerGmtLabel: string;
  /** Viewer's city, derived from their IANA zone, e.g. "New York". */
  viewerCity: string;
  /** Directional relationship, e.g. "11h behind" / "same time". */
  offsetLabel: string;
  /** Direction-agnostic distance, e.g. "11h apart" / "same zone". */
  apartLabel: string;
  /** Dhaka sunrise, e.g. "5:20 AM". */
  sunrise: string;
  /** Dhaka sunset, e.g. "6:47 PM". */
  sunset: string;
  /** Current position through Dhaka's day (0–1), for the timeline marker. */
  dayProgress: number;
  /** Sunrise position through the day (0–1). */
  sunriseAt: number;
  /** Sunset position through the day (0–1). */
  sunsetAt: number;
  /** Viewer's current position through their day (0–1), for the shared strip. */
  viewerDayProgress: number;
}

/**
 * Live home-vs-viewer time for the sidebar clock. `Intl`-only, hydration-safe,
 * updated once a minute. All zone/solar math lives in `@/shared/lib/time`, so a
 * future migration to the Temporal API is isolated there.
 */
export function useDhakaTime(
  homeTimeZone = 'Asia/Dhaka',
  coords = DHAKA_COORDS
): DhakaTime {
  const ready = useIsClient();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const homeHour = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: homeTimeZone,
      hour: '2-digit',
      hourCycle: 'h23',
    }).format(now)
  );

  const viewerTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const homeOffset = getTimeZoneOffsetMinutes(homeTimeZone, now);
  const viewerOffset = getTimeZoneOffsetMinutes(viewerTimeZone, now);
  const { sunrise, sunset } = getSunTimes(
    now,
    coords.latitude,
    coords.longitude
  );

  const inHome = (opts: Intl.DateTimeFormatOptions, when: Date = now) =>
    new Intl.DateTimeFormat('en-US', {
      ...opts,
      timeZone: homeTimeZone,
    }).format(when);

  return {
    ready,
    ...getDhakaPhase(homeHour),
    homeTime: inHome(TIME_FORMAT),
    homeDate: inHome(DATE_FORMAT),
    homeGmtLabel: formatGmtLabel(homeOffset),
    viewerTime: new Intl.DateTimeFormat('en-US', TIME_FORMAT).format(now),
    viewerDate: new Intl.DateTimeFormat('en-US', DATE_FORMAT).format(now),
    viewerGmtLabel: formatGmtLabel(viewerOffset),
    viewerCity:
      viewerTimeZone.split('/').pop()?.replace(/_/g, ' ') ?? viewerTimeZone,
    offsetLabel: formatOffsetLabel(homeOffset, viewerOffset),
    apartLabel: formatApartLabel(homeOffset, viewerOffset),
    sunrise: inHome(TIME_FORMAT, sunrise),
    sunset: inHome(TIME_FORMAT, sunset),
    dayProgress: getMinuteOfDay(now, homeTimeZone) / 1440,
    sunriseAt: getMinuteOfDay(sunrise, homeTimeZone) / 1440,
    sunsetAt: getMinuteOfDay(sunset, homeTimeZone) / 1440,
    viewerDayProgress: getMinuteOfDay(now, viewerTimeZone) / 1440,
  };
}

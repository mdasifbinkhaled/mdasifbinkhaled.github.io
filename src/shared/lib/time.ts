/**
 * Timezone-aware time helpers.
 *
 * Uses the `Intl` API only — no dependencies — and keeps all zone math in small
 * pure functions so a future migration to the Temporal API (once Safari ships it)
 * is a localized change rather than a rewrite.
 */

/**
 * UTC offset, in minutes, of an IANA time zone at a given instant.
 * DST-correct because it asks `Intl` for the offset *at that date*.
 * e.g. `Asia/Dhaka` → 360, `America/New_York` → -240 (EDT) or -300 (EST).
 */
export function getTimeZoneOffsetMinutes(timeZone: string, date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
  }).formatToParts(date);

  const name = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  // "GMT+06:00", "GMT-04:00", "GMT+05:45", or bare "GMT" for UTC.
  const match = name.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  if (!match) return 0;

  const sign = match[1] === '-' ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);
  return sign * (hours * 60 + minutes);
}

/**
 * Human-readable relationship of the viewer's zone to Dhaka.
 * e.g. "11h behind", "4h ahead", "30m behind", "10h 30m behind", "same time".
 */
export function formatOffsetLabel(
  dhakaOffsetMin: number,
  viewerOffsetMin: number
): string {
  const delta = dhakaOffsetMin - viewerOffsetMin;
  if (delta === 0) return 'same time';

  const direction = delta > 0 ? 'behind' : 'ahead';
  const abs = Math.abs(delta);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  return `${parts.join(' ')} ${direction}`;
}

/** Compact UTC-offset label for a zone, e.g. "GMT+6", "GMT-5", "GMT+5:45", "GMT". */
export function formatGmtLabel(offsetMin: number): string {
  if (offsetMin === 0) return 'GMT';
  const sign = offsetMin > 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return minutes === 0
    ? `GMT${sign}${hours}`
    : `GMT${sign}${hours}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Direction-agnostic distance between two zones, e.g. "11h apart",
 * "30m apart", "10h 30m apart", "same zone".
 */
export function formatApartLabel(
  dhakaOffsetMin: number,
  viewerOffsetMin: number
): string {
  const abs = Math.abs(dhakaOffsetMin - viewerOffsetMin);
  if (abs === 0) return 'same zone';
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  return `${parts.join(' ')} apart`;
}

export type DhakaPhase = {
  phase: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  /** Daylight window — drives the sun vs. moon glyph. */
  isDay: boolean;
  /** Sociable-hour heuristic — drives the presence dot (awake vs. resting). */
  awake: boolean;
};

/** Classify a Dhaka local hour (0–23) into a phase plus day/awake heuristics. */
export function getDhakaPhase(hour: number): DhakaPhase {
  let phase: DhakaPhase['phase'];
  if (hour >= 5 && hour < 12) phase = 'Morning';
  else if (hour >= 12 && hour < 17) phase = 'Afternoon';
  else if (hour >= 17 && hour < 21) phase = 'Evening';
  else phase = 'Night';

  return {
    phase,
    isDay: hour >= 6 && hour < 18,
    awake: hour >= 6 && hour < 23,
  };
}

/**
 * Sunrise & sunset (as UTC instants) for a location on a given date, via the
 * standard NOAA sunrise equation. Pure and dependency-free; format the returned
 * instants into any zone with `Intl`.
 */
export function getSunTimes(
  date: Date,
  latitude: number,
  longitude: number
): { sunrise: Date; sunset: Date } {
  const rad = Math.PI / 180;
  const dayMs = 86_400_000;
  const J1970 = 2440588;
  const J2000 = 2451545;

  const toDays = (d: Date) => d.valueOf() / dayMs - 0.5 + J1970 - J2000;
  const fromJulian = (j: number) => new Date((j + 0.5 - J1970) * dayMs);

  const e = rad * 23.4397; // obliquity of the ecliptic
  const lw = rad * -longitude;
  const phi = rad * latitude;
  const d = toDays(date);

  const solarMeanAnomaly = (days: number) =>
    rad * (357.5291 + 0.98560028 * days);
  const eclipticLongitude = (m: number) => {
    const center =
      rad *
      (1.9148 * Math.sin(m) +
        0.02 * Math.sin(2 * m) +
        0.0003 * Math.sin(3 * m));
    const perihelion = rad * 102.9372;
    return m + center + perihelion + Math.PI;
  };
  const solarTransit = (ds: number, m: number, l: number) =>
    J2000 + ds + 0.0053 * Math.sin(m) - 0.0069 * Math.sin(2 * l);

  const j0 = 0.0009;
  const n = Math.round(d - j0 - lw / (2 * Math.PI));
  const ds = j0 + (0 + lw) / (2 * Math.PI) + n;
  const m = solarMeanAnomaly(ds);
  const l = eclipticLongitude(m);
  const dec = Math.asin(Math.sin(e) * Math.sin(l));
  const jNoon = solarTransit(ds, m, l);

  const h0 = -0.833 * rad; // sun altitude at sunrise/sunset (refraction + radius)
  const w0 = Math.acos(
    (Math.sin(h0) - Math.sin(phi) * Math.sin(dec)) /
      (Math.cos(phi) * Math.cos(dec))
  );
  const a = j0 + (w0 + lw) / (2 * Math.PI) + n;
  const jSet = solarTransit(a, m, l);
  const jRise = jNoon - (jSet - jNoon);

  return { sunrise: fromJulian(jRise), sunset: fromJulian(jSet) };
}

/** Minutes since local midnight (0–1439) for an instant, in the given zone. */
export function getMinuteOfDay(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return hour * 60 + minute;
}

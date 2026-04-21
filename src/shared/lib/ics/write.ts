// ────────────────────────────────────────────────
// Shared ICS (iCalendar) writer
// ────────────────────────────────────────────────
// Minimal RFC 5545 writer covering the bits the apps hub needs:
// VCALENDAR wrapper + VEVENT blocks with DTSTART/DTEND/SUMMARY/DESCRIPTION.
// Escaping per §3.3.11 (commas, semicolons, backslashes, newlines).

export interface IcsEvent {
  /** Start time. */
  start: Date;
  /** End time (defaults to start + `defaultDurationMs` if omitted). */
  end?: Date;
  /** Calendar title for the event. */
  summary: string;
  /** Optional long description. */
  description?: string;
  /** Optional location string. */
  location?: string;
  /** Stable UID; auto-generated if missing. */
  uid?: string;
}

export interface WriteIcsOptions {
  /** PRODID line — usually `-//Org//Product//EN`. */
  prodId?: string;
  /** Default event duration when `end` is not provided (default 2 h). */
  defaultDurationMs?: number;
}

const DEFAULT_PRODID = '-//ABK//Apps Hub//EN';
const DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000;

// RFC 5545 §3.3.11 TEXT escaping.
function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

// RFC 5545 §3.3.5 DATE-TIME in UTC (basic form, with trailing Z).
function formatDateTime(d: Date): string {
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

function makeUid(): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${rand}@apps-hub.local`;
}

/**
 * Serialise a list of events to an RFC 5545 iCalendar string.
 * Line breaks are CRLF per spec. Folds are left to the host app if
 * lines ever exceed 75 octets (the apps hub never gets close).
 */
export function writeIcs(
  events: IcsEvent[],
  opts: WriteIcsOptions = {}
): string {
  const prodId = opts.prodId ?? DEFAULT_PRODID;
  const durMs = opts.defaultDurationMs ?? DEFAULT_DURATION_MS;

  const blocks = events.map((evt) => {
    const start = evt.start;
    const end = evt.end ?? new Date(start.getTime() + durMs);
    const uid = evt.uid ?? makeUid();
    const lines = [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatDateTime(new Date())}`,
      `DTSTART:${formatDateTime(start)}`,
      `DTEND:${formatDateTime(end)}`,
      `SUMMARY:${escapeText(evt.summary)}`,
    ];
    if (evt.description)
      lines.push(`DESCRIPTION:${escapeText(evt.description)}`);
    if (evt.location) lines.push(`LOCATION:${escapeText(evt.location)}`);
    lines.push('END:VEVENT');
    return lines.join('\r\n');
  });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${prodId}`,
    'CALSCALE:GREGORIAN',
    ...blocks,
    'END:VCALENDAR',
  ].join('\r\n');
}

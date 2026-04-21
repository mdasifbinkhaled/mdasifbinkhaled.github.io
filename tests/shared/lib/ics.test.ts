import { describe, it, expect } from 'vitest';
import { writeIcs } from '@/shared/lib/ics';

describe('writeIcs', () => {
  it('wraps events in BEGIN:VCALENDAR / END:VCALENDAR', () => {
    const ics = writeIcs([
      { start: new Date('2025-01-10T10:00:00Z'), summary: 'Exam' },
    ]);
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics.endsWith('\r\nEND:VCALENDAR')).toBe(true);
    expect(ics).toContain('VERSION:2.0');
    expect(ics).toContain('PRODID:');
    expect(ics).toContain('CALSCALE:GREGORIAN');
  });

  it('emits a VEVENT per event', () => {
    const ics = writeIcs([
      { start: new Date('2025-01-10T10:00:00Z'), summary: 'One' },
      { start: new Date('2025-02-11T11:00:00Z'), summary: 'Two' },
    ]);
    expect(ics.match(/BEGIN:VEVENT/g)?.length).toBe(2);
    expect(ics.match(/END:VEVENT/g)?.length).toBe(2);
  });

  it('formats DTSTART/DTEND in UTC basic format', () => {
    const ics = writeIcs([
      { start: new Date('2025-01-10T10:00:00Z'), summary: 'X' },
    ]);
    expect(ics).toContain('DTSTART:20250110T100000Z');
    // default 2h duration
    expect(ics).toContain('DTEND:20250110T120000Z');
  });

  it('honours explicit end', () => {
    const ics = writeIcs([
      {
        start: new Date('2025-01-10T10:00:00Z'),
        end: new Date('2025-01-10T10:30:00Z'),
        summary: 'Short',
      },
    ]);
    expect(ics).toContain('DTSTART:20250110T100000Z');
    expect(ics).toContain('DTEND:20250110T103000Z');
  });

  it('escapes commas, semicolons, backslashes and newlines', () => {
    const ics = writeIcs([
      {
        start: new Date('2025-01-10T10:00:00Z'),
        summary: 'A,B;C\\D\nE',
        description: 'line1\nline2',
      },
    ]);
    expect(ics).toContain('SUMMARY:A\\,B\\;C\\\\D\\nE');
    expect(ics).toContain('DESCRIPTION:line1\\nline2');
  });

  it('uses provided UID or synthesises one', () => {
    const ics = writeIcs([
      {
        start: new Date('2025-01-10T10:00:00Z'),
        summary: 'A',
        uid: 'fixed-uid@x',
      },
      { start: new Date('2025-01-11T10:00:00Z'), summary: 'B' },
    ]);
    expect(ics).toContain('UID:fixed-uid@x');
    const uids = ics.match(/UID:[^\r\n]+/g) ?? [];
    expect(uids).toHaveLength(2);
    expect(uids[0]).toBe('UID:fixed-uid@x');
    expect(uids[1]!.length).toBeGreaterThan('UID:'.length);
  });

  it('includes DTSTAMP and LOCATION when given', () => {
    const ics = writeIcs([
      {
        start: new Date('2025-01-10T10:00:00Z'),
        summary: 'A',
        location: 'Room 101',
      },
    ]);
    expect(ics).toMatch(/DTSTAMP:\d{8}T\d{6}Z/);
    expect(ics).toContain('LOCATION:Room 101');
  });

  it('allows custom PRODID', () => {
    const ics = writeIcs(
      [{ start: new Date('2025-01-10T10:00:00Z'), summary: 'A' }],
      { prodId: '-//Acme//Test//EN' }
    );
    expect(ics).toContain('PRODID:-//Acme//Test//EN');
  });

  it('returns a calendar with no events when list is empty', () => {
    const ics = writeIcs([]);
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('END:VCALENDAR');
    expect(ics).not.toContain('BEGIN:VEVENT');
  });
});

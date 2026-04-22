import { parseText as parseTabularText } from '@/shared/lib/parsers/tabular';
import type { ImportedRow } from '@/shared/lib/parsers/types';
import type { Room, Student } from './types';

const SECTION_SOURCE_PATTERNS = [
  /(?:^|[^a-z0-9])(?:section|sections|sec|sect|group|grp|batch|shift|s)(?:[\s._-]*(?:no|number|#))?[\s._-]*0*(\d{1,3})(?=$|[^a-z0-9])/i,
  /(?:^|[^a-z0-9])0*(\d{1,3})[\s._-]*(?:section|sections|sec|sect|group|grp|batch|shift)(?=$|[^a-z0-9])/i,
  /(?:^|[\s._\-(])0*(\d{1,2})(?=$|[\s._\-)])/i,
] as const;

const STUDENT_CORE_KEYS = new Set(['id', 'name', 'section']);
const ROOM_STRUCTURED_DELIMITER = /[,	;|]/;

export function inferSectionFromSource(source: string): string | undefined {
  const stem = source.replace(/\.[^.]+$/, '');

  for (const pattern of SECTION_SOURCE_PATTERNS) {
    const match = stem.match(pattern);
    if (!match) continue;
    const value = match[1];
    if (!value) continue;

    const section = Number(value);
    if (Number.isFinite(section) && section > 0) {
      return String(Math.floor(section));
    }
  }

  return undefined;
}

export function normalizeRoomName(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function getRoomNameKey(value: string): string {
  return normalizeRoomName(value).toLocaleLowerCase();
}

export function parseRoomCapacity(value: unknown): number | null {
  const text = typeof value === 'string' ? value.trim() : String(value ?? '');
  if (!text) return null;

  const capacity = Number(text);
  if (!Number.isFinite(capacity) || capacity <= 0) return null;

  return Math.floor(capacity);
}

function splitRoomImportLine(line: string): [string, string] | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  if (ROOM_STRUCTURED_DELIMITER.test(trimmed)) {
    const structuredMatch = trimmed.match(/^(.+?)\s*[,\t;|]\s*(.+)$/);
    if (!structuredMatch) return null;

    const left = structuredMatch[1]?.trim() ?? '';
    const right = structuredMatch[2]?.trim() ?? '';
    return left && right ? [left, right] : null;
  }

  const whitespaceMatch = trimmed.match(/^(.+?)\s+(\S+)$/);
  if (!whitespaceMatch) return null;

  const left = whitespaceMatch[1]?.trim() ?? '';
  const right = whitespaceMatch[2]?.trim() ?? '';
  return left && right ? [left, right] : null;
}

export function parseRoomImportText(text: string, source = 'Pasted text') {
  const normalized = text
    .split(/\r?\n/)
    .map((line) => {
      const split = splitRoomImportLine(line);
      return split ? `${split[0]}\t${split[1]}` : line;
    })
    .join('\n');

  return parseTabularText(normalized, source);
}

export function validateRoomDraft(
  roomName: string,
  roomCapacity: string,
  rooms: Room[]
): string | null {
  const normalizedName = normalizeRoomName(roomName);
  if (!normalizedName) return 'Enter a room name.';

  const capacity = parseRoomCapacity(roomCapacity);
  if (capacity === null) {
    return 'Capacity must be a positive whole number.';
  }

  const key = getRoomNameKey(normalizedName);
  if (rooms.some((room) => getRoomNameKey(room.name) === key)) {
    return 'A room with this name already exists.';
  }

  return null;
}

export function extractStudentExtras(
  row: ImportedRow<'id' | 'name' | 'section'>
): Record<string, string> | undefined {
  const extras = Object.fromEntries(
    Object.entries(row).reduce<[string, string][]>((entries, [key, value]) => {
      const normalizedKey = key.trim();
      if (STUDENT_CORE_KEYS.has(normalizedKey.toLocaleLowerCase())) {
        return entries;
      }

      const normalizedValue = String(value ?? '').trim();
      if (!normalizedValue) return entries;

      entries.push([normalizedKey, normalizedValue]);
      return entries;
    }, [])
  );

  return Object.keys(extras).length > 0 ? extras : undefined;
}

export function normalizeImportedStudent(
  row: ImportedRow<'id' | 'name' | 'section'>
): Student {
  const section = Number(row.section);

  return {
    id: String(row.id ?? '').trim(),
    name: String(row.name ?? '').trim(),
    section: Number.isFinite(section) && section > 0 ? Math.floor(section) : 1,
    extras: extractStudentExtras(row),
  };
}

export function normalizeImportedRoom(
  row: ImportedRow<'name' | 'capacity'>
): { name: string; capacity: number } | null {
  const name = normalizeRoomName(String(row.name ?? ''));
  const capacity = parseRoomCapacity(row.capacity);

  if (!name || capacity === null) return null;

  return { name, capacity };
}

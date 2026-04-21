/**
 * Namespaced localStorage helper.
 *
 * All keys are stored under `abk:v1:<tool>:<key>`. Each tool owns its
 * namespace; purging one tool's data cannot affect another.
 *
 * Keys must match `KEY_PATTERN` (lowercase kebab, digits, `_`). Tool slugs
 * match the slug registered in `src/shared/config/apps.ts`.
 */

export const STORAGE_PREFIX = 'abk:v1';

const KEY_PATTERN = /^[a-z0-9][a-z0-9-_]*$/;
const TOOL_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

function assertToolSlug(tool: string): void {
  if (!TOOL_PATTERN.test(tool)) {
    throw new Error(
      `[storage] Invalid tool slug "${tool}" — must match ${TOOL_PATTERN}`
    );
  }
}

function assertKey(key: string): void {
  if (!KEY_PATTERN.test(key)) {
    throw new Error(
      `[storage] Invalid storage key "${key}" — must match ${KEY_PATTERN}`
    );
  }
}

function isBrowser(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  );
}

/** Build the fully-qualified storage key for a tool/key pair. */
export function buildKey(tool: string, key: string): string {
  assertToolSlug(tool);
  assertKey(key);
  return `${STORAGE_PREFIX}:${tool}:${key}`;
}

/** Read and JSON-parse a single value. Returns `null` on missing/corrupt. */
export function readValue<T>(tool: string, key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(buildKey(tool, key));
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

/** Write a value as JSON. Returns `false` if storage is unavailable/full. */
export function writeValue<T>(tool: string, key: string, value: T): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(buildKey(tool, key), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Remove a single key. */
export function removeValue(tool: string, key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(buildKey(tool, key));
  } catch {
    /* noop */
  }
}

/**
 * Purge every key belonging to a tool.
 *
 * This iterates localStorage and deletes anything prefixed with
 * `abk:v1:<tool>:`. Other tools and legacy (`abk_*`) keys are untouched —
 * purging one tool **cannot** affect another.
 */
export function purgeToolData(tool: string): number {
  if (!isBrowser()) return 0;
  assertToolSlug(tool);
  const prefix = `${STORAGE_PREFIX}:${tool}:`;
  const keysToRemove: string[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(prefix)) keysToRemove.push(k);
    }
    for (const k of keysToRemove) window.localStorage.removeItem(k);
  } catch {
    /* noop */
  }
  return keysToRemove.length;
}

/**
 * Serialize **all** data belonging to one tool to a single JSON object
 * (useful for "Export backup" before reset).
 */
export function snapshotToolData(tool: string): Record<string, unknown> {
  if (!isBrowser()) return {};
  assertToolSlug(tool);
  const prefix = `${STORAGE_PREFIX}:${tool}:`;
  const out: Record<string, unknown> = {};
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (!k || !k.startsWith(prefix)) continue;
      const shortKey = k.slice(prefix.length);
      const raw = window.localStorage.getItem(k);
      if (raw === null) continue;
      try {
        out[shortKey] = JSON.parse(raw);
      } catch {
        out[shortKey] = raw;
      }
    }
  } catch {
    /* noop */
  }
  return out;
}

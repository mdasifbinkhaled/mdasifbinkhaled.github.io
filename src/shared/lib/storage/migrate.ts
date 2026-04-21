/**
 * One-time migration from legacy flat keys (`abk_grade_calculator`) to the
 * namespaced, versioned scheme (`abk:v1:grade-calculator:components`).
 *
 * Each tool registers its own list of (legacy → new) pairs. A sentinel key
 * `abk:v1:_migrated:<tool>` prevents re-runs.
 *
 * The migration is **lossless**: legacy keys are read, the value is written
 * to the new namespaced key, and the legacy key is removed only after a
 * successful write. Parse failures leave the legacy key in place.
 */

import { STORAGE_PREFIX } from './namespaced';

export interface LegacyMapping {
  /** Legacy flat localStorage key (e.g. "abk_grade_calculator"). */
  legacyKey: string;
  /** Target short key under the tool namespace (e.g. "components"). */
  newKey: string;
}

function isBrowser(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  );
}

function sentinelKey(tool: string): string {
  return `${STORAGE_PREFIX}:_migrated:${tool}`;
}

/**
 * Migrate legacy keys for one tool. Safe to call multiple times — the
 * sentinel short-circuits after the first successful run.
 *
 * Returns the number of keys actually moved (0 when already migrated or
 * nothing to migrate).
 */
export function migrateTool(tool: string, mapping: LegacyMapping[]): number {
  if (!isBrowser()) return 0;
  try {
    if (window.localStorage.getItem(sentinelKey(tool)) === 'true') return 0;
  } catch {
    return 0;
  }

  let moved = 0;
  for (const { legacyKey, newKey } of mapping) {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(legacyKey);
    } catch {
      continue;
    }
    if (raw === null) continue;
    // Validate JSON before moving — leave corrupt data where it is.
    try {
      JSON.parse(raw);
    } catch {
      continue;
    }
    const target = `${STORAGE_PREFIX}:${tool}:${newKey}`;
    try {
      window.localStorage.setItem(target, raw);
      window.localStorage.removeItem(legacyKey);
      moved++;
    } catch {
      /* storage full — abort this pair, keep legacy */
    }
  }

  try {
    window.localStorage.setItem(sentinelKey(tool), 'true');
  } catch {
    /* noop */
  }
  return moved;
}

/** Convenience registry for tools with legacy keys. */
export const LEGACY_MIGRATIONS: Record<string, LegacyMapping[]> = {
  'grade-calculator': [
    { legacyKey: 'abk_grade_calculator', newKey: 'components' },
    { legacyKey: 'abk_grade_target', newKey: 'target' },
  ],
  'gpa-calculator': [
    { legacyKey: 'abk_gpa_courses', newKey: 'courses' },
    { legacyKey: 'abk_gpa_prev_credits', newKey: 'prev_credits' },
    { legacyKey: 'abk_gpa_prev_cgpa', newKey: 'prev_cgpa' },
  ],
  'exam-countdown': [{ legacyKey: 'abk_exam_countdown', newKey: 'events' }],
  'course-planner': [{ legacyKey: 'abk_course_planner', newKey: 'courses' }],
  'study-timer': [
    { legacyKey: 'abk_study_timer_settings', newKey: 'settings' },
    { legacyKey: 'abk_study_timer_log', newKey: 'log' },
  ],
};

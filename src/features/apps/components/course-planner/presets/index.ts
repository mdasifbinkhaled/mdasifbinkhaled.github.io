import type { CoursePlannerPreset } from '../types';

import { IUB_CSE_PRESET } from './iub-cse';

export { IUB_CSE_PRESET } from './iub-cse';

export const PRESETS = [
  IUB_CSE_PRESET,
] as const satisfies readonly CoursePlannerPreset[];

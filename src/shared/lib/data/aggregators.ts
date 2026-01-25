import { professionalExperiences } from './experience';
import { researchInterests } from './research-interests';

/**
 * Teaching & Research Statistics Aggregator
 * Centralizes calculations to avoid "magic numbers" and discrepancies.
 */

/**
 * Calculate total years of professional experience
 * Based on the earliest start date in professionalExperiences
 */
export function getYearsExperience(): number {
  if (!professionalExperiences || professionalExperiences.length === 0)
    return 0;

  // Filter for full-time / professional roles only
  // Excludes Student Tutors, Internships, and Teaching Support roles from the primary "Years Experience" count
  const validExperiences = professionalExperiences.filter((exp) => {
    const isInternship =
      exp.tags?.some((t) => t.toLowerCase().includes('intern')) ||
      exp.title.toLowerCase().includes('intern');
    const isStudent =
      exp.type === 'Teaching Support' ||
      exp.title.toLowerCase().includes('assistant');
    return !isInternship && !isStudent;
  });

  const targetExperiences =
    validExperiences.length > 0 ? validExperiences : professionalExperiences;

  const startDates = targetExperiences.map((exp) => {
    const duration = exp.duration;
    if (!duration) return new Date().getFullYear();

    const parts = duration.split('-');
    const part = parts[0];
    if (!part) return new Date().getFullYear();

    const dateStr = part.trim();
    return new Date(dateStr).getFullYear();
  });

  const earliestYear = Math.min(...startDates);
  const currentYear = new Date().getFullYear();

  // Initial calculation
  const years = currentYear - earliestYear;

  return Math.max(0, years);
}

/**
 * Research Metrics
 * Note: Grant count is currently manual until we have a proper data source.
 */
export const RESEARCH_METRICS = {
  GRANTS_COUNT: 4, // Pending: Add granular grant data in future
  AREAS_COUNT: researchInterests.length,
};

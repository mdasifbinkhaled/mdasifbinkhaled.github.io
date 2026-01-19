import { describe, it, expect } from 'vitest';
import {
  quickFacts,
  highlights,
  certifications,
  honorsAndAwards,
  professionalService,
} from '@/shared/lib/data/about';
import {
  allTeachingActivities,
  teachingSupportRoles,
  workshopsAndSeminars,
  getActivitiesByType,
  getActivityCount,
} from '@/shared/lib/data/activities';
import {
  researchInterests,
  getResearchInterests,
} from '@/shared/lib/data/research-interests';
import { getTeachingStats } from '@/shared/lib/data/teaching-stats';

describe('Data Integrity Checks', () => {
  describe('About Data (about.ts)', () => {
    it('should have valid quick facts', () => {
      expect(quickFacts.length).toBeGreaterThan(0);
      quickFacts.forEach((fact) => {
        expect(fact.id).toBeDefined();
        expect(fact.label).toBeTruthy();
        expect(fact.value).toBeTruthy();
        expect(fact.icon).toBeDefined();
      });
    });

    it('should have valid highlights', () => {
      expect(highlights.length).toBeGreaterThan(0);
      highlights.forEach((hl) => {
        expect(hl.id).toBeDefined();
        expect(hl.value).toBeTruthy();
        expect(hl.label).toBeTruthy();
      });
    });

    it('should have certifications with proper dates', () => {
      expect(certifications.length).toBeGreaterThan(0);
      certifications.forEach((cert) => {
        expect(cert.id).toMatch(/^cert-/);
        expect(cert.title).toBeTruthy();
        expect(cert.institution).toBeTruthy();
        expect(cert.date).toBeTruthy();
      });
    });

    it('should have honors and awards', () => {
      expect(honorsAndAwards.length).toBeGreaterThan(0);
      honorsAndAwards.forEach((award) => {
        expect(award.id).toMatch(/^award-/);
        expect(award.title).toBeTruthy();
        expect(award.icon).toBeDefined();
      });
    });

    it('should have professional service records', () => {
      expect(professionalService.length).toBeGreaterThan(0);
      professionalService.forEach((svc) => {
        expect(svc.id).toMatch(/^svc-/);
        expect(svc.role || svc.title).toBeTruthy(); // svc uses title in interface but acts as role
        expect(svc.organization).toBeTruthy();
      });
    });
  });

  describe('Activities Data (activities.ts)', () => {
    it('should combine support roles and workshops correctly', () => {
      const totalActivities =
        teachingSupportRoles.length + workshopsAndSeminars.length;
      expect(allTeachingActivities.length).toBe(totalActivities);
      expect(getActivityCount()).toBe(totalActivities);
    });

    it('should filter activities by type correctly', () => {
      const supportActivities = getActivitiesByType('support');
      expect(supportActivities.length).toBe(teachingSupportRoles.length);
      expect(supportActivities.every((a) => a.type === 'support')).toBe(true);

      const workshopActivities = getActivitiesByType('workshop');
      const seminarActivities = getActivitiesByType('seminar');

      // Verify workshopsAndSeminars contains only workshops and seminars
      const wsCount = workshopsAndSeminars.filter(
        (a) => a.type === 'workshop'
      ).length;
      const semCount = workshopsAndSeminars.filter(
        (a) => a.type === 'seminar'
      ).length;

      expect(workshopActivities.length).toBe(wsCount);
      expect(seminarActivities.length).toBe(semCount);
    });

    it('should have valid structure for all activities', () => {
      allTeachingActivities.forEach((activity) => {
        expect(activity.id).toBeDefined();
        expect(activity.title).toBeTruthy();
        expect(activity.institution).toBeTruthy();
        expect(activity.type).toMatch(/support|workshop|seminar/);
      });
    });
  });

  describe('Research Interests (research-interests.ts)', () => {
    it('should have defined research interests', () => {
      expect(researchInterests.length).toBeGreaterThan(0);
      expect(getResearchInterests()).toEqual(researchInterests);
    });

    it('should display valid metadata for each interest', () => {
      researchInterests.forEach((interest) => {
        expect(interest.id).toBeTruthy();
        expect(interest.title).toBeTruthy();
        expect(interest.description.length).toBeGreaterThan(10);
        expect(interest.icon).toBeDefined();
      });
    });
  });

  describe('Teaching Stats (teaching-stats.ts)', () => {
    it('should return non-negative statistical values', () => {
      const stats = getTeachingStats();
      expect(stats.totalStudents).toBeGreaterThanOrEqual(0);
      expect(stats.totalCourses).toBeGreaterThanOrEqual(0);
      expect(stats.averageRating).toBeGreaterThan(0);
      expect(stats.averageRating).toBeLessThanOrEqual(5);
      expect(stats.yearsTeaching).toBeGreaterThan(0);
    });
  });
});

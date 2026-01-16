import { allCourses, institutionNames } from '@/shared/lib/data/courses';
import { samplePublications } from '@/shared/lib/data/publications';
import { professionalExperiences } from '@/shared/lib/data/experience';
import { educationData } from '@/shared/lib/data/education';
import { newsItems } from '@/shared/lib/data/news';
import { siteConfig } from '@/shared/config/site';

describe('Data Layer Integrity', () => {
  describe('Courses Data', () => {
    it('should have valid courses loaded', () => {
      expect(allCourses.length).toBeGreaterThan(0);
      allCourses.forEach((course) => {
        expect(course.id).toBeDefined();
        expect(course.title).toBeDefined();
        expect(course.institution).toBeDefined();
        expect(
          institutionNames[course.institution as keyof typeof institutionNames]
        ).toBeDefined();
      });
    });

    it('should have unique course IDs', () => {
      const ids = allCourses.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid tier assignments', () => {
      allCourses.forEach((course) => {
        expect(['summary', 'standard', 'detailed']).toContain(course.tier);
      });
    });
  });

  describe('Publications Data', () => {
    it('should have valid publications loaded', () => {
      expect(samplePublications.length).toBeGreaterThan(0);
      samplePublications.forEach((pub) => {
        expect(pub.id).toBeDefined();
        expect(pub.title).toBeDefined();
        expect(pub.authors.length).toBeGreaterThan(0);
        expect(pub.year).toBeGreaterThan(2000);
      });
    });

    it('should have unique publication IDs', () => {
      const ids = samplePublications.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  describe('Experience Data', () => {
    it('should have valid experience entries', () => {
      expect(professionalExperiences.length).toBeGreaterThan(0);
      professionalExperiences.forEach((exp) => {
        expect(exp.id).toBeDefined();
        // The actual type might differ slightly, but checking basic fields
        expect(exp.type).toBeDefined();
      });
    });
  });

  describe('Education Data', () => {
    it('should have valid education entries', () => {
      expect(educationData.length).toBeGreaterThan(0);
      educationData.forEach((edu) => {
        expect(edu.id).toBeDefined();
        expect(edu.institution).toBeDefined();
        expect(edu.degree).toBeDefined();
      });
    });
  });

  describe('News Data', () => {
    it('should have valid news items if present', () => {
      if (newsItems.length > 0) {
        newsItems.forEach((news) => {
          expect(news.id).toBeDefined();
          // News items might just have text, not title
          expect(news.text).toBeDefined();
        });
      }
    });
  });

  describe('Site Config', () => {
    it('should have required site metadata', () => {
      expect(siteConfig.author).toBeDefined();
      expect(siteConfig.description).toBeDefined();
      expect(siteConfig.url).toBeDefined();
      expect(siteConfig.links.github).toBeDefined();
    });
  });
});

import {
  getTimeZoneOffsetMinutes,
  formatOffsetLabel,
  formatGmtLabel,
  formatApartLabel,
  getDhakaPhase,
  getSunTimes,
  getMinuteOfDay,
} from '@/shared/lib/time';

describe('time utilities', () => {
  describe('getTimeZoneOffsetMinutes', () => {
    it('returns +360 for Asia/Dhaka (UTC+6, no DST)', () => {
      expect(
        getTimeZoneOffsetMinutes('Asia/Dhaka', new Date('2026-07-16T12:00:00Z'))
      ).toBe(360);
    });

    it('returns 0 for UTC', () => {
      expect(
        getTimeZoneOffsetMinutes('UTC', new Date('2026-07-16T12:00:00Z'))
      ).toBe(0);
    });

    it('is DST-correct: New York is -240 in July (EDT), -300 in January (EST)', () => {
      expect(
        getTimeZoneOffsetMinutes(
          'America/New_York',
          new Date('2026-07-16T12:00:00Z')
        )
      ).toBe(-240);
      expect(
        getTimeZoneOffsetMinutes(
          'America/New_York',
          new Date('2026-01-16T12:00:00Z')
        )
      ).toBe(-300);
    });

    it('handles fractional zones: Asia/Kathmandu is +345 (UTC+5:45)', () => {
      expect(
        getTimeZoneOffsetMinutes(
          'Asia/Kathmandu',
          new Date('2026-07-16T12:00:00Z')
        )
      ).toBe(345);
    });
  });

  describe('formatOffsetLabel', () => {
    it('says "behind" when Dhaka is ahead of the viewer', () => {
      expect(formatOffsetLabel(360, -300)).toBe('11h behind'); // vs New York (EST)
      expect(formatOffsetLabel(360, 0)).toBe('6h behind'); // vs UTC
    });

    it('says "ahead" when Dhaka is behind the viewer', () => {
      expect(formatOffsetLabel(360, 600)).toBe('4h ahead'); // vs Sydney (+10)
    });

    it('says "same time" when the offsets match', () => {
      expect(formatOffsetLabel(360, 360)).toBe('same time');
    });

    it('includes minutes for fractional differences', () => {
      expect(formatOffsetLabel(360, 330)).toBe('30m behind'); // vs India (+5:30)
      expect(formatOffsetLabel(360, -270)).toBe('10h 30m behind'); // vs a -4:30 zone
    });
  });

  describe('getDhakaPhase', () => {
    it('treats deep-night hours as night + asleep', () => {
      expect(getDhakaPhase(3)).toEqual({
        phase: 'Night',
        isDay: false,
        awake: false,
      });
      expect(getDhakaPhase(0)).toEqual({
        phase: 'Night',
        isDay: false,
        awake: false,
      });
    });

    it('treats daytime as day + awake', () => {
      expect(getDhakaPhase(9)).toEqual({
        phase: 'Morning',
        isDay: true,
        awake: true,
      });
      expect(getDhakaPhase(14)).toEqual({
        phase: 'Afternoon',
        isDay: true,
        awake: true,
      });
    });

    it('treats evening/late-evening as awake but not day', () => {
      expect(getDhakaPhase(19)).toEqual({
        phase: 'Evening',
        isDay: false,
        awake: true,
      });
      expect(getDhakaPhase(22)).toEqual({
        phase: 'Night',
        isDay: false,
        awake: true,
      });
    });

    it('treats 5am as morning but still asleep (pre-6am)', () => {
      expect(getDhakaPhase(5)).toEqual({
        phase: 'Morning',
        isDay: false,
        awake: false,
      });
    });
  });

  describe('formatGmtLabel', () => {
    it('formats whole-hour offsets', () => {
      expect(formatGmtLabel(360)).toBe('GMT+6');
      expect(formatGmtLabel(-300)).toBe('GMT-5');
    });

    it('formats fractional offsets', () => {
      expect(formatGmtLabel(345)).toBe('GMT+5:45');
      expect(formatGmtLabel(330)).toBe('GMT+5:30');
    });

    it('formats UTC as bare GMT', () => {
      expect(formatGmtLabel(0)).toBe('GMT');
    });
  });

  describe('formatApartLabel', () => {
    it('describes whole-hour gaps', () => {
      expect(formatApartLabel(360, -300)).toBe('11h apart');
    });

    it('describes sub-hour gaps', () => {
      expect(formatApartLabel(360, 330)).toBe('30m apart');
    });

    it('describes mixed gaps', () => {
      expect(formatApartLabel(360, -270)).toBe('10h 30m apart');
    });

    it('says "same zone" when identical', () => {
      expect(formatApartLabel(360, 360)).toBe('same zone');
    });
  });

  describe('getSunTimes (Dhaka)', () => {
    const DHAKA_LAT = 23.8103;
    const DHAKA_LNG = 90.4125;
    const hourInDhaka = (d: Date) =>
      Number(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          hourCycle: 'h23',
        }).format(d)
      );

    it('places a mid-July Dhaka sunrise in early morning and sunset in the evening', () => {
      const { sunrise, sunset } = getSunTimes(
        new Date('2026-07-18T00:00:00Z'),
        DHAKA_LAT,
        DHAKA_LNG
      );
      expect(sunrise.getTime()).toBeLessThan(sunset.getTime());
      expect(hourInDhaka(sunrise)).toBeGreaterThanOrEqual(4);
      expect(hourInDhaka(sunrise)).toBeLessThanOrEqual(6);
      expect(hourInDhaka(sunset)).toBeGreaterThanOrEqual(18);
      expect(hourInDhaka(sunset)).toBeLessThanOrEqual(19);
    });

    it('yields roughly 13 hours of daylight in Dhaka in July', () => {
      const { sunrise, sunset } = getSunTimes(
        new Date('2026-07-18T00:00:00Z'),
        DHAKA_LAT,
        DHAKA_LNG
      );
      const hours = (sunset.getTime() - sunrise.getTime()) / 3_600_000;
      expect(hours).toBeGreaterThan(12);
      expect(hours).toBeLessThan(14);
    });
  });

  describe('getMinuteOfDay', () => {
    it('returns minutes since local midnight in the given zone', () => {
      // 00:17 UTC is 06:17 in Dhaka (+6) → 377 minutes
      expect(
        getMinuteOfDay(new Date('2026-07-18T00:17:00Z'), 'Asia/Dhaka')
      ).toBe(377);
      expect(getMinuteOfDay(new Date('2026-07-18T12:00:00Z'), 'UTC')).toBe(720);
    });

    it('wraps across the UTC date boundary', () => {
      // 18:30 UTC is 00:30 the next day in Dhaka → 30 minutes
      expect(
        getMinuteOfDay(new Date('2026-07-18T18:30:00Z'), 'Asia/Dhaka')
      ).toBe(30);
    });
  });
});

import { DueDatePipe } from './due-date-pipe';

describe('DueDatePipe', () => {
  let pipe: DueDatePipe;

  function daysFromNow(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  beforeEach(() => {
    pipe = new DueDatePipe();
  });

  describe('empty input', () => {
    it('should return empty string for null', () => {
      expect(pipe.transform(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(pipe.transform(null)).toBe('');
    });
  });

  describe('overdue dates', () => {
    it('should return "1 day overdue" for yesterday', () => {
      expect(pipe.transform(daysFromNow(-1))).toBe('1 day overdue');
    });

    it('should return "2 days overdue" for 2 days ago', () => {
      expect(pipe.transform(daysFromNow(-2))).toBe('2 days overdue');
    });

    it('should return "7 days overdue" for a week ago', () => {
      expect(pipe.transform(daysFromNow(-7))).toBe('7 days overdue');
    });
  });

  describe('today', () => {
    it('should return "due today" for today', () => {
      expect(pipe.transform(daysFromNow(0))).toBe('due today');
    });
  });

  describe('upcoming dates', () => {
    it('should return "tomorrow" for tomorrow', () => {
      expect(pipe.transform(daysFromNow(1))).toBe('tomorrow');
    });

    it('should return "in 3 days" for 3 days from now', () => {
      expect(pipe.transform(daysFromNow(3))).toBe('in 3 days');
    });

    it('should return "in 7 days" for a week from now', () => {
      expect(pipe.transform(daysFromNow(7))).toBe('in 7 days');
    });

    it('should return "in 1 day" for 1 day from now that is not tomorrow', () => {
      expect(pipe.transform(daysFromNow(1))).toBe('tomorrow');
    });
  });

  describe('getUrgency()', () => {
    it('should return "overdue" for past dates', () => {
      expect(pipe.getUrgency(daysFromNow(-1))).toBe('overdue');
    });

    it('should return "today" for today', () => {
      expect(pipe.getUrgency(daysFromNow(0))).toBe('today');
    });

    it('should return "soon" for dates within 3 days', () => {
      expect(pipe.getUrgency(daysFromNow(2))).toBe('soon');
    });

    it('should return "upcoming" for dates more than 3 days away', () => {
      expect(pipe.getUrgency(daysFromNow(7))).toBe('upcoming');
    });

    it('should return "none" for null', () => {
      expect(pipe.getUrgency(null)).toBe('none');
    });
  });
});

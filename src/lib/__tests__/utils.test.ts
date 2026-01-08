import {
  cn,
  formatDate,
  formatTime,
  calculateDuration,
  generateTimeSlots,
  isPastDate,
  getAvailableDates,
  isValidEmail,
  generateId,
  capitalize,
  truncate
} from '../utils'

describe('Utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
      expect(cn('class1', undefined, 'class2')).toBe('class1 class2')
      expect(cn()).toBe('')
    })
  })

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2024-01-15'
      const formatted = formatDate(date)
      expect(formatted).toBe('January 15, 2024')
    })

    it('accepts custom options', () => {
      const date = '2024-01-15'
      const formatted = formatDate(date, { month: 'short', day: 'numeric' })
      expect(formatted).toBe('Jan 15, 2024')
    })
  })

  describe('formatTime', () => {
    it('formats time correctly', () => {
      expect(formatTime('14:30')).toBe('2:30 PM')
      expect(formatTime('09:00')).toBe('9:00 AM')
      expect(formatTime('12:00')).toBe('12:00 PM')
    })
  })

  describe('calculateDuration', () => {
    it('calculates duration in minutes', () => {
      expect(calculateDuration('09:00', '10:30')).toBe(90)
      expect(calculateDuration('14:00', '15:00')).toBe(60)
      expect(calculateDuration('09:30', '10:00')).toBe(30)
    })
  })

  describe('generateTimeSlots', () => {
    it('generates time slots correctly', () => {
      const slots = generateTimeSlots('09:00', '11:00', 30)
      expect(slots).toEqual(['09:00', '09:30', '10:00', '10:30'])
    })

    it('includes buffer time', () => {
      const slots = generateTimeSlots('09:00', '10:30', 30, 15)
      expect(slots).toEqual(['09:00', '09:45'])
    })

    it('handles edge cases', () => {
      const slots = generateTimeSlots('09:00', '09:30', 60)
      expect(slots).toEqual([])
    })
  })

  describe('isPastDate', () => {
    it('identifies past dates correctly', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 1)
      
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      
      expect(isPastDate(pastDate)).toBe(true)
      expect(isPastDate(futureDate)).toBe(false)
    })
  })

  describe('getAvailableDates', () => {
    it('generates available dates', () => {
      const dates = getAvailableDates(5)
      expect(dates).toHaveLength(5)
      
      // All dates should be in the future
      dates.forEach(date => {
        expect(isPastDate(date)).toBe(false)
      })
    })

    it('excludes weekends when specified', () => {
      const dates = getAvailableDates(10, true)
      
      dates.forEach(date => {
        const dayOfWeek = new Date(date).getDay()
        expect(dayOfWeek).not.toBe(0) // Sunday
        expect(dayOfWeek).not.toBe(6) // Saturday
      })
    })

    it('filters by available days', () => {
      const availableDays = ['Monday', 'Wednesday', 'Friday']
      const dates = getAvailableDates(10, false, availableDays)
      
      dates.forEach(date => {
        const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
        expect(availableDays).toContain(dayName)
      })
    })
  })

  describe('isValidEmail', () => {
    it('validates email addresses correctly', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true)
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
    })
  })

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('WORLD')).toBe('WORLD')
      expect(capitalize('a')).toBe('A')
      expect(capitalize('')).toBe('')
    })
  })

  describe('truncate', () => {
    it('truncates text correctly', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...')
      expect(truncate('Short', 10)).toBe('Short')
      expect(truncate('Exactly ten', 10)).toBe('Exactly ten')
      expect(truncate('', 5)).toBe('')
    })
  })
})
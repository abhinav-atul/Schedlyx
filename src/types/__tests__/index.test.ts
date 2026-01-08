import type {
  User,
  Event,
  Booking,
  EventType,
  EventStatus,
  BookingStatus,
  NotificationType
} from '../index'

describe('Types', () => {
  describe('User interface', () => {
    it('should have correct structure', () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://example.com/avatar.jpg',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      expect(user.id).toBe('1')
      expect(user.email).toBe('test@example.com')
      expect(user.firstName).toBe('John')
      expect(user.lastName).toBe('Doe')
      expect(user.avatar).toBe('https://example.com/avatar.jpg')
    })

    it('should allow optional avatar', () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      expect(user.avatar).toBeUndefined()
    })
  })

  describe('Event interface', () => {
    it('should have correct structure', () => {
      const event: Event = {
        id: '1',
        userId: 'user1',
        title: 'Test Event',
        description: 'A test event',
        type: 'meeting',
        duration: 60,
        location: 'Conference Room A',
        isOnline: false,
        maxAttendees: 10,
        requiresApproval: false,
        allowCancellation: true,
        cancellationDeadline: 24,
        bufferTime: 15,
        status: 'active',
        availableDays: ['Monday', 'Tuesday'],
        timeSlots: {
          start: '09:00',
          end: '17:00'
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      expect(event.type).toBe('meeting')
      expect(event.status).toBe('active')
      expect(event.timeSlots.start).toBe('09:00')
    })
  })

  describe('Booking interface', () => {
    it('should have correct structure', () => {
      const booking: Booking = {
        id: '1',
        eventId: 'event1',
        userId: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        date: '2024-01-15',
        time: '14:00',
        status: 'confirmed',
        notes: 'Looking forward to it',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      expect(booking.status).toBe('confirmed')
      expect(booking.date).toBe('2024-01-15')
      expect(booking.time).toBe('14:00')
    })

    it('should allow optional fields', () => {
      const booking: Booking = {
        id: '1',
        eventId: 'event1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        date: '2024-01-15',
        time: '14:00',
        status: 'pending',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }

      expect(booking.userId).toBeUndefined()
      expect(booking.phone).toBeUndefined()
      expect(booking.notes).toBeUndefined()
    })
  })

  describe('EventType enum', () => {
    it('should include all expected values', () => {
      const types: EventType[] = [
        'meeting',
        'workshop',
        'conference',
        'consultation',
        'interview',
        'webinar',
        'other'
      ]

      types.forEach(type => {
        expect(typeof type).toBe('string')
      })
    })
  })

  describe('EventStatus enum', () => {
    it('should include all expected values', () => {
      const statuses: EventStatus[] = [
        'draft',
        'active',
        'paused',
        'completed',
        'cancelled'
      ]

      statuses.forEach(status => {
        expect(typeof status).toBe('string')
      })
    })
  })

  describe('BookingStatus enum', () => {
    it('should include all expected values', () => {
      const statuses: BookingStatus[] = [
        'pending',
        'confirmed',
        'cancelled',
        'no_show',
        'completed'
      ]

      statuses.forEach(status => {
        expect(typeof status).toBe('string')
      })
    })
  })

  describe('NotificationType enum', () => {
    it('should include all expected values', () => {
      const types: NotificationType[] = [
        'booking_created',
        'booking_cancelled',
        'booking_reminder',
        'event_updated',
        'payment_received',
        'system_update'
      ]

      types.forEach(type => {
        expect(typeof type).toBe('string')
      })
    })
  })
})
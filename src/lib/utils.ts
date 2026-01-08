import { type ClassValue, clsx } from 'clsx'

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

/**
 * Format time to readable string
 */
export function formatTime(time: string) {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

/**
 * Calculate duration between two times
 */
export function calculateDuration(startTime: string, endTime: string): number {
  const start = new Date(`2000-01-01T${startTime}`)
  const end = new Date(`2000-01-01T${endTime}`)
  return (end.getTime() - start.getTime()) / (1000 * 60) // Return minutes
}

/**
 * Generate time slots for a given duration
 */
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number,
  bufferTime: number = 0
): string[] {
  const slots: string[] = []
  const start = new Date(`2000-01-01T${startTime}`)
  const end = new Date(`2000-01-01T${endTime}`)
  const slotDuration = (duration + bufferTime) * 60 * 1000 // Convert to milliseconds

  let current = new Date(start)
  while (current.getTime() + (duration * 60 * 1000) <= end.getTime()) {
    slots.push(current.toTimeString().slice(0, 5))
    current = new Date(current.getTime() + slotDuration)
  }

  return slots
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: string | Date): boolean {
  return new Date(date) < new Date()
}

/**
 * Get available dates for the next N days
 */
export function getAvailableDates(
  days: number = 30,
  excludeWeekends: boolean = false,
  availableDays?: string[]
): string[] {
  const dates: string[] = []
  const today = new Date()
  
  for (let i = 1; i <= days; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
    
    // Skip weekends if specified
    if (excludeWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
      continue
    }
    
    // Check if day is in available days
    if (availableDays && !availableDays.includes(dayName)) {
      continue
    }
    
    dates.push(date.toISOString().split('T')[0])
  }
  
  return dates
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from '../Dashboard'

const DashboardWithRouter = () => (
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>
)

describe('Dashboard', () => {
  it('renders dashboard header', () => {
    render(<DashboardWithRouter />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText(/Welcome back! Here's what's happening/)).toBeInTheDocument()
  })

  it('renders create event button', () => {
    render(<DashboardWithRouter />)
    
    const createEventButtons = screen.getAllByText('Create Event')
    expect(createEventButtons.length).toBeGreaterThan(0)
    
    // Check that at least one button links to create-event
    const createEventLink = createEventButtons[0].closest('a')
    expect(createEventLink).toHaveAttribute('href', '/create-event')
  })

  it('renders stats cards', () => {
    render(<DashboardWithRouter />)
    
    expect(screen.getByText('Total Events')).toBeInTheDocument()
    expect(screen.getByText('Total Bookings')).toBeInTheDocument()
    expect(screen.getByText('This Month')).toBeInTheDocument()
  })

  it('renders recent events section', () => {
    render(<DashboardWithRouter />)
    
    expect(screen.getByText('Recent Events')).toBeInTheDocument()
    expect(screen.getByText('View all')).toBeInTheDocument()
    
    // Check for mock events
    expect(screen.getByText('Team Standup')).toBeInTheDocument()
    expect(screen.getByText('Product Demo')).toBeInTheDocument()
    expect(screen.getByText('Workshop: React Basics')).toBeInTheDocument()
  })

  it('renders quick actions section', () => {
    render(<DashboardWithRouter />)
    
    expect(screen.getByText('Set up a new event or booking page')).toBeInTheDocument()
    expect(screen.getByText('Edit and organize your events')).toBeInTheDocument()
    expect(screen.getByText('View detailed insights and reports')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    render(<DashboardWithRouter />)
    
    const viewAllLink = screen.getByText('View all').closest('a')
    expect(viewAllLink).toHaveAttribute('href', '/admin/events')
    
    const manageEventsLink = screen.getByText('Manage Events').closest('a')
    expect(manageEventsLink).toHaveAttribute('href', '/admin/events')
    
    const analyticsLink = screen.getByText('Analytics').closest('a')
    expect(analyticsLink).toHaveAttribute('href', '/analytics')
  })

  it('displays event status badges', () => {
    render(<DashboardWithRouter />)
    
    expect(screen.getByText('active')).toBeInTheDocument()
    expect(screen.getByText('draft')).toBeInTheDocument()
  })
})
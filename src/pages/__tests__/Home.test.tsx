import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from '../Home'

const HomeWithRouter = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
)

describe('Home', () => {
  it('renders the hero section', () => {
    render(<HomeWithRouter />)
    
    expect(screen.getByText('Smart Scheduling')).toBeInTheDocument()
    expect(screen.getByText('Made Simple')).toBeInTheDocument()
    expect(screen.getByText(/The open-source platform that combines/)).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<HomeWithRouter />)
    
    const getStartedButton = screen.getByText('Get Started Free')
    const viewDemoButton = screen.getByText('View Demo')
    
    expect(getStartedButton).toBeInTheDocument()
    expect(viewDemoButton).toBeInTheDocument()
    
    expect(getStartedButton.closest('a')).toHaveAttribute('href', '/signup')
    expect(viewDemoButton.closest('a')).toHaveAttribute('href', '/demo')
  })

  it('renders feature cards', () => {
    render(<HomeWithRouter />)
    
    expect(screen.getByText('Smart Scheduling')).toBeInTheDocument()
    expect(screen.getByText('Event Management')).toBeInTheDocument()
    expect(screen.getByText('Calendar Sync')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<HomeWithRouter />)
    
    expect(screen.getByText(/AI-powered time slot suggestions/)).toBeInTheDocument()
    expect(screen.getByText(/Create, manage, and track events/)).toBeInTheDocument()
    expect(screen.getByText(/Two-way synchronization with Google Calendar/)).toBeInTheDocument()
    expect(screen.getByText(/Track bookings, attendance, and engagement/)).toBeInTheDocument()
  })

  it('renders the CTA section', () => {
    render(<HomeWithRouter />)
    
    expect(screen.getByText('Ready to streamline your scheduling?')).toBeInTheDocument()
    expect(screen.getByText(/Join thousands of users who trust Schedlyx/)).toBeInTheDocument()
    
    const ctaButton = screen.getByText('Start Free Today')
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/signup')
  })
})
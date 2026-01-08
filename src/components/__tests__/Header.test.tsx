import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../Header'

const HeaderWithRouter = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
)

describe('Header', () => {
  it('renders the logo and brand name', () => {
    render(<HeaderWithRouter />)
    
    expect(screen.getByText('Schedlyx')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<HeaderWithRouter />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Create Event')).toBeInTheDocument()
    expect(screen.getByText('Manage Events')).toBeInTheDocument()
  })

  it('renders authentication links', () => {
    render(<HeaderWithRouter />)
    
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    render(<HeaderWithRouter />)
    
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    const createEventLink = screen.getByText('Create Event').closest('a')
    const manageEventsLink = screen.getByText('Manage Events').closest('a')
    
    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
    expect(createEventLink).toHaveAttribute('href', '/create-event')
    expect(manageEventsLink).toHaveAttribute('href', '/admin/events')
  })
})
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// Mock the pages to avoid complex dependencies
jest.mock('../pages/Home', () => ({
  Home: () => <div data-testid="home-page">Home Page</div>
}))

jest.mock('../pages/Login', () => ({
  Login: () => <div data-testid="login-page">Login Page</div>
}))

jest.mock('../pages/Signup', () => ({
  Signup: () => <div data-testid="signup-page">Signup Page</div>
}))

jest.mock('../pages/Dashboard', () => ({
  Dashboard: () => <div data-testid="dashboard-page">Dashboard Page</div>
}))

jest.mock('../pages/CreateEvent', () => ({
  CreateEvent: () => <div data-testid="create-event-page">Create Event Page</div>
}))

jest.mock('../pages/PublicEventPage', () => ({
  PublicEventPage: () => <div data-testid="public-event-page">Public Event Page</div>
}))

jest.mock('../pages/BookingPage', () => ({
  BookingPage: () => <div data-testid="booking-page">Booking Page</div>
}))

jest.mock('../pages/AdminEventManager', () => ({
  AdminEventManager: () => <div data-testid="admin-event-manager-page">Admin Event Manager Page</div>
}))

const AppWithRouter = ({ initialEntries = ['/'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <App />
  </MemoryRouter>
)

describe('App', () => {
  it('renders home page on root route', () => {
    render(<AppWithRouter />)
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders login page on /login route', () => {
    render(<AppWithRouter initialEntries={['/login']} />)
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  })

  it('renders signup page on /signup route', () => {
    render(<AppWithRouter initialEntries={['/signup']} />)
    expect(screen.getByTestId('signup-page')).toBeInTheDocument()
  })

  it('renders dashboard page on /dashboard route', () => {
    render(<AppWithRouter initialEntries={['/dashboard']} />)
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
  })

  it('renders create event page on /create-event route', () => {
    render(<AppWithRouter initialEntries={['/create-event']} />)
    expect(screen.getByTestId('create-event-page')).toBeInTheDocument()
  })

  it('renders public event page on /event/:eventId route', () => {
    render(<AppWithRouter initialEntries={['/event/123']} />)
    expect(screen.getByTestId('public-event-page')).toBeInTheDocument()
  })

  it('renders booking page on /book/:eventId route', () => {
    render(<AppWithRouter initialEntries={['/book/123']} />)
    expect(screen.getByTestId('booking-page')).toBeInTheDocument()
  })

  it('renders admin event manager page on /admin/events route', () => {
    render(<AppWithRouter initialEntries={['/admin/events']} />)
    expect(screen.getByTestId('admin-event-manager-page')).toBeInTheDocument()
  })

  it('renders layout components', () => {
    render(<AppWithRouter />)
    
    // Check that header and footer are rendered (they contain specific text)
    expect(screen.getByText('Schedlyx')).toBeInTheDocument() // From Header
    expect(screen.getByText(/© 2024 Schedlyx/)).toBeInTheDocument() // From Footer
  })
})
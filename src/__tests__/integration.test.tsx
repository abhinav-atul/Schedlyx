import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Integration tests to ensure the app works end-to-end
describe('Integration Tests', () => {
  const AppWithRouter = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  it('navigates from home to signup', async () => {
    const user = userEvent.setup()
    render(<AppWithRouter />)
    
    // Should start on home page
    expect(screen.getByText('Smart Scheduling')).toBeInTheDocument()
    
    // Click signup button
    const signupButton = screen.getByText('Sign Up')
    await user.click(signupButton)
    
    // Should navigate to signup page
    await waitFor(() => {
      expect(screen.getByText('Create your account')).toBeInTheDocument()
    })
  })

  it('navigates from home to login', async () => {
    const user = userEvent.setup()
    render(<AppWithRouter />)
    
    // Click login button
    const loginButton = screen.getByText('Login')
    await user.click(loginButton)
    
    // Should navigate to login page
    await waitFor(() => {
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    })
  })

  it('renders header and footer on all pages', async () => {
    const user = userEvent.setup()
    render(<AppWithRouter />)
    
    // Header should be present
    expect(screen.getByText('Schedlyx')).toBeInTheDocument()
    
    // Footer should be present
    expect(screen.getByText(/© 2024 Schedlyx/)).toBeInTheDocument()
    
    // Navigate to login and check header/footer still present
    const loginButton = screen.getByText('Login')
    await user.click(loginButton)
    
    await waitFor(() => {
      expect(screen.getByText('Schedlyx')).toBeInTheDocument()
      expect(screen.getByText(/© 2024 Schedlyx/)).toBeInTheDocument()
    })
  })

  it('handles navigation through dashboard flow', async () => {
    const user = userEvent.setup()
    render(<AppWithRouter />)
    
    // Navigate to dashboard via header
    const dashboardLink = screen.getByText('Dashboard')
    await user.click(dashboardLink)
    
    await waitFor(() => {
      expect(screen.getByText('Welcome back! Here\'s what\'s happening')).toBeInTheDocument()
    })
    
    // Navigate to create event from dashboard
    const createEventButton = screen.getAllByText('Create Event')[0]
    await user.click(createEventButton)
    
    await waitFor(() => {
      expect(screen.getByText('Create New Event')).toBeInTheDocument()
    })
  })

  it('renders responsive layout correctly', () => {
    render(<AppWithRouter />)
    
    // Check that responsive classes are applied
    const header = screen.getByText('Schedlyx').closest('header')
    expect(header).toHaveClass('bg-white', 'shadow-sm')
    
    // Check main content area
    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex-1')
  })

  it('handles form interactions correctly', async () => {
    const user = userEvent.setup()
    render(<AppWithRouter />)
    
    // Navigate to login
    const loginButton = screen.getByText('Login')
    await user.click(loginButton)
    
    await waitFor(() => {
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    })
    
    // Fill out form
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('displays error boundaries gracefully', () => {
    // This test ensures the app doesn't crash completely
    render(<AppWithRouter />)
    
    // App should render without throwing
    expect(screen.getByText('Schedlyx')).toBeInTheDocument()
  })
})
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Login } from '../Login'

const LoginWithRouter = () => (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
)

describe('Login', () => {
  it('renders login form', () => {
    render(<LoginWithRouter />)
    
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders signup link', () => {
    render(<LoginWithRouter />)
    
    const signupLink = screen.getByText('create a new account')
    expect(signupLink.closest('a')).toHaveAttribute('href', '/signup')
  })

  it('renders forgot password link', () => {
    render(<LoginWithRouter />)
    
    const forgotPasswordLink = screen.getByText('Forgot your password?')
    expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', '/forgot-password')
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<LoginWithRouter />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByRole('button', { name: '' }) // Eye icon button
    
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('handles form input changes', async () => {
    const user = userEvent.setup()
    render(<LoginWithRouter />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('renders Google sign-in button', () => {
    render(<LoginWithRouter />)
    
    expect(screen.getByText('Google')).toBeInTheDocument()
  })

  it('renders remember me checkbox', () => {
    render(<LoginWithRouter />)
    
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    const user = userEvent.setup()
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    render(<LoginWithRouter />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
        email: 'test@example.com',
        password: 'password123'
      })
    })
    
    consoleSpy.mockRestore()
  })
})
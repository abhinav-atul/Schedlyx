import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Footer } from '../Footer'

const FooterWithRouter = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
)

describe('Footer', () => {
  it('renders all footer sections', () => {
    render(<FooterWithRouter />)
    
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Open Source')).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    render(<FooterWithRouter />)
    
    expect(screen.getByText(/© 2024 Schedlyx/)).toBeInTheDocument()
    expect(screen.getByText(/Open source under MIT License/)).toBeInTheDocument()
  })

  it('renders GitHub link with correct attributes', () => {
    render(<FooterWithRouter />)
    
    const githubLink = screen.getByText('GitHub').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/your-username/schedlyx')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders all product links', () => {
    render(<FooterWithRouter />)
    
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Integrations')).toBeInTheDocument()
  })
})
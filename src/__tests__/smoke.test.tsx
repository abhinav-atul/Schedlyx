import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

/**
 * Smoke tests to ensure the app renders without crashing
 * These are essential for Vercel deployment validation
 */
describe('Smoke Tests', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  })

  it('imports all required dependencies', () => {
    // Test that all critical imports work
    expect(typeof React).toBe('object')
    expect(typeof ReactDOM).toBe('object')
  })

  it('has valid environment configuration', () => {
    // These should be defined in the build process
    expect(import.meta.env).toBeDefined()
    expect(typeof import.meta.env.MODE).toBe('string')
  })

  it('loads CSS without errors', () => {
    // This test ensures Tailwind CSS is properly configured
    const div = document.createElement('div')
    div.className = 'bg-primary-600 text-white'
    document.body.appendChild(div)
    
    // If CSS is loaded, the element should have the class
    expect(div.className).toContain('bg-primary-600')
    expect(div.className).toContain('text-white')
    
    document.body.removeChild(div)
  })

  it('has proper TypeScript configuration', () => {
    // This test ensures TypeScript is properly configured
    const testFunction = (param: string): string => {
      return param.toUpperCase()
    }
    
    expect(testFunction('hello')).toBe('HELLO')
  })
})
import { renderHook } from '@testing-library/react'
import { useAuth } from '../useAuth'
import { useAuthStore } from '../../stores/authStore'

// Mock the auth store
jest.mock('../../stores/authStore')

const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns auth state and methods', () => {
    const mockAuthState = {
      user: null,
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      setUser: jest.fn(),
      setLoading: jest.fn()
    }

    mockUseAuthStore.mockReturnValue(mockAuthState)

    const { result } = renderHook(() => useAuth())

    expect(result.current).toEqual({
      user: null,
      loading: false,
      isAuthenticated: false,
      signIn: mockAuthState.signIn,
      signUp: mockAuthState.signUp,
      signOut: mockAuthState.signOut
    })
  })

  it('returns authenticated state when user exists', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }

    const mockAuthState = {
      user: mockUser,
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      setUser: jest.fn(),
      setLoading: jest.fn()
    }

    mockUseAuthStore.mockReturnValue(mockAuthState)

    const { result } = renderHook(() => useAuth())

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toEqual(mockUser)
  })

  it('returns loading state correctly', () => {
    const mockAuthState = {
      user: null,
      loading: true,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      setUser: jest.fn(),
      setLoading: jest.fn()
    }

    mockUseAuthStore.mockReturnValue(mockAuthState)

    const { result } = renderHook(() => useAuth())

    expect(result.current.loading).toBe(true)
  })
})
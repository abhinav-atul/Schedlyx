import { create } from 'zustand'
import { User } from '../types'
import { auth } from '../lib/supabase'

interface AuthState {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    set({ loading: true })
    try {
      const { data, error } = await auth.signIn(email, password)
      if (error) throw error
      
      if (data.user) {
        set({ 
          user: {
            id: data.user.id,
            email: data.user.email!,
            firstName: data.user.user_metadata?.firstName || '',
            lastName: data.user.user_metadata?.lastName || '',
            avatar: data.user.user_metadata?.avatar,
            createdAt: data.user.created_at,
            updatedAt: data.user.updated_at || data.user.created_at
          },
          loading: false 
        })
      }
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  signUp: async (email: string, password: string, metadata = {}) => {
    set({ loading: true })
    try {
      const { data, error } = await auth.signUp(email, password, metadata)
      if (error) throw error
      
      if (data.user) {
        set({ 
          user: {
            id: data.user.id,
            email: data.user.email!,
            firstName: metadata.firstName || '',
            lastName: metadata.lastName || '',
            avatar: metadata.avatar,
            createdAt: data.user.created_at,
            updatedAt: data.user.updated_at || data.user.created_at
          },
          loading: false 
        })
      }
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  signOut: async () => {
    set({ loading: true })
    try {
      await auth.signOut()
      set({ user: null, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  setUser: (user: User | null) => {
    set({ user })
  },

  setLoading: (loading: boolean) => {
    set({ loading })
  }
}))

// Initialize auth state
auth.getCurrentUser().then(({ data: { user } }) => {
  if (user) {
    useAuthStore.getState().setUser({
      id: user.id,
      email: user.email!,
      firstName: user.user_metadata?.firstName || '',
      lastName: user.user_metadata?.lastName || '',
      avatar: user.user_metadata?.avatar,
      createdAt: user.created_at,
      updatedAt: user.updated_at || user.created_at
    })
  }
  useAuthStore.getState().setLoading(false)
})

// Listen for auth changes
auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    useAuthStore.getState().setUser({
      id: session.user.id,
      email: session.user.email!,
      firstName: session.user.user_metadata?.firstName || '',
      lastName: session.user.user_metadata?.lastName || '',
      avatar: session.user.user_metadata?.avatar,
      createdAt: session.user.created_at,
      updatedAt: session.user.updated_at || session.user.created_at
    })
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.getState().setUser(null)
  }
})
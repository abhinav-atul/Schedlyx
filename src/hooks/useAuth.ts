import { useAuthStore } from '../stores/authStore'

export function useAuth() {
  const { user, loading, signIn, signUp, signOut } = useAuthStore()

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut
  }
}
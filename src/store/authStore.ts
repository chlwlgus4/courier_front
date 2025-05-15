import { create } from 'zustand'
import { User } from '@/commons/types'

interface AuthState {
  accessToken: string | null
  user: User | null
  setAccessToken: (token: string, user: User) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token, user) => set({ accessToken: token, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
}))

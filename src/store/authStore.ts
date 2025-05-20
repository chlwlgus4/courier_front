import { create } from 'zustand'
import { AuthState } from '@/commons/types'

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  initialized: false,
  setAccessToken: (token, user) => set({ accessToken: token, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
  setInitialized: (v) => set({ initialized: v }),
}))

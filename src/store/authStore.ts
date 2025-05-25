import { create } from 'zustand'
import { AuthState } from '@/commons/types'

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  initialized: false,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAuth: () => set({ accessToken: null }),
  setInitialized: (v) => set({ initialized: v }),
}))

import { create } from 'zustand'
import { UserState } from '@/commons/types'

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (v) => set({ user: v }),
  clearUser: () => set({ user: null }),
}))

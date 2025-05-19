import { create } from 'zustand'
import { OverseasState } from '@/app/overseas/types/overseas'

export const overseasStore = create<OverseasState>((set) => ({
  overseas: null,
  setOverseas: (overseas) => set({ overseas }),
}))

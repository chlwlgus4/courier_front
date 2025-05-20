import { create } from 'zustand'
import { OverseasState } from '@/app/(protected)/overseas/types/overseas'

export const overseasStore = create<OverseasState>((set) => ({
  overseas: {
    country: '',
    weight: 0,
    images: [],
    notes: '',
  },
  setOverseas: (overseas) => set({ overseas }),
}))

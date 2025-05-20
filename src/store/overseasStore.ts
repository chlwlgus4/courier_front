import { create } from 'zustand'
import { OverseasState } from '@/app/overseas/types/overseas'

export const overseasStore = create<OverseasState>((set) => ({
  overseas: {
    country: '',
    weight: 0,
    images: [],
    notes: '',
  },
  setOverseas: (overseas) => set({ overseas }),
}))

import { create } from 'zustand'
import { OverseasState } from '@/app/(protected)/overseas/types/overseas'

export const overseasStore = create<OverseasState>((set) => ({
  overseas: {
    type: '',
    originCountry: null,
    originCity: '',
    originPostal: '',
    destCountry: null,
    destCity: '',
    destPostal: '',
    weight: 0,
    images: [],
    notes: '',
    insuranceValue: 0,
  },
  setOverseas: (overseas) => set({ overseas }),
}))

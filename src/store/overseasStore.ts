import { create } from 'zustand'
import { OverseasState } from '@/app/(protected)/overseas/types/overseas'

export const overseasStore = create<OverseasState>((set) => ({
  overseas: {
    type: '',
    originCountry: null,
    originCity: '',
    originPostalCode: '',
    destCountry: null,
    destCity: '',
    destinationPostalCode: '',
    weight: 0,
    images: [],
    notes: '',
    insuranceValue: 0,
    originAddress: '',
    originAddressDetail: '',
    destAddress: '',
    destAddressDetail: '',
  },
  setOverseas: (newOverseas) =>
    set((state) => ({
      overseas: { ...state.overseas, ...newOverseas },
    })),
}))

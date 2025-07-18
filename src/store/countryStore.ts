import { create } from 'zustand'
import { CountryState } from '@/commons/types/country'

const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  setCountries: (v) => set({ countries: v }),
  isLoaded: false,
  setIsLoaded: (v) => set({ isLoaded: v }),
}))

export default useCountryStore

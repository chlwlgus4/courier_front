import { create } from 'zustand'
import { CountryState } from '@/commons/types/country'

const useCountryStore = create<CountryState>((set, get) => ({
  countries: [],
  setCountries: (v) => set({ countries: v }),
  isLoaded: false,
  setIsLoaded: (v) => set({ isLoaded: v }),
  getCountry: (id) =>
    get().countries.find((country) => country.id === Number(id)),
}))

export default useCountryStore

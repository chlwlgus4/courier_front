export interface Country {
  id: number
  nameKo: string
  nameEn: string
  callingCode: string
}

export interface CountryState {
  countries: Country[]
  setCountries: (countries: Country[]) => void
  isLoaded: boolean
  setIsLoaded: (v: boolean) => void
}

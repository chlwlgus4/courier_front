import { Country } from '@/commons/types'

export interface OverseasState {
  overseas: Overseas | null
  setOverseas: (o: Partial<Overseas>) => void
}

export type Overseas = {
  type?: string
  originCountry: Country | null
  originCity: string
  originPostal: string
  destCountry: Country | null
  destCity: string
  destPostal: string
  images?: File[]
  weight?: number
  notes?: string
  insuranceValue?: number
}

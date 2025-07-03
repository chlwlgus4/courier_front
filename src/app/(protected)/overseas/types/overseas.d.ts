import { Country } from '@/commons/types'

export interface OverseasState {
  overseas: Overseas
  setOverseas: (o: Partial<Overseas>) => void
}

export type Overseas = {
  type: string
  originCountry: Country | null
  originCity: string
  originPostalCode: string
  destCountry: Country | null
  destCity: string
  destinationPostalCode: string
  images?: File[]
  weight?: number
  notes?: string
  insuranceValue?: number
  originAddress: string
  originAddressDetail: string
  destAddress: string
  destAddressDetail: string
}

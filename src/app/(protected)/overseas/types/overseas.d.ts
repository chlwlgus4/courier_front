export interface OverseasState {
  overseas: Overseas | null
  setOverseas: (overseas: Overseas) => void
}

export type Overseas = {
  type?: string
  country?: string
  images?: File[]
  weight?: number
  notes?: string
  insuranceValue?: number
}

export interface OverseasState {
  overseas: Overseas | null
  setOverseas: (overseas: Overseas) => void
}

export type Overseas = {
  country?: string
  images?: File[]
  weight?: number
  notes?: string
}

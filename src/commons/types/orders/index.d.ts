export interface OrdersSaveRequest {
  shippingTypeCode: string
  weight: string
  insuranceValue: string
  originCountry: string
  originPostalCode: string
  originAddress: string
  originAddressDetail: string
  destinationCountry: string
  destinationPostalCode: string
  destinationAddress: string
  destinationAddressDetail: string
  notes: string
  images: File[] | undefined
}

export interface OrdersSaveResponse {
  id: number
}

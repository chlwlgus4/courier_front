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

export type Order = OrderGetResponse

export interface OrderGetResponse {
  shippingType: string
  weight: number // BigDecimal → number
  insuranceValue: number // BigDecimal → number
  status: OrderStatus
  originCountry: string
  destinationCountry: string
  originPostalCode: string
  originAddress: string
  originAddressDetail: string
  destinationPostalCode: string
  destinationAddress: string
  destinationAddressDetail: string
  notes: string
  images: OrderImageResponse[]
}

export interface OrderImageResponse {
  id: number // Long → number
  imagePath: string
  originalFilename: string
  fileSize: number // Long → number
  contentType: string
  imageOrder: number // Integer → number
  base64Data: string // Base64로 인코딩된 이미지 데이터
  createdDate: string // LocalDateTime → string (ISO 8601 format)
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderListResponse {
  orders: OrderGetResponse[]
  hasNext: boolean
  totalElements: number
  page: number
  size: number
}

export interface PaymentConfirmRequest {
  orderId: string
  paymentKey: string
  amount: string
}

export interface PaymentConfirmResponse {
  success: boolean
}

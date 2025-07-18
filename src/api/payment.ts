import {
  ApiResponse,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
} from '@/commons/types'
import { apiRequest } from '@/lib/fetcher'

export const paymentConfirm = async (
  params: PaymentConfirmRequest,
): Promise<ApiResponse<PaymentConfirmResponse>> => {
  return await apiRequest<PaymentConfirmResponse>({
    method: 'post',
    url: '/payment/confirm',
    data: params,
  })
}

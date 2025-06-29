import { ApiResponse } from '@/commons/types'
import { OrdersSaveRequest, OrdersSaveResponse } from '@/commons/types/orders'
import { apiRequest } from '@/lib/fetcher'

export async function saveOrders(
  params: OrdersSaveRequest,
): Promise<ApiResponse<OrdersSaveResponse> | null> {
  return await apiRequest<OrdersSaveResponse>({
    method: 'post',
    url: '/orders',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function getOrder(id: number): Promise<ApiResponse<any> | null> {
  return await apiRequest<any>({
    method: 'get',
    url: `/orders/${id}`,
  })
}

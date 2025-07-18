import { ApiResponse } from '@/commons/types'
import { Country } from '@/commons/types/country'
import { apiRequest } from '@/lib/fetcher'

export const getCountries = async (): Promise<ApiResponse<Country[]>> => {
  return await apiRequest({
    method: 'get',
    url: '/country/all',
  })
}

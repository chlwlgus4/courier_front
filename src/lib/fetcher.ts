import { AxiosError } from 'axios'
import API from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

interface ErrorDTO {
  code: string
  message: string
  path: string
}

/**
 * POST 요청 유틸
 * @param url  호출할 엔드포인트 (ex: '/api/faqs')
 * @param body  body에 담을 파라미터 객체
 * @returns 성공 시 T, 실패 시 null
 */
export async function apiPost<T>(url: string, body?: any): Promise<T | null> {
  try {
    const { data } = await API.post<T>(url, body)
    return data
  } catch (err) {
    const axiosErr = err as AxiosError<ErrorDTO>

    const code = axiosErr.response?.data.code
    if (code === 'REFRESH_TOKEN_INVALID') {
      useAuthStore.getState().clearAuth()
    } else {
      alert(
        axiosErr.response?.data?.message ?? `알 수 없는 오류가 발생했습니다.`,
      )
    }

    return null
  }
}

/**
 * GET 요청 유틸
 * @param url  호출할 엔드포인트
 * @param params  쿼리 스트링으로 보낼 파라미터 객체
 * @returns 성공 시 T, 실패 시 null
 */
export async function apiGet<T>(
  url: string,
  params?: Record<string, any>,
): Promise<T | null> {
  try {
    const { data } = await API.get<T>(url, { params })
    return data
  } catch (err) {
    const axiosErr = err as AxiosError<ErrorDTO>
    const code = axiosErr.response?.data.code

    if (code === 'REFRESH_TOKEN_INVALID') {
      useAuthStore.getState().clearAuth()
    } else {
      alert(
        axiosErr.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.',
      )
    }
    return null
  }
}

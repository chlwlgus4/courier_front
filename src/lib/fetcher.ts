import { AxiosError } from 'axios'
import API from '@/lib/api'

interface ErrorDTO {
  code: string
  message: string
  path: string
}

export async function apiPost<T>(url: string, body: any): Promise<T | null> {
  try {
    const { data } = await API.post<T>(url, body)
    return data
  } catch (err) {
    const axiosErr = err as AxiosError<ErrorDTO>

    console.log(err)
    alert(axiosErr.response?.data?.message ?? `알 수 없는 오류가 발생했습니다.`)
    return null
  }
}

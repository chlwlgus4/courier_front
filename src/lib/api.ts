import axios, { AxiosError } from 'axios'
import { ApiRequestConfig, AuthResponse } from '@/commons/types'
import { apiPost } from '@/lib/fetcher'
import { useAuthStore } from '@/store/authStore'
import useLoadingStore from '@/store/loadingStore'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api',
  withCredentials: true,
})

// — 로그인 후 호출할 토큰 저장 유틸 —
export function setTokens(accessToken: string) {
  useAuthStore.getState().setAccessToken(accessToken)
  API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

// — 요청 인터셉터: 항상 최신 accessToken 사용 —
API.interceptors.request.use(
  (config) => {
    const apiConfig = config as ApiRequestConfig

    if (apiConfig?.spinner) useLoadingStore.getState().setLoading(true)

    const token = useAuthStore.getState().accessToken
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    const originalReq = error.config as ApiRequestConfig
    if (originalReq?.spinner) useLoadingStore.getState().setLoading(false)
    return error
  },
)

// — 응답 인터셉터: 401 → 리프레시 흐름 —
let isRefreshing = false
type QueueItem = {
  resolve: (token: string) => void
  reject: (err: any) => void
}

let failedQueue: QueueItem[] = []
const processQueue = (err: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    err ? reject(err) : resolve(token!),
  )
  failedQueue = []
}

// 401 발생 시 refresh 대상에서 제외할 경로
const EXCLUDED_PATHS = ['/auth/login', '/auth/register', '/auth/refresh']

API.interceptors.response.use(
  (res) => {
    const apiConfig = res.config as ApiRequestConfig
    if (apiConfig?.spinner) useLoadingStore.getState().setLoading(false)
    return res
  },
  async (error: AxiosError) => {
    const originalReq = error.config as ApiRequestConfig
    if (originalReq?.spinner) useLoadingStore.getState().setLoading(false)

    const reqUrl = originalReq?.url ?? ''

    if (
      error.response?.status === 401 &&
      !originalReq._retry &&
      !EXCLUDED_PATHS.includes(reqUrl)
    ) {
      originalReq._retry = true

      if (isRefreshing) {
        // 이미 refresh 중이면 큐에 넣고, 토큰이 발급되면 재시도
        originalReq.headers!['Authorization'] = await new Promise<string>(
          (resolve, reject) => {
            failedQueue.push({ resolve, reject })
          },
        )
        return API(originalReq)
      }

      // 아직 refresh 중이 아니면 진행
      isRefreshing = true
      try {
        // refresh API 호출
        const data = await apiPost<AuthResponse>('/auth/refresh')
        if (!data) return Promise.reject(error)

        const bearer = `Bearer ${data.accessToken}`

        // 토큰·헤더·쿠키 모두 갱신
        setTokens(data.accessToken)
        API.defaults.headers.common['Authorization'] = bearer

        // 큐에 대기 중인 요청 풀기
        processQueue(null, bearer)

        // 원래 요청도 재시도
        originalReq.headers!['Authorization'] = bearer
        return API(originalReq)
      } catch (err) {
        // refresh 실패 시 큐까지 에러 반환하고 로그인 페이지로
        processQueue(err, null)
        useAuthStore.getState().clearAuth()
        window.location.href = '/login'
        return Promise.reject(err as AxiosError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default API

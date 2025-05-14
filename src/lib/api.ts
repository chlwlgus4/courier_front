// lib/api.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

export interface TokenResponse {
  tokenType: string
  accessToken: string
  refreshToken: string
}

interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

// — 로그인 후 호출할 토큰 저장 유틸 —
export function setTokens(data: TokenResponse) {
  const { tokenType, accessToken, refreshToken } = data
  Cookies.set('accessToken', accessToken, { expires: 1 / 24 })
  Cookies.set('refreshToken', refreshToken, { expires: 7 })
  API.defaults.headers.common['Authorization'] = `${tokenType} ${accessToken}`
}

// — 페이지 로드 시 초기 헤더 세팅 —
const initToken = Cookies.get('accessToken')
if (initToken) {
  API.defaults.headers.common['Authorization'] = `Bearer ${initToken}`
}

// — 요청 인터셉터: 항상 최신 accessToken 사용 —
API.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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
const EXCLUDED_PATHS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
]

API.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalReq = error.config as RetryableRequestConfig
    const reqUrl = originalReq.url ?? ''

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
        const refreshToken = Cookies.get('refreshToken')
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        // refresh API 호출
        const { data } = await API.post<TokenResponse>('/api/auth/refresh', {
          refreshToken,
        })

        const bearer = `${data.tokenType} ${data.accessToken}`

        // 토큰·헤더·쿠키 모두 갱신
        Cookies.set('accessToken', data.accessToken, { expires: 1 })
        Cookies.set('refreshToken', data.refreshToken, { expires: 7 })
        API.defaults.headers.common['Authorization'] = bearer

        // 큐에 대기 중인 요청 풀기
        processQueue(null, bearer)

        // 원래 요청도 재시도
        originalReq.headers!['Authorization'] = bearer
        return API(originalReq)
      } catch (err) {
        // refresh 실패 시 큐까지 에러 반환하고 로그인 페이지로
        processQueue(err, null)
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
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

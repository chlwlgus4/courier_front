import { setTokens, TokenResponse } from '@/lib/api'
import { apiPost } from '@/lib/fetcher'
import { useAuthStore } from '@/store/authStore'

/**
 * 로그인
 * @param username
 * @param password
 * @returns 로그인 후 반환된 토큰 정보
 */
export async function login(
  username: string,
  password: string,
): Promise<TokenResponse | null> {
  const data = await apiPost<TokenResponse>('/api/auth/login', {
    username,
    password,
  })

  if (!data) return null

  setTokens(data)
  return data
}

/**
 * 회원가입
 * @param username
 * @param password
 * @returns 회원가입 후 반환된 토큰 정보
 */
export async function register(
  username: string,
  password: string,
): Promise<void> {
  // 회원가입 엔드포인트 호출
  const data = await apiPost<TokenResponse>('/api/auth/register', {
    username,
    password,
  })

  // 토큰 저장
  if (data) useAuthStore.getState().setAccessToken(data.accessToken)
}

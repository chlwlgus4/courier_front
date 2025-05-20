import { AuthResponse, User } from '@/commons/types'
import { setTokens } from '@/lib/api'
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
): Promise<AuthResponse | null> {
  const data = await apiPost<AuthResponse>('/auth/login', {
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
 * @param name
 * @param email
 * @param phone
 * @returns 회원가입 후 반환된 토큰 정보
 */
export async function register(
  username: string,
  password: string,
  name: string,
  email?: string,
  phone?: string,
): Promise<AuthResponse | null> {
  try {
    const data = await apiPost<AuthResponse>('/auth/register', {
      username,
      password,
      name,
      email,
      phone,
    })

    if (!data) return null

    setTokens(data)
    return data
  } catch (error) {
    console.error('회원가입 오류:', error)
    return null
  }
}

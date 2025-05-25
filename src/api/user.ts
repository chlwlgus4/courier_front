import { UserResponse } from '@/commons/types/user'
import { apiGet } from '@/lib/fetcher'

/**
 * 유저 정보 조회
 * @returns 유저 정보
 */
export async function getUser(): Promise<UserResponse | null> {
  return await apiGet<UserResponse>('/user/me')
}

import { UsernameCheckResponse, UserResponse } from '@/commons/types/user'
import { apiGet, apiRequest } from '@/lib/fetcher'

/**
 * 유저 정보 조회
 * @returns 유저 정보
 */
export async function getUser(): Promise<UserResponse | null> {
  return await apiGet<UserResponse>('/user/me')
}

/**
 * 회원가입 시 아이디 중복 체크
 * @return boolean
 */
export async function checkUsername(
  username: string,
): Promise<UsernameCheckResponse | null> {
  return await apiGet<UsernameCheckResponse>('/user/check-username', {
    username,
  })
}

/**
 * 회원 이메일 변경
 * @returns 유저 정보
 */
export async function modifyEmail(email: string): Promise<UserResponse | null> {
  return await apiRequest<UserResponse>({
    method: 'patch',
    url: '/user/modify-email',
    data: {
      email,
    },
  })
}

import { ApiResponse } from '@/commons/types'
import { UsernameCheckResponse, UserResponse } from '@/commons/types/user'
import { apiRequest } from '@/lib/fetcher'

/**
 * 유저 정보 조회
 * @returns 유저 정보
 */
export async function getUser(): Promise<ApiResponse<UserResponse> | null> {
  return await apiRequest<UserResponse>({
    method: 'get',
    url: '/user/me',
  })
}

/**
 * 회원가입 시 아이디 중복 체크
 * @return boolean
 */
export async function checkUsername(
  username: string,
): Promise<ApiResponse<UsernameCheckResponse> | null> {
  return await apiRequest<UsernameCheckResponse>({
    method: 'get',
    url: '/user/check-username',
    data: {
      username,
    },
  })
}

/**
 * 회원 이메일 변경
 * @returns 유저 정보
 */
export async function modifyEmail(
  email: string,
): Promise<ApiResponse<UserResponse> | null> {
  return await apiRequest<UserResponse>({
    method: 'patch',
    url: '/user/modify-email',
    data: {
      email,
    },
  })
}

/**
 * 비밀번호 변경
 * @returns void
 */
export async function modifyPassword(
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  await apiRequest<void>({
    method: 'post',
    url: '/user/password-change',
    data: {
      oldPassword,
      newPassword,
    },
  })
}

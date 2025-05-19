import { User } from '@/types/user/user'

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface AuthState {
  accessToken: string | null
  user: User | null
  setAccessToken: (token: string, user: User) => void
  clearAuth: () => void
}

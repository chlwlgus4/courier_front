import { User } from '@/types/user/user'

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface AuthState {
  accessToken: string | null
  user: User | null
  initialized: boolean
  setAccessToken: (token: string, user: User) => void
  clearAuth: () => void
  setInitialized: (v: boolean) => void
}

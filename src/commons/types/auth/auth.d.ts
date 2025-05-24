export interface User {
  id?: number
  username: string
  role: string
  name?: string
  email?: string
  phone?: string
  profile_image?: string
  provider?: string
  provider_id?: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface AuthState {
  accessToken: string | null
  user: User | null
  initialized: boolean
  setAccessToken: (token: string, user: User) => void
  setUser: (user: User) => void
  clearAuth: () => void
  setInitialized: (v: boolean) => void
}

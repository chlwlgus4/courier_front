export interface AuthResponse {
  accessToken: string
}

export interface AuthState {
  accessToken: string | null
  initialized: boolean
  setAccessToken: (token: string) => void
  clearAuth: () => void
  setInitialized: (v: boolean) => void
}

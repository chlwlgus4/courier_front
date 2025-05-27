export interface User {
  id?: number
  username?: string
  role?: string
  name?: string
  email?: string
  phone?: string
  profile_image?: string
  provider?: string
  provider_id?: string
}

export interface UserResponse {
  user: User
}

export interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export interface UsernameCheckResponse {
  isAvailable: boolean
}

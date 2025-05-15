import { User } from '@/types/user/user'

export interface AuthResponse {
  accessToken: string
  user: User
}

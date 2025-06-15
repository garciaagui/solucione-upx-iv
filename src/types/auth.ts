import { User } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  data: {
    token: string
    user: User
  }
}

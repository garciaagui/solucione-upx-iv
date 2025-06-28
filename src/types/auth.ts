import { User, UserBasicInfo } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  user: User
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  data: {
    user: UserBasicInfo
  }
}

export interface VerifyEmailResponse {
  message: string
}

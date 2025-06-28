import api from '@/lib/axios'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailResponse,
} from '@/types/auth'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post('auth/login', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logout = async (): Promise<void> => {
  try {
    await api.post('auth/logout')
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await api.post('auth/register', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const verifyEmail = async (token: string): Promise<VerifyEmailResponse> => {
  try {
    const response = await api.get(`auth/verify-email?token=${token}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

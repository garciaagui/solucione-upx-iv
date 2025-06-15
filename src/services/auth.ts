import api from '@/lib/axios'
import { LoginRequest, LoginResponse } from '@/types/auth'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post('auth/login', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

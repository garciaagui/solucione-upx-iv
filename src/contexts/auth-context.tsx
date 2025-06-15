'use client'

import { login as loginService } from '@/services/auth'
import { LoginRequest, LoginResponse } from '@/types/auth'
import { CustomAxiosError } from '@/types/error'
import { User } from '@/types/user'
import { ToastError, ToastSuccess } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface LoginParams {
  data: LoginRequest
  onSuccess?: () => void
}

interface AuthContextType {
  isAdmin: boolean
  isAuthenticated: boolean
  isLoading: boolean
  loggedUser: User | null
  token: string | null
  login: (params: LoginParams) => Promise<LoginResponse['data']>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAdmin = user?.role === 'admin' || user?.role === 'manager'
  const isAuthenticated = !!user && !!token

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(parsedUser)
      } catch (error) {
        console.error('Erro ao parsear dados do usuário:', error)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    }

    setIsLoading(false)
  }, [])

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: async (params: LoginParams) => {
      const { data } = await loginService(params.data)
      return data
    },
    onSuccess: (data, params) => {
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify({ ...data.user }))

      setToken(data.token)
      setUser({ ...data.user })

      ToastSuccess('Login bem-sucedido!')

      if (params.onSuccess) {
        setTimeout(() => {
          params.onSuccess?.()
        }, 100)
      }
    },
    onError: (error: CustomAxiosError) => {
      const message = error.response?.data.message || 'Erro inesperado no login'
      ToastError(message)
    },
  })

  const logout = () => {
    try {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')

      setUser(null)
      setToken(null)

      ToastSuccess('Logout realizado com sucesso!')
    } catch (error) {
      console.error('Erro durante logout:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isAuthenticated,
        isLoading: isLoading || isPending,
        loggedUser: user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

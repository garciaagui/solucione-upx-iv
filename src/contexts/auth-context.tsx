'use client'

import { login as loginService, logout as logoutService } from '@/services/auth'
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
  isLoggingOut: boolean
  loggedUser: User | null
  login: (params: LoginParams) => Promise<LoginResponse['user']>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAdmin = user?.role === 'admin' || user?.role === 'manager'
  const isAuthenticated = !!user

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Erro ao parsear dados do usuário:', error)
        localStorage.removeItem('auth_user')
      }
    }

    setIsLoading(false)
  }, [])

  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (params: LoginParams) => {
      const { user } = await loginService(params.data)
      return user
    },
    onSuccess: (user, params) => {
      localStorage.setItem('auth_user', JSON.stringify({ ...user }))
      setUser({ ...user })

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

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await logoutService()
    },
    onSuccess: () => {
      localStorage.removeItem('auth_user')
      setUser(null)

      ToastSuccess('Logout realizado com sucesso!')
    },
    onError: (error: CustomAxiosError) => {
      const message = error.response?.data.message || 'Erro inesperado no logout'
      ToastError(message)
    },
  })

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isAuthenticated,
        isLoading: isLoading || isLoggingIn || isLoggingOut,
        isLoggingOut,
        loggedUser: user,
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

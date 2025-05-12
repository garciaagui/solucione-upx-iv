import { LoginFormValues, loginSchema } from '@/schemas/login'
import { RegisterFormValues, registerSchema } from '@/schemas/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, ReactNode, useContext, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

type SelectedFormValues = 'login' | 'register'

interface ContextValue {
  loading: boolean
  loginForm: UseFormReturn<LoginFormValues>
  registerForm: UseFormReturn<RegisterFormValues>
  selectedForm: SelectedFormValues
  setLoading: (value: boolean) => void
  setSelectedForm: (value: SelectedFormValues) => void
}

interface ProviderProps {
  children: ReactNode
}

const Context = createContext<ContextValue | undefined>(undefined)

export const AuthDialogProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [selectedForm, setSelectedForm] = useState<SelectedFormValues>('login')

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <Context.Provider
      value={{ loading, loginForm, registerForm, selectedForm, setLoading, setSelectedForm }}
    >
      {children}
    </Context.Provider>
  )
}

export const useAuthDialog = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('"useAuthDialog" must be used within "AuthDialogProvider"')
  }
  return context
}

import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, ReactNode, useContext, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { LoginFormValues, loginSchema } from '.'

interface ContextValue {
  loading: boolean
  loginForm: UseFormReturn<LoginFormValues>
  setLoading: (value: boolean) => void
}

interface ProviderProps {
  children: ReactNode
}

const Context = createContext<ContextValue | undefined>(undefined)

export const AuthDialogProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(false)

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return <Context.Provider value={{ loading, loginForm, setLoading }}>{children}</Context.Provider>
}

export const useAuthDialog = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('"useAuthDialog" must be used within "AuthDialogProvider"')
  }
  return context
}

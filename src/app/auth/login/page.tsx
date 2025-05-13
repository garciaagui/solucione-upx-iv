'use client'

import LoginForm from '@/components/login-form'
import { LoginFormValues, loginSchema } from '@/schemas/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function Login() {
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSuccess = () => {
    router.push('/home')
  }

  return (
    <main className="flex h-screen flex-col items-center gap-8 py-48">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Bem-vindo(a) à Solucione.
        </h1>
        <span className="text-muted-foreground">
          Insira suas credenciais para acessar a plataforma
        </span>
      </div>

      <div className="w-4/5 md:w-1/2">
        <LoginForm form={form} onSuccess={onSuccess} />
      </div>
    </main>
  )
}

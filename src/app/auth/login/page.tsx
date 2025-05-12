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
    <main className="flex h-screen flex-col items-center gap-8 px-20 py-48">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Seja bem-vindo(a)</h3>

      <div className="w-1/2">
        <LoginForm form={form} onSuccess={onSuccess} />
      </div>
    </main>
  )
}

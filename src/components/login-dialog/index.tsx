'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, SignInResponse } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastError, ToastSuccess } from '@/utils/toast'
import { useState } from 'react'
import LoadingMessage from '../loading-message'
import { loginSchema, LoginType } from './_utils'

interface Props {
  isOpen: boolean
  handleOpen: (open: boolean) => void
}

export default function LoginDialog({ isOpen, handleOpen }: Props) {
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { control, handleSubmit, reset } = form

  const handleDialogOpenChange = (open: boolean) => {
    if (!loading) {
      handleOpen(open)
      reset()
    }
  }

  const login = async (data: LoginType) => {
    setLoading(true)

    const response = (await signIn('credentials', {
      ...data,
      redirect: false,
    })) as SignInResponse

    const { ok, error } = response

    if (ok) {
      ToastSuccess('Login bem-sucedido!')
      handleOpen(false)
    } else if (!ok && error) {
      ToastError(error)
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Login</DialogTitle>
          <DialogDescription>Insira suas credenciais para acessar a plataforma</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4" id="login-form">
            <FormField
              control={control}
              disabled={loading}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu e-mail" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              disabled={loading}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="mt-2 w-full">
              {!loading ? 'Entrar' : <LoadingMessage message="Entrando..." />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

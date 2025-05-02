'use client'

import { signIn, SignInResponse } from 'next-auth/react'

import LoadingMessage from '@/components/loading-message'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import { LoginFormValues } from '../_utils'
import { useAuthDialog } from '../_utils/context'

interface Props {
  handleOpen: (open: boolean) => void
}

export default function Login({ handleOpen }: Props) {
  const { loading, loginForm, setLoading } = useAuthDialog()
  const { control, handleSubmit } = loginForm

  const login = async (data: LoginFormValues) => {
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
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">Login</DialogTitle>
        <DialogDescription>Insira suas credenciais para acessar a plataforma</DialogDescription>
      </DialogHeader>

      <Form {...loginForm}>
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

          <Button disabled={loading} type="submit" className="mt-2">
            {!loading ? 'Entrar' : <LoadingMessage message="Entrando..." />}
          </Button>
        </form>
      </Form>
    </>
  )
}

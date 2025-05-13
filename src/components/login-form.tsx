'use client'

import { signIn, SignInResponse } from 'next-auth/react'

import LoadingMessage from '@/components/loading-message'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginFormValues } from '@/schemas/login'
import { ToastError, ToastSuccess } from '@/utils/toast'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<LoginFormValues>
  onSuccess?: () => void
}

export default function LoginForm({ form, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = form

  const login = async (data: LoginFormValues) => {
    setLoading(true)

    const response = (await signIn('credentials', {
      ...data,
      redirect: false,
    })) as SignInResponse

    const { ok, error } = response

    if (ok) {
      ToastSuccess('Login bem-sucedido!')
      onSuccess?.()
    } else if (!ok && error) {
      ToastError(error)
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4">
        <FormField
          control={control}
          disabled={loading}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="examplo@mail.com" type="email" {...field} />
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
                <Input placeholder="**********" type="password" {...field} />
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
  )
}

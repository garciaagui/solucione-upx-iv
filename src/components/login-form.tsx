'use client'

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
import { useAuth } from '@/contexts/auth-context'
import { LoginFormValues } from '@/schemas/login'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<LoginFormValues>
  onSuccess?: () => void
}

export default function LoginForm({ form, onSuccess }: Props) {
  const { isLoading, login } = useAuth()
  const { control, handleSubmit } = form

  const handleLogin = async (data: LoginFormValues) => {
    await login({ data, onSuccess })
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
        <FormField
          control={control}
          disabled={isLoading}
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
          disabled={isLoading}
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

        <Button disabled={isLoading} type="submit" className="mt-2">
          {!isLoading ? 'Entrar' : <LoadingMessage message="Entrando..." />}
        </Button>
      </form>
    </Form>
  )
}

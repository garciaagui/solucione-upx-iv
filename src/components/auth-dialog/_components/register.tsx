'use client'

import LoadingMessage from '@/components/loading-message'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterFormValues } from '../_utils'
import { useAuthDialog } from '../_utils/context'

interface Props {
  handleOpen: (open: boolean) => void
}

export default function Register({ handleOpen }: Props) {
  const { loading, registerForm, setSelectedForm } = useAuthDialog()
  const { control, handleSubmit, reset } = registerForm

  const handleSelectedFormChange = () => {
    setSelectedForm('login')
    reset()
  }

  const register = async (data: RegisterFormValues) => {
    console.log(data)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">Cadastro</DialogTitle>
        <DialogDescription>Preencha os campos abaixo para completar seu cadastro</DialogDescription>
      </DialogHeader>

      <Form {...registerForm}>
        <form onSubmit={handleSubmit(register)} className="flex flex-col gap-4" id="login-form">
          <FormField
            control={control}
            disabled={loading}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: João Silva" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            disabled={loading}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: joao@mail.com" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Insira um e-mail real. Ele precisará ser validado para efetivar o cadastro.
                </FormDescription>
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
                <FormDescription>
                  <span>A senha precisa conter, pelo menos:</span>
                  <ul>
                    <li>- 1 número;</li>
                    <li>- 1 letra minúscula;</li>
                    <li>- 1 letra maiúscula;</li>
                    <li>- 1 carectere especial.</li>
                  </ul>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            disabled={loading}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a senha</FormLabel>
                <FormControl>
                  <Input placeholder="**********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit" className="mt-2">
            {!loading ? 'Cadastrar' : <LoadingMessage message="Finalizando..." />}
          </Button>

          <div className="mt-4 text-center text-sm">
            Já tem conta?{' '}
            <button
              type="button"
              className="font-medium text-primary underline transition-all duration-200 ease-in-out hover:text-muted-foreground"
              onClick={handleSelectedFormChange}
            >
              Faça o login
            </button>
          </div>
        </form>
      </Form>
    </>
  )
}

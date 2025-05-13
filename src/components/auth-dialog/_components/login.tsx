'use client'

import LoginForm from '@/components/login-form'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuthDialog } from '../_utils/context'

interface Props {
  handleOpen: (open: boolean) => void
}

export default function Login({ handleOpen }: Props) {
  const { loginForm, setSelectedForm } = useAuthDialog()
  const { reset } = loginForm

  const handleSelectedFormChange = () => {
    setSelectedForm('register')
    reset()
  }

  const onSuccess = () => {
    handleOpen(false)
  }

  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl font-semibold">Login</DialogTitle>
        <DialogDescription>Insira suas credenciais para acessar a plataforma</DialogDescription>
      </DialogHeader>

      <LoginForm form={loginForm} onSuccess={onSuccess} />

      <div className="mt-8 text-center text-sm">
        Não tem conta?{' '}
        <button
          type="button"
          className="font-medium text-primary underline transition-all duration-200 ease-in-out hover:text-muted-foreground"
          onClick={handleSelectedFormChange}
        >
          Cadastre-se
        </button>
      </div>
    </>
  )
}

'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import ConfirmDialog from '../confirm-dialog'
import { AnimationWrapper, Login, Register } from './_components'
import { AuthDialogProvider, useAuthDialog } from './_utils/context'

interface Props {
  isOpen: boolean
  handleOpen: (open: boolean) => void
}

function AuthDialogContent({ isOpen, handleOpen }: Props) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const { loading, loginForm, registerForm, selectedForm, setSelectedForm } = useAuthDialog()

  const resetForms = () => {
    loginForm.reset()
    registerForm.reset()
  }

  const handleDialogOpenChange = (open: boolean) => {
    const hasFilledFields = registerForm.formState.isDirty

    if (!open && hasFilledFields && !loading) {
      setShowConfirmDialog(true)
    } else if (!loading) {
      handleOpen(open)
      resetForms()
      setSelectedForm('login')
    }
  }

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false)
    handleOpen(false)
    resetForms()
    setSelectedForm('login')
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-h-[100vh] overflow-y-auto">
          <AnimationWrapper>
            {selectedForm === 'login' ? (
              <Login handleOpen={handleOpen} />
            ) : (
              <Register handleOpen={handleOpen} />
            )}
          </AnimationWrapper>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showConfirmDialog}
        description="Há informações preenchidas. Deseja sair?"
        title="Abandonar cadastro?"
        onConfirm={closeConfirmDialog}
        onOpenChange={setShowConfirmDialog}
      />
    </>
  )
}

export default function AuthDialog({ ...props }: Props) {
  return (
    <AuthDialogProvider>
      <AuthDialogContent {...props} />
    </AuthDialogProvider>
  )
}

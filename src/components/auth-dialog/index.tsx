'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Login, Register } from './_components'
import { AuthDialogProvider, useAuthDialog } from './_utils/context'

interface Props {
  isOpen: boolean
  handleOpen: (open: boolean) => void
}

function AuthDialogContent({ isOpen, handleOpen }: Props) {
  const { loading, loginForm, selectedForm, setSelectedForm } = useAuthDialog()
  const { reset } = loginForm

  const handleDialogOpenChange = (open: boolean) => {
    if (!loading) {
      handleOpen(open)
      reset()
      setSelectedForm('login')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-h-[100vh] overflow-y-auto">
        {selectedForm === 'login' ? (
          <Login handleOpen={handleOpen} />
        ) : (
          <Register handleOpen={handleOpen} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function AuthDialog({ ...props }: Props) {
  return (
    <AuthDialogProvider>
      <AuthDialogContent {...props} />
    </AuthDialogProvider>
  )
}

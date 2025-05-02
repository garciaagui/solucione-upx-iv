'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import Login from './_components/login'
import { AuthDialogProvider, useAuthDialog } from './_utils/context'

interface Props {
  isOpen: boolean
  handleOpen: (open: boolean) => void
}

function AuthDialogContent({ isOpen, handleOpen }: Props) {
  const { loading, loginForm } = useAuthDialog()
  const { reset } = loginForm

  const handleDialogOpenChange = (open: boolean) => {
    if (!loading) {
      handleOpen(open)
      reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent>
        <Login handleOpen={handleOpen} />
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

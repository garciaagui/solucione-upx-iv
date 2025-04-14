import LoginDialog from '@/components/login-dialog'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import CreateOccurrence from './create-occurrence'

export default function DialogButton() {
  const [openDialog, setOpenDialog] = useState(false)
  const { status } = useSession()

  const isLoggedIn = status === 'authenticated'

  return (
    <>
      <Button onClick={() => setOpenDialog(!openDialog)}>Abrir reclamação</Button>

      {isLoggedIn ? (
        <CreateOccurrence isOpen={openDialog} handleOpen={setOpenDialog} />
      ) : (
        <LoginDialog isOpen={openDialog} handleOpen={setOpenDialog} />
      )}
    </>
  )
}

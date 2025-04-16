'use client'

import CreateOccurrence from '@/components/create-occurrence'
import LoginDialog from '@/components/login-dialog'
import { Button } from '@/components/ui/button'
import { BookPlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function CreateOccurrenceButton() {
  const [openDialog, setOpenDialog] = useState(false)
  const { status } = useSession()

  const isLoggedIn = status === 'authenticated'

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpenDialog(!openDialog)}>
        <BookPlus />
        <span>Abrir reclamação</span>
      </Button>

      {isLoggedIn ? (
        <CreateOccurrence isOpen={openDialog} handleOpen={setOpenDialog} />
      ) : (
        <LoginDialog isOpen={openDialog} handleOpen={setOpenDialog} />
      )}
    </>
  )
}

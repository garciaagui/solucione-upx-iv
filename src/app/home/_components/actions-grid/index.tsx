import LoginDialog from '@/components/login-dialog'
import { Button } from '@/components/ui/button'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { CreateOccurrence } from './_components'

export default function ActionsGrid() {
  const [openDialog, setOpenDialog] = useState(false)
  const { status } = useSession()

  const isLoggedIn = status === 'authenticated'

  return (
    <>
      <div>
        <Button variant="outline" onClick={() => setOpenDialog(!openDialog)}>
          <SquareArrowOutUpRight />
          <span>Abrir reclamação</span>
        </Button>
      </div>

      {isLoggedIn ? (
        <CreateOccurrence isOpen={openDialog} handleOpen={setOpenDialog} />
      ) : (
        <LoginDialog isOpen={openDialog} handleOpen={setOpenDialog} />
      )}
    </>
  )
}

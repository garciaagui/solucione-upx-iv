'use client'

import LoginDialog from '@/components/login-dialog'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { CreateOccurrence, OccurrencesTable } from './_components'
import { useOccurrences } from './_utils/useOccurrences'

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false)
  const { data } = useOccurrences()
  const { status } = useSession()

  const isLoggedIn = status === 'authenticated'

  return (
    <div>
      <h1>Início</h1>

      <Button onClick={() => setOpenDialog(!openDialog)}>Abrir reclamação</Button>

      {isLoggedIn ? (
        <CreateOccurrence isOpen={openDialog} handleOpen={setOpenDialog} />
      ) : (
        <LoginDialog isOpen={openDialog} handleOpen={setOpenDialog} />
      )}

      <OccurrencesTable data={data} />
    </div>
  )
}

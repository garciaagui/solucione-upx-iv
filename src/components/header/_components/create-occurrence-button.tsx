'use client'

import AuthDialog from '@/components/auth-dialog'
import CreateOccurrence from '@/components/create-occurrence'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { BookPlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function CreateOccurrenceButton() {
  const [openDialog, setOpenDialog] = useState(false)
  const { status } = useSession()

  const isLoggedIn = status === 'authenticated'
  const isLoading = status === 'loading'

  if (isLoading) return <Skeleton className="h-8 w-36 rounded-lg" />

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpenDialog(!openDialog)}>
        <BookPlus />
        <span>Abrir reclamação</span>
      </Button>

      {isLoggedIn ? (
        <CreateOccurrence isOpen={openDialog} handleOpen={setOpenDialog} />
      ) : (
        <AuthDialog isOpen={openDialog} handleOpen={setOpenDialog} />
      )}
    </>
  )
}

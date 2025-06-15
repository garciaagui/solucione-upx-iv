'use client'

import AuthDialog from '@/components/auth-dialog'
import CreateOccurrence from '@/components/create-occurrence'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/auth-context'
import { BookPlus } from 'lucide-react'
import { useState } from 'react'

export default function CreateOccurrenceButton() {
  const [openDialog, setOpenDialog] = useState(false)
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <Skeleton className="h-8 w-36 rounded-lg" />

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpenDialog(!openDialog)}>
        <BookPlus />
        <span>Abrir reclamação</span>
      </Button>

      {isAuthenticated ? (
        <CreateOccurrence isOpen={openDialog} handleOpen={setOpenDialog} />
      ) : (
        <AuthDialog isOpen={openDialog} handleOpen={setOpenDialog} />
      )}
    </>
  )
}

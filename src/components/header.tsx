'use client'

import CreateOccurrence from '@/components/create-occurrence'
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BookPlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import LoginDialog from './login-dialog'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

function CreateOccurrenceButton() {
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

export default function Header() {
  const { open } = useSidebar()

  return (
    <div className="sticky top-0 z-10 flex shrink-0 items-center gap-8 border-b bg-background p-4">
      <div className="flex items-center gap-2">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <SidebarTrigger />
            </TooltipTrigger>

            <TooltipContent>
              <p>{open ? 'Recolher menu' : 'Expandir menu'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <span className="text-2xl font-semibold tracking-tight text-primary">Solucione</span>
      </div>

      <Separator orientation="vertical" />

      <CreateOccurrenceButton />
    </div>
  )
}

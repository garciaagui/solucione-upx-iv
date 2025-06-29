'use client'

import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { CreateOccurrenceButton, SidebarButton } from './_components'

export default function Header() {
  const { isAdmin } = useAuth()

  return (
    <div className="sticky top-0 z-50 flex shrink-0 items-center gap-8 border-b bg-background p-4">
      <div className="flex items-center gap-2">
        <SidebarButton />
        <span className="text-2xl font-extrabold tracking-tight text-primary">Solucione.</span>
      </div>

      {!isAdmin ? (
        <>
          <Separator orientation="vertical" />

          <CreateOccurrenceButton />
        </>
      ) : null}
    </div>
  )
}

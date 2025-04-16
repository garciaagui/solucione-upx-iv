'use client'

import { Separator } from '../ui/separator'
import { CreateOccurrenceButton, SidebarButton } from './_components'

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex shrink-0 items-center gap-8 border-b bg-background p-4">
      <div className="flex items-center gap-2">
        <SidebarButton />
        <span className="text-2xl font-semibold tracking-tight text-primary">Solucione</span>
      </div>

      <Separator orientation="vertical" />

      <CreateOccurrenceButton />
    </div>
  )
}

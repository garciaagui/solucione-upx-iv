import { BookPlus } from 'lucide-react'

import AuthDialog from '@/components/auth-dialog'
import CreateOccurrence from '@/components/create-occurrence'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'

function CreateOccurrenceItem() {
  const [openDialog, setOpenDialog] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => setOpenDialog(!openDialog)}>
          <BookPlus />
          <span>Abrir reclamação</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {isAuthenticated ? (
        <CreateOccurrence isOpen={openDialog} handleOpen={setOpenDialog} />
      ) : (
        <AuthDialog isOpen={openDialog} handleOpen={setOpenDialog} />
      )}
    </>
  )
}

export default function ActionsMenu() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Ações</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <CreateOccurrenceItem />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

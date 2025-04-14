'use client'

import { Sidebar, SidebarContent, SidebarSeparator } from '@/components/ui/sidebar'
import { MenuItems } from './_components'

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <MenuItems />
      </SidebarContent>

      <SidebarSeparator />
    </Sidebar>
  )
}

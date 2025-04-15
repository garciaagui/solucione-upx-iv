'use client'

import { Sidebar, SidebarContent, SidebarSeparator } from '@/components/ui/sidebar'
import { ActionsMenu, Footer, NavMenu } from './_components'

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <NavMenu />
        <ActionsMenu />
      </SidebarContent>
      <SidebarSeparator />
      <Footer />
    </Sidebar>
  )
}

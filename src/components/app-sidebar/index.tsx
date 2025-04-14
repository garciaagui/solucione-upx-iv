'use client'

import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import { Header, MenuItems } from './_components'

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <Header />
      <SidebarContent>
        <MenuItems />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

'use client'

import { Sidebar, SidebarContent, SidebarSeparator } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth-context'
import { ActionsMenu, Footer, NavMenu } from './_components'
import SidebarSkeleton from './_components/sidebar-skeleton'

export default function AppSidebar() {
  const { isAdmin, isLoading } = useAuth()

  if (isLoading) return SidebarSkeleton()

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <NavMenu />
        {!isAdmin ? <ActionsMenu /> : null}
      </SidebarContent>
      <SidebarSeparator />
      <Footer />
    </Sidebar>
  )
}

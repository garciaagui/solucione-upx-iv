'use client'

import { Sidebar, SidebarContent, SidebarSeparator } from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'
import { ActionsMenu, Footer, NavMenu } from './_components'
import SidebarSkeleton from './_components/sidebar-skeleton'

export default function AppSidebar() {
  const { status } = useSession()
  const isLoading = status === 'loading'

  if (isLoading) return SidebarSkeleton()

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

'use client'

import { Sidebar, SidebarContent, SidebarSeparator } from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'
import { ActionsMenu, Footer, NavMenu } from './_components'
import SidebarSkeleton from './_components/sidebar-skeleton'

export default function AppSidebar() {
  const { data, status } = useSession()
  const isLoading = status === 'loading'
  const isAdmin = data?.token.user?.role === 'admin'

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

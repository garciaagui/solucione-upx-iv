'use client'

import Header from '@/components/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import AppSidebar from './app-sidebar'

interface Props {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  const pathname = usePathname()
  const isAuthRoute = pathname.startsWith('/auth')

  if (isAuthRoute) {
    return <main className="w-full p-4">{children}</main>
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="w-full p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

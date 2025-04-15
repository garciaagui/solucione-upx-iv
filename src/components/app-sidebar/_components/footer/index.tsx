import { SidebarFooter, SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { LoginButton, Menu } from './_components'

export default function Footer() {
  const { data, status } = useSession()
  const { open } = useSidebar()

  const user = data?.token.user
  const isLoading = status === 'loading'

  return (
    <SidebarFooter>
      <SidebarMenu>
        {isLoading ? (
          <Skeleton className={clsx('h-10 w-full rounded-lg', open ? 'h-10' : 'h-8')} />
        ) : (
          <SidebarMenuItem>{!user ? <LoginButton /> : <Menu user={user} />}</SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarFooter>
  )
}

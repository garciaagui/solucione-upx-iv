import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'
import { LoginButton, Menu } from './_components'

export default function Footer() {
  const { data } = useSession()
  const user = data?.token.user

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>{!user ? <LoginButton /> : <Menu user={user} />}</SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

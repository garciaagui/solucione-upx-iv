import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth-context'
import { LoginButton, Menu } from './_components'

export default function Footer() {
  const { loggedUser } = useAuth()

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          {!loggedUser ? <LoginButton /> : <Menu user={loggedUser} />}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

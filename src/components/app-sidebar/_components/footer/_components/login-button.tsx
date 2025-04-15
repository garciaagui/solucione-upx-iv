import LoginDialog from '@/components/login-dialog'
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import clsx from 'clsx'
import { LogIn } from 'lucide-react'
import { useState } from 'react'

export default function LoginButton() {
  const [openDialog, setOpenDialog] = useState(false)
  const { open } = useSidebar()

  return (
    <>
      <SidebarMenuButton
        size="lg"
        className={clsx(
          'flex items-center gap-2 transition-all duration-300 ease-in-out',
          open ? 'justify-start' : 'justify-center',
          'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
        )}
        onClick={() => setOpenDialog(true)}
      >
        <LogIn className="transition-transform duration-300" />
        <span
          className={clsx(
            'whitespace-nowrap text-sm transition-all duration-300',
            open
              ? 'ml-1 max-w-[100px] translate-x-0 opacity-100'
              : 'ml-0 max-w-0 -translate-x-2 overflow-hidden opacity-0',
          )}
        >
          Entrar
        </span>
      </SidebarMenuButton>

      <LoginDialog isOpen={openDialog} handleOpen={setOpenDialog} />
    </>
  )
}

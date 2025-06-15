import ConfirmDialog from '@/components/confirm-dialog'
import { Avatar as AvatarContainer, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth-context'
import { User } from '@/types/user'
import { ChevronsUpDown, LogOut, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

interface Props {
  user: User
}

function UserInfo({ user }: Props) {
  const { email, name } = user

  return (
    <div className="flex items-center gap-2 text-left text-sm">
      <AvatarContainer className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}
          alt={name}
        />
        <AvatarFallback className="rounded-lg">{name[0].toUpperCase()}</AvatarFallback>
      </AvatarContainer>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{name}</span>
        <span className="truncate text-xs">{email}</span>
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="flex flex-1 flex-row items-center justify-start p-0 font-normal active:bg-transparent"
        >
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span>Alterar tema</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun />
          <span>Claro</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon />
          <span>Escuro</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LogoutButton() {
  return (
    <Button
      size="sm"
      variant="ghost"
      className="flex flex-1 flex-row items-center justify-start p-0 font-normal active:bg-transparent"
    >
      <LogOut />
      <span>Sair</span>
    </Button>
  )
}

export default function Menu({ user }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const { isMobile } = useSidebar()
  const { logout } = useAuth()

  const onConfirmLogout = () => {
    logout()
    setOpenDialog(false)
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <UserInfo user={user} />
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={isMobile ? 'bottom' : 'right'}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 px-1 py-1.5 font-normal">
            <UserInfo user={user} />
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <ThemeToggle />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault()
                setOpenDialog(true)
              }}
            >
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={openDialog}
        title="Deseja sair?"
        onConfirm={onConfirmLogout}
        onOpenChange={setOpenDialog}
      />
    </>
  )
}

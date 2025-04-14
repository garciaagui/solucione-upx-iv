import { SidebarHeader, SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import clsx from 'clsx'
import { Lightbulb } from 'lucide-react'

export default function Header() {
  const { open } = useSidebar()

  return (
    <SidebarHeader
      className={clsx(
        'flex items-center justify-between border-b pb-4 transition-all duration-300',
        open ? 'flex-row' : 'flex-col',
      )}
    >
      <div className="relative flex flex-row items-center gap-2">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Lightbulb className="size-4" />
        </div>

        {open ? (
          <span className="text-2xl font-semibold tracking-tight text-sidebar-primary">
            Solucione
          </span>
        ) : null}
      </div>

      <SidebarTrigger />
    </SidebarHeader>
  )
}

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuth } from '@/contexts/auth-context'

export default function SidebarButton() {
  const { open } = useSidebar()
  const { isLoading } = useAuth()

  if (isLoading) return <Skeleton className="size-7 rounded-lg" />

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>

        <TooltipContent>
          <p>{open ? 'Recolher menu' : 'Expandir menu'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

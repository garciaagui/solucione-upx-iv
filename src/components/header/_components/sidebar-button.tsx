import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function SidebarButton() {
  const { open } = useSidebar()

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

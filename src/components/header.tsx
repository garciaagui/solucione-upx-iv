import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b bg-background p-4">
      <SidebarTrigger />
      <div className="relative flex flex-row items-center gap-2">
        <span className="text-2xl font-semibold tracking-tight text-sidebar-primary">
          Solucione
        </span>
      </div>
    </div>
  )
}

'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import clsx from 'clsx'

interface SkeletonGroupProps {
  label: string
  items: number
}

function SkeletonGroup({ label, items }: SkeletonGroupProps) {
  const { open } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {Array.from({ length: items }).map((_, i) => (
            <SidebarMenuItem
              key={i}
              className={clsx('flex items-center gap-2', open ? 'px-2 py-2' : 'flex-col px-0 py-2')}
            >
              <Skeleton className="h-5 w-5" />
              {open && <Skeleton className="h-4 w-24" />}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function SkeletonFooter() {
  const { open } = useSidebar()

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem className={clsx('flex items-center gap-2', open ? 'p-2' : 'p-0')}>
          <Skeleton className="size-8" />
          {open && <Skeleton className="h-8 w-full" />}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export default function SidebarSkeleton() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SkeletonGroup label="Navegação" items={1} />
        <SkeletonGroup label="Ações" items={1} />
      </SidebarContent>

      <SidebarSeparator />

      <SkeletonFooter />
    </Sidebar>
  )
}

import StatusBadge from '@/components/status-badge'
import { formatDate } from '@/utils/functions/date'
import { Status } from '@prisma/client'
import { CalendarDays, Hash } from 'lucide-react'

interface Props {
  createdAt: Date
  id: number
  status: Status
}

export default function MetaInfo({ createdAt, id, status }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        <span>{formatDate(createdAt)}</span>
      </div>

      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4" />
        <span>ID: {id}</span>
      </div>

      <StatusBadge status={status} />
    </div>
  )
}

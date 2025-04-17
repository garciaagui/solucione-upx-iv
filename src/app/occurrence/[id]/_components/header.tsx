import StatusBadge from '@/components/status-badge'
import { Badge } from '@/components/ui/badge'
import { OccurrenceWithRelations } from '@/types/globals'
import { formatDate } from '@/utils/functions/date'
import { ChevronLeft, UserCircle } from 'lucide-react'
import Link from 'next/link'

interface Props {
  data: OccurrenceWithRelations
}

export default function Header({ data }: Props) {
  const { createdAt, status, title, user } = data

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/home"
        passHref
        className="text-muted-foreground transition duration-200 hover:text-foreground"
      >
        <ChevronLeft size={24} />
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <UserCircle size={12} />
            {user.name}
          </Badge>
          <StatusBadge status={status} />
          <Badge>{formatDate(createdAt)}</Badge>
        </div>
      </div>
    </div>
  )
}

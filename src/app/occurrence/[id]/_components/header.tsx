import StatusBadge from '@/components/status-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { OccurrenceWithRelations } from '@/types/globals'
import { formatDate } from '@/utils/functions/date'
import { ChevronLeft, RefreshCcw, UserCircle } from 'lucide-react'
import Link from 'next/link'

interface Props {
  data: OccurrenceWithRelations
  openUpdateDialog: () => void
}

export default function Header({ data, openUpdateDialog }: Props) {
  const { isAdmin } = useAuth()
  const { createdAt, status, title, user } = data

  return (
    <div className="flex w-full items-center gap-4">
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
          <Badge variant="outline" className="gap-1">
            <UserCircle size={12} />
            {user.name}
          </Badge>
          <Badge variant="outline">{formatDate(createdAt)}</Badge>
          <StatusBadge status={status} />
        </div>
      </div>

      {isAdmin && status !== 'Finalizado' ? (
        <Button className="ml-auto" onClick={openUpdateDialog}>
          <RefreshCcw />
          Atualizar status
        </Button>
      ) : null}
    </div>
  )
}

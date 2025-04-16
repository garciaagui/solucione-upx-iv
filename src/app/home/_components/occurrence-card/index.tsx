import StatusBadge from '@/components/status-badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { OccurrenceWithRelations } from '@/types/globals'
import { formatDate } from '@/utils/functions/date'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { ImageContainer } from './_components'

interface Props {
  data: OccurrenceWithRelations
}

export default function OccurrenceCard({ data }: Props) {
  const { title, createdAt, status, neighborhood, street, image, user } = data

  return (
    <Card className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-muted bg-background shadow-md transition-shadow hover:shadow-xl">
      <ImageContainer title={title} url={image} username={user.name} />

      <CardHeader className="flex flex-row items-center justify-between px-4 text-muted-foreground">
        <StatusBadge status={status} />
        <div className="flex items-center gap-1 text-xs">
          <CalendarDays size={14} />
          <span>{formatDate(createdAt)}</span>
        </div>
      </CardHeader>

      <CardContent className="flex items-center gap-2 px-4 pb-4 text-sm text-muted-foreground">
        <MapPin size={16} />
        <span>
          <strong>{neighborhood}</strong> - {street}
        </span>
      </CardContent>

      <CardFooter className="flex cursor-pointer items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground hover:underline">
        <span>Ver mais detalhes</span>
        <ArrowRight size={16} />
      </CardFooter>
    </Card>
  )
}

import StatusBadge from '@/components/status-badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { OccurrenceWithRelations } from '@/types/globals'
import { formatDate } from '@/utils/functions/date'
import Image from 'next/image'

interface Props {
  data: OccurrenceWithRelations
}

export default function OccurrenceCard({ data }: Props) {
  const { title, createdAt, status, neighborhood, street, image } = data

  return (
    <Card className="mx-auto w-full max-w-2xl overflow-hidden border border-muted bg-background shadow-sm">
      {image && (
        <div className="relative h-[400px] w-full">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}

      <CardHeader className="px-4 pb-0 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-muted-foreground">{formatDate(createdAt)}</p>
      </CardHeader>

      <CardContent className="px-4 pt-2 text-sm text-muted-foreground">
        <p>
          <strong>Bairro:</strong> {neighborhood}
        </p>
        <p>
          <strong>Rua:</strong> {street}
        </p>
      </CardContent>

      <CardFooter className="pb-4 pl-4 text-xs text-muted-foreground">
        Clique para ver mais detalhes
      </CardFooter>
    </Card>
  )
}

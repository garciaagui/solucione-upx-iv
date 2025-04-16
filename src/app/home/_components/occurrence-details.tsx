import StatusBadge from '@/components/status-badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils/functions/date'
import { Occurrence, Status } from '@prisma/client'
import { CalendarDays, Hash, LocateFixed, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface OccurrenceDetailsProps {
  data: Occurrence
  isOpen: boolean
  handleOpen: () => void
}

interface ImageContainerProps {
  url: string
}

interface LocationProps {
  neighborhood: string
  reference: string | null
  street: string
  zipCode: string
}

interface MetaInfoProps {
  createdAt: Date
  id: number
  status: Status
}

function ImageContainer({ url }: ImageContainerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="overflow-hidden rounded-md">
      {!isLoaded && <Skeleton className="h-[200px] w-full rounded-lg md:h-[400px]" />}

      {url && (
        <Image
          src={url}
          alt="Imagem da ocorrência"
          width={800}
          height={400}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`h-auto max-h-[400px] w-full rounded-lg object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'absolute opacity-0'
          }`}
        />
      )}
    </div>
  )
}

function Location({ neighborhood, reference, street, zipCode }: LocationProps) {
  return (
    <div>
      <h3 className="text-base font-medium">Localização</h3>

      <div className="mt-1 grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{neighborhood}</span>
        </div>

        <div className="flex items-center gap-2">
          <LocateFixed className="h-4 w-4" />
          <span>{street}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">CEP:</span>
          <span>{zipCode}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Referência:</span>
          <span>{reference || 'Sem referência'}</span>
        </div>
      </div>
    </div>
  )
}

function MetaInfo({ createdAt, id, status }: MetaInfoProps) {
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

export default function OccurrenceDetails({ data, isOpen, handleOpen }: OccurrenceDetailsProps) {
  const {
    id,
    title,
    description,
    createdAt,
    image,
    neighborhood,
    street,
    zipCode,
    reference,
    status,
  } = data

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Detalhes completos da ocorrência registrada
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <MetaInfo createdAt={createdAt} id={id} status={status} />

          <Separator />

          <ImageContainer url={image} />

          <div>
            <h3 className="text-base font-medium">Descrição</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <Location
            neighborhood={neighborhood}
            reference={reference}
            street={street}
            zipCode={zipCode}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

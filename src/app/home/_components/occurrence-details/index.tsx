import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Occurrence } from '@prisma/client'
import { ImageContainer, Location, MetaInfo } from './_components'

interface Props {
  data: Occurrence
  isOpen: boolean
  handleOpen: () => void
}

export default function OccurrenceDetails({ data, isOpen, handleOpen }: Props) {
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

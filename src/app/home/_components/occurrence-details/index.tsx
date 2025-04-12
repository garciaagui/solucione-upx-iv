import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Occurrence } from '@prisma/client'
import Image from 'next/image'
import { Location, MetaInfo } from './_components'

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <MetaInfo createdAt={createdAt} id={id} status={status} />

          <Separator />

          <div className="overflow-hidden rounded-md">
            <Image
              src={image}
              alt="Imagem da ocorrência"
              width={800}
              height={400}
              className="h-auto max-h-[400px] w-full rounded-lg object-cover"
            />
          </div>

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

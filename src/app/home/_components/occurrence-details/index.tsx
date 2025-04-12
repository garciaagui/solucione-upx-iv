import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Occurrence } from '@prisma/client'
import { MetaInfo } from './_components'

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
        </div>
      </DialogContent>
    </Dialog>
  )
}

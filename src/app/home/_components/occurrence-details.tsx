import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Occurrence } from '@prisma/client'

interface Props {
  data: Occurrence
  isOpen: boolean
  handleOpen: () => void
}

export default function OccurrenceDetails({ data, isOpen, handleOpen }: Props) {
  const { description, title } = data

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

type ConfirmDialogProps = {
  open: boolean
  description?: string
  title?: string
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Tem certeza?',
  description = 'Você tem certeza que deseja prosseguir com esta ação?',
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

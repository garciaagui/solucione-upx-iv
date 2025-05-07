import { Button } from '@/components/ui/button'
import { MailCheck } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
}

export default function VerifyEmailDialog({ open, onOpenChange }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MailCheck size={24} />
            <span>Confirme seu e-mail</span>
          </DialogTitle>
          <DialogDescription>
            Um e-mail de verificação foi enviado! Valide seu e-mail e finalize o cadastro.
          </DialogDescription>
        </DialogHeader>

        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          OK
        </Button>
      </DialogContent>
    </Dialog>
  )
}

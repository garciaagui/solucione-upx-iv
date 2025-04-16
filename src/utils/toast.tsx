import { AlertCircle, CheckCircle2, LucideIcon, XCircle } from 'lucide-react'
import { toast } from 'sonner'

interface ToastOptions {
  message: string
  title: string
  color: 'success' | 'warning' | 'destructive'
  icon: LucideIcon
}

function showToast({ message, title, color, icon: Icon }: ToastOptions) {
  toast(
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Icon width={20} height={20} color={`hsl(var(--${color}))`} />
        <span className="text-sm font-medium">{title}</span>
      </div>

      <span className="text-sm text-muted-foreground">{message}</span>
    </div>,
    {
      style: {
        borderLeft: `4px solid hsl(var(--${color}))`,
      },
    },
  )
}

export function ToastSuccess(message: string) {
  showToast({ message, title: 'Sucesso', color: 'success', icon: CheckCircle2 })
}

export function ToastWarning(message: string) {
  showToast({ message, title: 'Atenção', color: 'warning', icon: AlertCircle })
}

export function ToastError(message: string) {
  showToast({ message, title: 'Erro', color: 'destructive', icon: XCircle })
}

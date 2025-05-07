import { cn } from '@/lib/shadcn'
import { Check, Loader, X } from 'lucide-react'
import { VerifyEmailStatus } from '../_utils'

interface Props {
  status: VerifyEmailStatus
}

const getBgColor = (status: VerifyEmailStatus) => {
  switch (status) {
    case 'success':
      return 'bg-success'
    case 'error':
      return 'bg-destructive'
    default:
      return 'bg-secondary'
  }
}

function Icon({ status }: { status: VerifyEmailStatus }) {
  switch (status) {
    case 'success':
      return <Check />
    case 'error':
      return <X />
    default:
      return <Loader className="animate-spin" />
  }
}

export default function IconWrapper({ status }: Props) {
  const bgColor = getBgColor(status)

  return (
    <div
      className={cn(
        'relative flex h-24 w-24 items-center justify-center',
        status !== 'loading' && 'animate-pulse',
      )}
    >
      <div className={cn('absolute h-full w-full rounded-full opacity-10', bgColor)} />
      <div className={cn('absolute size-4/5 rounded-full bg-success opacity-20', bgColor)} />
      <div
        className={cn('absolute flex size-3/5 items-center justify-center rounded-full', bgColor)}
      >
        <Icon status={status} />
      </div>
    </div>
  )
}

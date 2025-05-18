import { Status } from '@prisma/client'
import { Check, CircleAlert, Loader } from 'lucide-react'
import { Badge } from './ui/badge'

interface Props {
  status: Status
}

export default function StatusBadge({ status }: Props) {
  const getVariant = () => {
    switch (status) {
      case 'Aberto':
        return 'secondary'
      case 'Andamento':
        return 'warning'
      default:
        return 'success'
    }
  }

  const getIcon = () => {
    switch (status) {
      case 'Aberto':
        return <CircleAlert size={14} />
      case 'Andamento':
        return <Loader size={14} />
      default:
        return <Check size={14} />
    }
  }

  return (
    <Badge variant={getVariant()}>
      {getIcon()}
      {status}
    </Badge>
  )
}

import { Status } from '@prisma/client'
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

  return <Badge variant={getVariant()}>{status}</Badge>
}

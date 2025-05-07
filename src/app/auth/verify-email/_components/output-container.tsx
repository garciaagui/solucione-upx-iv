import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { VerifyEmailStatus } from '../_utils'

interface Props {
  message: string
  status: VerifyEmailStatus
}

export default function OutputContainer({ message, status }: Props) {
  const router = useRouter()
  const title = status === 'success' ? 'Sucesso' : status === 'error' ? 'Erro' : 'Carregando'

  const navigateLogin = () => router.push('/auth/login')

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="font-medium text-muted-foreground">{message}</p>

      {status === 'success' ? (
        <Button className="mt-8" onClick={navigateLogin}>
          Realizar login
        </Button>
      ) : null}
    </div>
  )
}

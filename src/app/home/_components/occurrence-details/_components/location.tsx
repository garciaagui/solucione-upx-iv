import { LocateFixed, MapPin } from 'lucide-react'

interface Props {
  neighborhood: string
  reference: string | null
  street: string
  zipCode: string
}

export default function Location({ neighborhood, reference, street, zipCode }: Props) {
  return (
    <div>
      <h3 className="text-base font-medium">Localização</h3>

      <div className="mt-1 grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{neighborhood}</span>
        </div>

        <div className="flex items-center gap-2">
          <LocateFixed className="h-4 w-4" />
          <span>{street}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">CEP:</span>
          <span>{zipCode}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Referência:</span>
          <span>{reference || 'Sem referência'}</span>
        </div>
      </div>
    </div>
  )
}

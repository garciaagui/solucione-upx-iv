import ImageFallback from '@/components/image-fallback'
import { Skeleton } from '@/components/ui/skeleton'
import { OccurrenceWithRelations } from '@/types/globals'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  data: OccurrenceWithRelations
}

interface ImageContainerProps {
  title: string
  url: string
}

function ImageContainer({ title, url }: ImageContainerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)
  }

  const handleImageError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  if (!url) return null

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg">
      {!isLoaded && <Skeleton className="h-full w-full object-cover" />}

      {!hasError ? (
        <Image
          src={url}
          alt={`Imagem da ocorrência: ${title}`}
          fill
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="object-cover"
        />
      ) : (
        <ImageFallback />
      )}
    </div>
  )
}

export default function DetailsTab({ data }: Props) {
  const { description, image, neighborhood, reference, street, title, zipCode } = data

  const locationArray = [
    { label: 'Rua', value: street },
    { label: 'Bairro', value: neighborhood },
    { label: 'CEP', value: zipCode },
    { label: 'Referência', value: reference || 'Sem referência' },
  ]

  return (
    <div className="space-y-8">
      <ImageContainer title={title} url={image} />

      <div>
        <h2 className="text-xl font-extrabold tracking-tight">Descrição</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-1 text-muted-foreground">
        <h2 className="text-xl font-extrabold tracking-tight text-primary">Localização</h2>

        {locationArray.map(({ label, value }) => {
          return (
            <div key={label} className="flex items-center gap-2">
              <span className="font-extrabold">{label}:</span>
              <span>{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

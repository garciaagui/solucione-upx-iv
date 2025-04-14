import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  url: string
}

export default function ImageContainer({ url }: Props) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="overflow-hidden rounded-md">
      {!isLoaded && <Skeleton className="h-[200px] w-full rounded-lg md:h-[400px]" />}

      {url && (
        <Image
          src={url}
          alt="Imagem da ocorrência"
          width={800}
          height={400}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`h-auto max-h-[400px] w-full rounded-lg object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'absolute opacity-0'
          }`}
        />
      )}
    </div>
  )
}

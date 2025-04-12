import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  url: string
}

export default function ImageContainer({ url }: Props) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="overflow-hidden rounded-md">
      {isLoading && <Skeleton className="h-[200px] w-full rounded-lg md:h-[400px]" />}

      <Image
        src={url}
        alt="Imagem da ocorrência"
        width={800}
        height={400}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        className={`h-auto max-h-[400px] w-full rounded-lg object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}

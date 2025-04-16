import { Skeleton } from '@/components/ui/skeleton'
import { CameraOff, User2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ImageContainerProps {
  title: string
  url: string
  username: string
}

function ImageFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 bg-zinc-800 text-white">
      <CameraOff size={14} />
      <span className="text-sm">Erro ao carregar imagem</span>
    </div>
  )
}

export default function ImageContainer({ title, url, username }: ImageContainerProps) {
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
    <div className="relative h-64 w-full overflow-hidden">
      {!isLoaded && <Skeleton className="h-full w-full object-cover" />}

      <div className="group relative h-full w-full transition-transform duration-300 hover:scale-105">
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {isLoaded && (
        <div className="absolute bottom-3 left-4 z-10 text-white">
          <h3 className="text-lg font-semibold drop-shadow">{title}</h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-white/90">
            <User2 size={16} />
            <span className="drop-shadow">{username}</span>
          </div>
        </div>
      )}
    </div>
  )
}

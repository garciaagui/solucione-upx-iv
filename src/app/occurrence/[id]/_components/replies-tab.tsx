'use client'

import ImageFallback from '@/components/image-fallback'
import StatusBadge from '@/components/status-badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { OccurrenceWithRelations } from '@/types/globals'
import { formatDate } from '@/utils/functions/date'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  data: OccurrenceWithRelations['occurrenceReplies']
}

interface ImageContainerProps {
  url: string | null
}

function ImageContainer({ url }: ImageContainerProps) {
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
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="rounded-lg px-2 hover:bg-primary-foreground hover:no-underline">
          Visualizar imagem
        </AccordionTrigger>
        <AccordionContent>
          <div className="relative mt-2 h-96 w-full overflow-hidden rounded-lg">
            {!isLoaded && <Skeleton className="h-full w-full object-cover" />}

            {!hasError ? (
              <Image
                src={url}
                alt={`Atualização da ocorrência`}
                fill
                onLoad={handleImageLoad}
                onError={handleImageError}
                className="object-cover"
              />
            ) : (
              <ImageFallback />
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default function RepliesTab({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        Nenhuma atualização registrada até o momento.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {data.map((reply) => {
        const { createdAt, description, imageUrl, occurrenceStatus, user } = reply

        return (
          <Card key={reply.id} className="bg-muted/30">
            <CardContent className="space-y-4 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary">Responsável: {user.name}</Badge>

                <div className="flex items-center gap-2">
                  <StatusBadge status={occurrenceStatus} />
                  <Badge variant="secondary">{formatDate(createdAt)}</Badge>
                </div>
              </div>

              <div className="flex flex-col items-start gap-0.5">
                <span className="font-bold">Descrição</span>
                <p className="text-muted-foreground">{description}</p>
              </div>

              <ImageContainer url={imageUrl} />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

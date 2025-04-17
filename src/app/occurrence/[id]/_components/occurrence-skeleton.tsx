import { Skeleton } from '@/components/ui/skeleton'

export default function OccurrenceSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-8 pb-6 pt-4">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-6 rounded-sm" /> {/* Ícone de voltar */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" /> {/* Título */}
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-5 w-24 rounded-full" /> {/* User */}
            <Skeleton className="h-5 w-16 rounded-full" /> {/* Status */}
            <Skeleton className="h-5 w-20 rounded-full" /> {/* Data */}
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mx-auto w-full">
        <div className="mx-auto mb-4 grid w-1/2 grid-cols-2 gap-2">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>

        {/* DetailsTab Skeleton */}
        <div className="space-y-8">
          {/* Imagem */}
          <Skeleton className="h-96 w-full rounded-lg" />

          {/* Descrição */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Localização */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  )
}

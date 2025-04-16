import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonCard() {
  return (
    <Card className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-muted bg-background shadow-md">
      {/* Imagem */}
      <div className="relative h-64 w-full">
        <Skeleton className="h-full w-full object-cover" />
      </div>

      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>

      {/* Content */}
      <CardContent className="flex items-center gap-2 px-4 pb-4">
        <Skeleton className="h-4 w-6" />
        <Skeleton className="h-4 w-48" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between border-t px-4 py-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4" />
      </CardFooter>
    </Card>
  )
}

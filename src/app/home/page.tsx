'use client'

import { useAuth } from '@/contexts/auth-context'
import { useOccurrences } from '@/hooks/use-occurrences'
import { OccurrenceCard, SkeletonCard } from './_components'

export default function Home() {
  const { data, isLoading: isLoadingData } = useOccurrences()
  const { isLoading: isLoadingAuth } = useAuth()

  const isLoading = isLoadingData || isLoadingAuth

  return (
    <div className="flex flex-col gap-12">
      {isLoading || !data
        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        : data.map((occurrence) => <OccurrenceCard key={occurrence.id} data={occurrence} />)}
    </div>
  )
}

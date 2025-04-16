'use client'

import { useOccurrences } from '@/hooks/use-occurrences'
import { useSession } from 'next-auth/react'
import { OccurrenceCard } from './_components'
import { SkeletonCard } from './_components/skeleton-card'

export default function Home() {
  const { data, isLoading: isLoadingData } = useOccurrences()
  const { status } = useSession()

  const isLoading = isLoadingData || status === 'loading'

  return (
    <div className="flex flex-col gap-12">
      {isLoading || !data
        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        : data.map((occurrence) => <OccurrenceCard key={occurrence.id} data={occurrence} />)}
    </div>
  )
}

'use client'

import { useOccurrences } from '@/hooks/use-occurrences'
import { OccurrenceCard } from './_components'

export default function Home() {
  const { data } = useOccurrences()

  return (
    <div className="flex flex-col gap-6">
      {data?.map((occurrence) => <OccurrenceCard key={occurrence.id} data={occurrence} />)}
    </div>
  )
}

'use client'

import { useOccurrences } from '@/hooks/use-occurrences'
import { OccurrencesGrid } from './_components'

export default function Home() {
  const { data } = useOccurrences()

  return (
    <div className="flex flex-col">
      <OccurrencesGrid data={data} />
    </div>
  )
}

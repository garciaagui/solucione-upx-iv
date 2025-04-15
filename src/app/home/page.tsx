'use client'

import { ActionsGrid, OccurrencesGrid } from './_components'
import { useOccurrences } from './_utils/useOccurrences'

export default function Home() {
  const { data } = useOccurrences()

  return (
    <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-[4fr_1fr]">
      <OccurrencesGrid data={data} />
      <ActionsGrid />
    </div>
  )
}

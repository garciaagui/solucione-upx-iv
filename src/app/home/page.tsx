'use client'

import { OccurrencesGrid } from './_components'
import { useOccurrences } from './_utils/useOccurrences'

export default function Home() {
  const { data } = useOccurrences()

  return (
    <div className="flex flex-col">
      <OccurrencesGrid data={data} />
    </div>
  )
}

'use client'

import { OccurrencesTable } from './_components'
import { useOccurrences } from './_utils/useOccurrences'

export default function Home() {
  const { data } = useOccurrences()

  return (
    <div>
      <h1>Home - Solucione</h1>
      <OccurrencesTable data={data} />
    </div>
  )
}

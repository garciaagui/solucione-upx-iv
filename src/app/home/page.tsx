'use client'

import { CreateOccurrence, OccurrencesTable } from './_components'
import { useOccurrences } from './_utils/useOccurrences'

export default function Home() {
  const { data } = useOccurrences()

  return (
    <div>
      <h1>Início</h1>
      <CreateOccurrence />
      <OccurrencesTable data={data} />
    </div>
  )
}

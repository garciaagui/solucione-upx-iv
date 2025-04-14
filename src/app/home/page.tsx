'use client'

import { DialogButton, OccurrencesTable } from './_components'
import { useOccurrences } from './_utils/useOccurrences'

export default function Home() {
  const { data } = useOccurrences()

  return (
    <div>
      <h1>Início</h1>
      <DialogButton />
      <OccurrencesTable data={data} />
    </div>
  )
}

'use client'

import { useOccurrenceById } from '@/hooks/use-occurrences'
import { useParams } from 'next/navigation'

export default function Occurrence() {
  const { id } = useParams()
  const { data } = useOccurrenceById(String(id))

  return <div>{data?.title}</div>
}

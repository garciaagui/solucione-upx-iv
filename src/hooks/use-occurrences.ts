import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { OccurrenceWithRelations } from '@/types/globals'

const fetchAll = async (): Promise<OccurrenceWithRelations[] | []> => {
  const res = await fetch('/api/occurrences')
  const { data } = await res.json()

  return data
}

const fetchById = async (id: string): Promise<OccurrenceWithRelations | undefined> => {
  const res = await fetch(`/api/occurrences/${id}`)
  const { data } = await res.json()

  return data
}

export const useOccurrences = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.OCCURRENCES],
    queryFn: fetchAll,
  })

  return { data, error, isLoading }
}

export const useOccurrenceById = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.OCCURRENCE_BY_ID, id],
    queryFn: () => fetchById(id),
    enabled: !!id,
  })

  return { data, error, isLoading }
}

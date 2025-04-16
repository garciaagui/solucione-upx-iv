import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { OccurrenceWithRelations } from '@/types/globals'

const fetchData = async (): Promise<OccurrenceWithRelations[] | undefined> => {
  const res = await fetch('/api/occurrences')
  const { data } = await res.json()

  return data
}

export const useOccurrences = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.OCCURRENCES],
    queryFn: fetchData,
  })

  return { data, error, isLoading }
}

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useOccurrenceById } from '@/hooks/use-occurrences'
import { useParams } from 'next/navigation'
import { DetailsTab, Header, OccurrenceSkeleton, RepliesTab } from './_components'

export default function Occurrence() {
  const { id } = useParams()
  const { data, isLoading } = useOccurrenceById(String(id))

  if (isLoading || !data) {
    return <OccurrenceSkeleton />
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-8 pb-6 pt-4">
      <Header data={data} />

      <Tabs defaultValue="details" className="mx-auto w-full">
        <TabsList className="mx-auto mb-4 grid w-full grid-cols-2 md:w-1/2">
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="updates">Atualizações</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <DetailsTab data={data} />
        </TabsContent>

        <TabsContent value="updates">
          <RepliesTab data={data.occurrenceReplies} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

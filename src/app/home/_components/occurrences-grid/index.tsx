import { Occurrence } from '@prisma/client'
import { useState } from 'react'
import { OccurrenceCard, OccurrenceDetails } from './_components'

interface Props {
  data: Occurrence[] | undefined
}

export default function OccurrencesGrid({ data }: Props) {
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null)

  const handleOpenDetails = (occurrence?: Occurrence) => {
    if (occurrence) {
      setSelectedOccurrence(occurrence)
      setOpenDetails(true)
    } else {
      setOpenDetails(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {data?.map((occurrence) => (
          <OccurrenceCard
            key={occurrence.id}
            data={occurrence}
            onClick={() => handleOpenDetails(occurrence)}
          />
        ))}
      </div>

      {selectedOccurrence && (
        <OccurrenceDetails
          data={selectedOccurrence}
          isOpen={openDetails}
          handleOpen={handleOpenDetails}
        />
      )}
    </>
  )
}

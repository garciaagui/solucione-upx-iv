import StatusBadge from '@/components/status-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/utils/functions/date'
import { Occurrence } from '@prisma/client'
import { useState } from 'react'
import OccurrenceDetails from './occurrence-details'

interface Props {
  data: Occurrence[] | undefined
}

export default function OccurrencesTable({ data }: Props) {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Identificação</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Bairro</TableHead>
            <TableHead>Logradouro</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data &&
            data.map((occurrence, index) => {
              const { createdAt, id, neighborhood, status, street, title } = occurrence
              const formattedDate = formatDate(createdAt)

              return (
                <TableRow
                  key={index}
                  onClick={() => handleOpenDetails(occurrence)}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell>{id}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>
                  <TableCell>{neighborhood}</TableCell>
                  <TableCell>{street}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>

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

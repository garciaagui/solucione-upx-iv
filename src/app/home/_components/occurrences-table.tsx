import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Occurrence } from '@prisma/client'
import { useState } from 'react'
import OccurrenceDetails from './occurrence-details'

interface Props {
  data: Occurrence[] | undefined
}

const formatDate = (input: Date): string => {
  const date = new Date(input)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
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
                    <Badge>{status}</Badge>
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

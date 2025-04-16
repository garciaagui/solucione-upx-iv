import { Prisma } from '@prisma/client'

export type OccurrenceWithRelations = Prisma.OccurrenceGetPayload<{
  include: {
    user: true
    occurrenceReplies: true
  }
}>

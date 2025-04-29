import { Prisma } from '@prisma/client'

export type OccurrenceWithRelations = Prisma.OccurrenceGetPayload<{
  include: {
    user: { omit: { password: true } }
    occurrenceReplies: { include: { user: { omit: { password: true } } } }
  }
}>

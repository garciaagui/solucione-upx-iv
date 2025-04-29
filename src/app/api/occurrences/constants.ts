export const DEFAULT_OCCURRENCE_INCLUDE = {
  user: { omit: { password: true } },
  occurrenceReplies: { include: { user: { omit: { password: true } } } },
}

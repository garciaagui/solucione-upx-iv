import { UpdateOccurrenceFormValues } from '@/schemas/occurrence'

export const generateFormData = (
  adminId: number,
  formValues: UpdateOccurrenceFormValues,
  occurrenceValues: { occurrenceId: number; occurrenceStatus: string },
): FormData => {
  const { description, image } = formValues
  const { occurrenceId, occurrenceStatus } = occurrenceValues

  const formData = new FormData()

  formData.set('userId', String(adminId))
  formData.set('description', description)
  formData.set('image', image)
  formData.set('occurrenceId', String(occurrenceId))
  formData.set('occurrenceStatus', occurrenceStatus)

  return formData
}

export const requestReplyCreation = async (data: FormData) => {
  const response = await fetch('/api/replies', {
    method: 'POST',
    body: data,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao atualizar ocorrência')
  }

  return response.json()
}

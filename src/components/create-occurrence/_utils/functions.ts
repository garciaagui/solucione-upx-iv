import { OcurrenceFormValues } from '@/schemas/occurrence'

export const zipCodeMask = (value: string): string => {
  if (!value) return ''

  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1-$2')

  return value
}

export const generateFormData = (data: OcurrenceFormValues, userId: number): FormData => {
  const { firstStep, secondStep, thirdStep } = data
  const formData = new FormData()

  formData.set('title', firstStep.title)
  formData.set('description', firstStep.description)
  formData.set('street', secondStep.street)
  formData.set('neighborhood', secondStep.neighborhood)
  formData.set('zipCode', secondStep.zipCode)
  formData.set('image', thirdStep.image)

  formData.set('userId', String(userId))

  if (secondStep.reference) {
    formData.set('reference', secondStep.reference)
  }

  return formData
}

export const requestOccurrenceCreation = async (data: FormData) => {
  const response = await fetch('/api/occurrences', {
    method: 'POST',
    body: data,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar ocorrência')
  }

  return response.json()
}

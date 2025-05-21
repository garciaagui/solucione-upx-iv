import { gemini, initialPrompt } from '@/lib/gemini'
import { BadRequestException } from '@/utils/exceptions'
import { Occurrence } from '@prisma/client'
import { NextRequest } from 'next/server'
import { convertFileToBuffer } from '../../_utils/functions'

type PartialOccurrence = Omit<Occurrence, 'id' | 'status' | 'image' | 'createdAt' | 'updatedAt'>

export const parseFormData = async (
  req: NextRequest,
): Promise<{
  fields: PartialOccurrence
  image: { buffer: Buffer; name: string }
}> => {
  const formData = await req.formData()
  const entries = Array.from(formData.entries())

  const rawFields: Record<string, string> = {}

  entries.forEach(([key, value]) => {
    if (value instanceof File) return
    rawFields[key] = value.toString()
  })

  const fields = {
    title: rawFields.title,
    description: rawFields.description,
    neighborhood: rawFields.neighborhood,
    street: rawFields.street,
    zipCode: rawFields.zipCode,
    reference: rawFields.reference ?? null,
    userId: Number(rawFields.userId),
  }

  const file = formData.get('image') as File
  const buffer = await convertFileToBuffer(file)

  return {
    fields,
    image: { buffer, name: file.name },
  }
}

export const checkProfanity = async (fields: PartialOccurrence, imageBuffer: Buffer) => {
  const base64Image = imageBuffer.toString('base64')

  const content = [
    { text: initialPrompt },
    {
      text: `
      Campos a serem avaliados:
        - "Título": "${fields.title}",
        - "Descrição": "${fields.description}",
        - "Bairro": "${fields.neighborhood}",
        - "Rua": "${fields.street}",
        - "Referência": "${fields.reference}"`.trim(),
    },
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    },
  ]

  const { response } = await gemini.generateContent({
    contents: [
      {
        role: 'user',
        parts: content,
      },
    ],
  })

  const result = response.text().toLowerCase().trim()

  if (result.includes('true')) {
    throw new BadRequestException(
      'Um ou mais campos contêm conteúdo impróprio ou ofensivo. Por favor, revise.',
    )
  }
}

import { gemini, initialPrompt } from '@/lib/gemini'
import { BadRequestException } from '@/utils/exceptions'
import { OccurrenceReply, Status } from '@prisma/client'
import { NextRequest } from 'next/server'
import { convertFileToBuffer } from '../../_utils/functions'

interface ParseFormDataResponse {
  fields: Pick<OccurrenceReply, 'description' | 'occurrenceId' | 'userId'>
  occurrenceStatus: string
  image?: { buffer: Buffer; name: string }
}

export const parseFormData = async (req: NextRequest): Promise<ParseFormDataResponse> => {
  const formData = await req.formData()
  const entries = Array.from(formData.entries())

  const rawFields: Record<string, string> = {}

  entries.forEach(([key, value]) => {
    if (value instanceof File) return
    rawFields[key] = value.toString()
  })

  const fields = {
    description: rawFields.description,
    occurrenceId: Number(rawFields.occurrenceId),
    userId: Number(rawFields.userId),
  }

  const occurrenceStatus = rawFields.occurrenceStatus as Status

  const file = formData.get('image') as File | undefined

  if (!file || file.size === 0) {
    return { fields, occurrenceStatus }
  }

  const buffer = await convertFileToBuffer(file)

  return {
    fields,
    occurrenceStatus,
    image: { buffer, name: file.name },
  }
}

export const checkProfanity = async (description: string, imageBuffer: Buffer) => {
  const base64Image = imageBuffer.toString('base64')

  const content = [
    { text: initialPrompt },
    {
      text: `
      Campo a ser avaliado:
        - "Descrição": "${description}"`.trim(),
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

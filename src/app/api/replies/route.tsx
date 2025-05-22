import prisma from '@/lib/prisma'
import { Status } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import {
  generateImageUrl,
  generateUniqueImageName,
  handleError,
  uploadImage,
} from '../_utils/functions'
import { checkProfanity, parseFormData } from './_utils/functions'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { fields, image, occurrenceStatus } = await parseFormData(req)

    let imageUrl: string | undefined

    if (image) {
      const { buffer, name } = image
      const imageUniqueName = generateUniqueImageName(name)
      imageUrl = generateImageUrl(imageUniqueName)

      await checkProfanity(fields.description, buffer)
      await uploadImage(buffer, imageUniqueName)
    }

    const newStatus = occurrenceStatus === Status.Aberto ? Status.Andamento : Status.Finalizado

    await prisma.occurrence.update({
      where: { id: fields.occurrenceId },
      data: { status: newStatus },
    })

    const created = await prisma.occurrenceReply.create({
      data: {
        ...fields,
        occurrenceStatus: newStatus,
        imageUrl, // optional
      },
    })

    return NextResponse.json(
      {
        message: 'Atualização criada!',
        data: created,
      },
      { status: 201 },
    )
  } catch (error: unknown) {
    return handleError(error)
  }
}

import prisma from '@/lib/prisma'
import { OccurrenceWithRelations } from '@/types/globals'
import { HttpException, NotFoundException } from '@/utils/exceptions'
import { Status } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { generateImageUrl, generateUniqueImageName, parseFormData, uploadImage } from './functions'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<NextResponse> {
  try {
    const occurrences: OccurrenceWithRelations[] = await prisma.occurrence.findMany({
      orderBy: { id: 'desc' },
      include: { user: true, occurrenceReplies: true },
    })

    if (!occurrences) {
      throw new NotFoundException('Ocorrências não encontradas')
    }

    return NextResponse.json(
      {
        message: 'Ocorrências encontradas',
        data: occurrences,
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    const message =
      error instanceof HttpException ? error.message : 'Erro inesperado ao buscar ocorrências'
    const status = error instanceof HttpException ? error.status : 500

    console.error(message, error)

    return NextResponse.json({ message }, { status })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { fields, image } = await parseFormData(req)
    const { buffer, name } = image
    const imageUniqueName = generateUniqueImageName(name)
    const imageUrl = generateImageUrl(imageUniqueName)

    await uploadImage(buffer, imageUniqueName)

    const creationData = {
      ...fields,
      image: imageUrl,
      status: Status.Aberto,
    }

    const created = await prisma.occurrence.create({
      data: creationData,
    })

    return NextResponse.json(
      {
        message: 'Ocorrência criada!',
        data: created,
      },
      { status: 201 },
    )
  } catch (error: unknown) {
    const message = error instanceof HttpException ? error.message : 'Erro inesperado'
    const status = error instanceof HttpException ? error.status : 500

    console.error(message, error)

    return NextResponse.json({ message }, { status })
  }
}

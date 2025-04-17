import prisma from '@/lib/prisma'
import { OccurrenceWithRelations } from '@/types/globals'
import { NotFoundException } from '@/utils/exceptions'
import { NextRequest, NextResponse } from 'next/server'
import { handleError } from '../functions'

export const dynamic = 'force-dynamic'

type ParamsType = {
  params: {
    id: string
  }
}

export async function GET(_req: NextRequest, { params }: ParamsType): Promise<NextResponse> {
  const { id } = params

  try {
    const occurrence: OccurrenceWithRelations | null = await prisma.occurrence.findUnique({
      where: { id: Number(id) },
      include: { user: true, occurrenceReplies: { include: { user: true } } },
    })

    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada')
    }

    return NextResponse.json(
      {
        message: 'Ocorrência encontrada',
        data: occurrence,
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    return handleError(error)
  }
}

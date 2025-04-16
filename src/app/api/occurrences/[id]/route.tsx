import prisma from '@/lib/prisma'
import { OccurrenceWithRelations } from '@/types/globals'
import { HttpException, NotFoundException } from '@/utils/exceptions'
import { NextRequest, NextResponse } from 'next/server'

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
      include: { user: true, occurrenceReplies: true },
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
    const message =
      error instanceof HttpException ? error.message : 'Erro inesperado ao buscar ocorrência'
    const status = error instanceof HttpException ? error.status : 500

    console.error(message, error)

    return NextResponse.json({ message }, { status })
  }
}

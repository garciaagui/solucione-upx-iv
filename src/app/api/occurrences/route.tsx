import prisma from '@/lib/prisma'
import { HttpException, NotFoundException } from '@/utils/exceptions'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<NextResponse> {
  try {
    const occurrences = await prisma.occurrence.findMany({
      orderBy: { id: 'desc' },
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
    if (error instanceof HttpException) {
      const { message, status } = error
      console.error(message, status)

      return NextResponse.json({ message }, { status })
    } else {
      const message = 'Erro inesperado ao buscar ocorrências'
      console.error(message, error)

      return NextResponse.json({ message }, { status: 500 })
    }
  }
}

import awsS3 from '@/lib/awsS3'
import prisma from '@/lib/prisma'
import { HttpException, NotFoundException } from '@/utils/exceptions'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { NextRequest, NextResponse } from 'next/server'

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

const uploadImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const params: PutObjectRequest = {
    Bucket: 'upx',
    Key: 'TESTE1',
    Body: arrayBuffer,
    ContentType: file.type,
  }

  await awsS3.upload(params).promise()
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.formData()
    const image = body.get('image') as File

    await uploadImage(image)

    return NextResponse.json(
      {
        message: 'Ocorrência criada!',
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

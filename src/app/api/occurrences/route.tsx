import awsS3 from '@/lib/awsS3'
import prisma from '@/lib/prisma'
import { HttpException, NotFoundException } from '@/utils/exceptions'
import { Status } from '@prisma/client'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { randomBytes } from 'crypto'
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

const uploadImage = async (file: Buffer, name: string) => {
  const params: PutObjectRequest = {
    Bucket: 'upx',
    Key: name,
    Body: file,
    ContentType: 'image/jpeg',
  }

  await awsS3.upload(params).promise()
}

const convertFileToBuffer = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return buffer
}

const getFileExtension = (originalName: string) => {
  const parts = originalName.split('.')
  return parts[parts.length - 1]
}

const generateUniqueFileName = (originalName: string) => {
  const fileExtension = getFileExtension(originalName)

  const bytes = randomBytes(16)
  const fileName = bytes.toString('hex') + Date.now() + '.' + fileExtension
  return fileName
}

const parseFormData = async (req: NextRequest) => {
  const formData = await req.formData()
  const entries = Array.from(formData.entries())

  const fields: Record<string, string> = {}

  entries.forEach(([key, value]) => {
    if (value instanceof File) return

    fields[key] = value.toString()
  })

  const file = formData.get('image') as File
  const buffer = await convertFileToBuffer(file)

  return {
    fields,
    image: { buffer, name: file.name },
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { fields, image } = await parseFormData(req)
    const { buffer, name } = image
    const imageUniqueName = generateUniqueFileName(name)
    const imageUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_ENDPOINT + '/' + imageUniqueName

    await uploadImage(buffer, imageUniqueName)

    const creationData = {
      title: fields.title,
      description: fields.description,
      street: fields.street,
      neighborhood: fields.neighborhood,
      zipCode: fields.zipCode,
      reference: fields.reference || null,
      image: imageUrl,
      status: Status.Aberto,
      userId: Number(fields.userId),
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

import awsS3 from '@/lib/awsS3'
import { Occurrence } from '@prisma/client'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { randomBytes } from 'crypto'
import { NextRequest } from 'next/server'

type PartialOccurrence = Omit<Occurrence, 'id' | 'status' | 'image' | 'createdAt' | 'updatedAt'>

const convertFileToBuffer = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return buffer
}

const getFileExtension = (originalName: string) => {
  const parts = originalName.split('.')

  return parts[parts.length - 1]
}

export const generateUniqueImageName = (originalName: string) => {
  const fileExtension = getFileExtension(originalName)
  const bytes = randomBytes(16)
  const fileName = bytes.toString('hex') + Date.now() + '.' + fileExtension

  return fileName
}

export const generateImageUrl = (uniqueName: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_ENDPOINT

  return baseUrl + '/' + uniqueName
}

export const uploadImage = async (file: Buffer, name: string) => {
  const params: PutObjectRequest = {
    Bucket: 'upx',
    Key: name,
    Body: file,
    ContentType: 'image/jpeg',
  }

  await awsS3.upload(params).promise()
}

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

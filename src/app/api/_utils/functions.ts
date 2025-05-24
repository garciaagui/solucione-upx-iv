import awsS3 from '@/lib/awsS3'
import { HttpException } from '@/utils/exceptions'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { randomBytes } from 'crypto'
import { NextResponse } from 'next/server'

const getFileExtension = (originalName: string) => {
  const parts = originalName.split('.')

  return parts[parts.length - 1]
}

export const convertFileToBuffer = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return buffer
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

export const handleError = (error: unknown): NextResponse => {
  const message = error instanceof HttpException ? error.message : 'Erro inesperado'
  const status = error instanceof HttpException ? error.status : 500

  console.error(message, error)

  return NextResponse.json({ message }, { status })
}

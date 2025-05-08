import { HttpException } from '@/utils/exceptions'
import { NextResponse } from 'next/server'

export const handleError = (error: unknown): NextResponse => {
  const message = error instanceof HttpException ? error.message : 'Erro inesperado'
  const status = error instanceof HttpException ? error.status : 500

  console.error(message, error)

  return NextResponse.json({ message }, { status })
}

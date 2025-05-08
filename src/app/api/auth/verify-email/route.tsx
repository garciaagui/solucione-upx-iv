import prisma from '@/lib/prisma'
import { HttpException, UnauthorizedException } from '@/utils/exceptions'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail } from '../_utils/functions'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')

    if (!token) {
      throw new UnauthorizedException('Token não fornecido')
    }

    let decoded: JwtPayload
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    } catch (error) {
      const err = error as JsonWebTokenError

      if (err.name === 'TokenExpiredError') throw new UnauthorizedException('Token expirado')

      throw new UnauthorizedException('Token inválido')
    }

    const { email } = decoded

    const user = await findUserByEmail(email)

    if (user.emailVerified) {
      return NextResponse.json({ message: 'E-mail já verificado.' }, { status: 200 })
    }

    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
        verifyToken: null,
      },
    })

    return NextResponse.json({ message: 'E-mail verificado com sucesso.' }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof HttpException ? error.message : 'Erro inesperado'
    const status = error instanceof HttpException ? error.status : 500

    console.error(message, error)

    return NextResponse.json({ message }, { status })
  }
}

import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { handleError } from '../../_utils/functions'
import { decodeAndVerifyToken, findUserByEmail } from '../_utils/functions'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    const email = decodeAndVerifyToken(token)
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
    return handleError(error)
  }
}

import { UnauthorizedException } from '@/utils/exceptions'
import { compareSync } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { handleError } from '../../_utils/functions'
import { findUserByEmail } from '../_utils/functions'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = await findUserByEmail(email)
    const isValidPassword = compareSync(password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedException('Senha incorreta')
    }

    return NextResponse.json(
      {
        message: 'Login realizado com sucesso!',
        data: { user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    return handleError(error)
  }
}

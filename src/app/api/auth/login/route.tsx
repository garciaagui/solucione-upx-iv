import prisma from '@/lib/prisma'
import { HttpException, NotFoundException, UnauthorizedException } from '@/utils/exceptions'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Senha inválida')
    }

    return NextResponse.json(
      {
        message: 'Login realizado com sucesso!',
        data: { user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    if (error instanceof HttpException) {
      const { message, status } = error
      console.error(message, status)

      return NextResponse.json({ message }, { status })
    } else {
      const message = 'Erro inesperado ao realizar login'
      console.error(message, error)

      return NextResponse.json({ message }, { status: 500 })
    }
  }
}

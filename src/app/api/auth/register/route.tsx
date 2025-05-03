import prisma from '@/lib/prisma'
import { ConflictException, HttpException } from '@/utils/exceptions'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new ConflictException('Já existe um usuário com este e-mail')
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: 'user',
      },
    })

    return NextResponse.json(
      {
        message: 'Usuário cadastrado com sucesso!',
        data: {
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
        },
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

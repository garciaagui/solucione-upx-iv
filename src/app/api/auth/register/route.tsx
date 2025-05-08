import prisma from '@/lib/prisma'
import { ConflictException, HttpException } from '@/utils/exceptions'
import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail } from '../_utils/functions'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser && existingUser.emailVerified) {
      throw new ConflictException('Já existe um usuário com este e-mail')
    }

    let newUser
    const hashedPassword = await hash(password, 10)
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '10m' })

    if (existingUser && !existingUser.emailVerified) {
      newUser = await prisma.user.update({
        where: { email },
        data: {
          name,
          password: hashedPassword,
          role: 'user',
          verifyToken: token,
        },
      })
    } else {
      newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'user',
          verifyToken: token,
        },
      })
    }

    await sendVerificationEmail(name, email, token)

    return NextResponse.json(
      {
        message: 'Usuário cadastrado. Verifique seu e-mail.',
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

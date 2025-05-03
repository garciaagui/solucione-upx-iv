import prisma from '@/lib/prisma'
import resend from '@/lib/resend'
import { ConflictException, HttpException } from '@/utils/exceptions'
import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

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

    const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/verify?token=${token}`

    await resend.emails.send({
      from: 'Solucione <onboarding@resend.dev>',
      to: email,
      subject: 'Verifique seu e-mail',
      html: `
        <p>Olá, ${name},</p>
        <p>Por favor, clique no botão abaixo para confirmar seu e-mail e validar seu cadastro:</p>
        <a href="${verificationUrl}" style="background-color:#4F46E5;padding:12px 20px;color:white;border-radius:6px;text-decoration:none">Confirmar e-mail</a>
        <br />
        <br />
        <p>Atenciosamente, </p>
        <p style="font-weight:900">Solucione</p>
        `,
    })

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

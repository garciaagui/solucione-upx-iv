import prisma from '@/lib/prisma'
import resend from '@/lib/resend'
import { NotFoundException, UnauthorizedException } from '@/utils/exceptions'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new NotFoundException('Usuário não encontrado')
  }

  return user
}

export const sendVerificationEmail = async (username: string, email: string, token: string) => {
  const URL = `${process.env.NEXT_PUBLIC_URL}/auth/verify-email?token=${token}`
  const EMAIL_FROM = `Solucione <${process.env.RESEND_EMAIL}>`

  await resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: 'Verifique seu e-mail',
    html: `
        <p>Olá, ${username},</p>
        <p>Por favor, clique no botão abaixo para confirmar seu e-mail e validar seu cadastro:</p>
        <a href="${URL}" style="background-color:#4F46E5;padding:12px 20px;color:white;border-radius:6px;text-decoration:none">Confirmar e-mail</a>
        <br />
        <br />
        <p>Atenciosamente, </p>
        <p style="font-weight:900">Solucione</p>
        `,
  })
}

export const decodeAndVerifyToken = (token: string | null) => {
  if (!token) {
    throw new UnauthorizedException('Token não fornecido')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const { email } = decoded

    return email
  } catch (error) {
    const err = error as JsonWebTokenError

    if (err.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token expirado')
    }

    throw new UnauthorizedException('Token inválido')
  }
}

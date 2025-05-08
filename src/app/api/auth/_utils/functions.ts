import prisma from '@/lib/prisma'
import { NotFoundException } from '@/utils/exceptions'

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new NotFoundException('Usuário não encontrado')
  }

  return user
}

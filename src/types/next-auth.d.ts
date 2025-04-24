import { Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  type UserSession = {
    id: string
    name: string
    email: string
    role: Role
  }

  type Session = {
    token: {
      user: UserSession
      exp: int
      iat: int
      jti: string
    }
    expires: string
  }
}

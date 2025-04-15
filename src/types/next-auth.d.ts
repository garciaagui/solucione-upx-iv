import 'next-auth'

declare module 'next-auth' {
  type UserSession = {
    id: string
    name: string
    email: string
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

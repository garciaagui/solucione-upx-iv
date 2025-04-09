import 'next-auth'

declare module 'next-auth' {
  type Session = {
    token: {
      user: {
        id: string
        name: string
        email: string
      }
      exp: int
      iat: int
      jti: string
    }
    expires: string
  }
}

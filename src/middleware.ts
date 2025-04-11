import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const BASE_URL = req.url
    const CURRENT_URL = req.nextUrl.pathname

    if (CURRENT_URL === '/') {
      return NextResponse.redirect(new URL('/home', BASE_URL))
    }
  },
  {
    pages: {
      signIn: '/auth/login',
    },

    callbacks: {
      async authorized(data) {
        const token = data.token

        if (token) return true
        else return false
      },
    },
  },
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

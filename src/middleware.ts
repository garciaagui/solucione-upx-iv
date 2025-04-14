import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const BASE_URL = req.url
  const CURRENT_URL = req.nextUrl.pathname

  if (CURRENT_URL === '/') {
    return NextResponse.redirect(new URL('/home', BASE_URL))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

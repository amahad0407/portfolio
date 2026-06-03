import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = '__portfolio_session'

// Protect all /admin routes except /admin/login
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check for session cookie presence (full HMAC verify happens in Node API routes)
  const cookie = request.cookies.get(COOKIE_NAME)
  if (!cookie) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

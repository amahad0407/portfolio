import { NextRequest, NextResponse } from 'next/server'
import { checkPassword, createSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    if (!checkPassword(password)) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
    }
    const response = NextResponse.json({ success: true })
    response.headers.set('Set-Cookie', createSessionCookie())
    return response
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

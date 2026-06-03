import crypto from 'crypto'

const SECRET = process.env.AUTH_SECRET ?? 'portfolio-local-secret'
const PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123'
const COOKIE_NAME = '__portfolio_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function sign(value: string): string {
  return crypto.createHmac('sha256', SECRET).update(value).digest('hex')
}

export function createSessionCookie(): string {
  const payload = `authenticated:${Date.now()}`
  const sig = sign(payload)
  const token = Buffer.from(`${payload}.${sig}`).toString('base64')
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE}`
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0`
}

export function verifySessionCookie(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  if (!match) return false
  try {
    const raw = Buffer.from(match[1], 'base64').toString('utf-8')
    const lastDot = raw.lastIndexOf('.')
    const payload = raw.slice(0, lastDot)
    const sig = raw.slice(lastDot + 1)
    return sig === sign(payload)
  } catch {
    return false
  }
}

export function checkPassword(input: string): boolean {
  return input === PASSWORD
}

export { COOKIE_NAME }

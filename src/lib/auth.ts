import { cookies } from "next/headers"
import { verify, sign } from "jsonwebtoken"
import prisma from "./db"
import { getJWTSecret, JWT_CONFIG } from "./jwt-config"

// JWT payload interface
interface JWTPayload {
  userId: string
  email: string
  role: string
  exp: number
  iat?: number
}

// GET CURRENT USER - JWT ONLY
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(JWT_CONFIG.COOKIE_NAME)?.value

    if (!token) {
      return null
    }

    // Verify JWT token
    const decoded = verify(token, getJWTSecret()) as JWTPayload

    // Check if token is expired (extra safety check)
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    // Get fresh user data from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        studentId: true,
        hostelBlock: true,
        roomNumber: true,
      }
    })

    return user

  } catch (error) {
    console.error('JWT Auth error:', error)
    return null
  }
}

// CREATE JWT TOKEN
export function createJWTToken(user: { id: string; email: string; role: string }): string {
  return sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + JWT_CONFIG.EXPIRES_IN
    },
    getJWTSecret()
  )
}

// SET JWT COOKIE
export async function setJWTCookie(token: string) {
  const cookieStore = await cookies()
  
  cookieStore.set(JWT_CONFIG.COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    sameSite: "lax",
    maxAge: JWT_CONFIG.EXPIRES_IN,
    path: "/",
  })

  // 🗑️ CLEAN UP OLD COOKIES
  cookieStore.delete("userId")
}

// CLEAR JWT COOKIE
export async function clearJWTCookie() {
  const cookieStore = await cookies()
  
  cookieStore.delete(JWT_CONFIG.COOKIE_NAME)
  
  // 🗑️ CLEAN UP OLD COOKIES
  cookieStore.delete("userId")
}

// VERIFY JWT TOKEN
export function verifyJWTToken(token: string): JWTPayload | null {
  try {
    const decoded = verify(token, getJWTSecret()) as JWTPayload
    
    // Check expiration
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    
    return decoded
  } catch {
    return null
  }
}

// GET USER ID FROM JWT (for API routes)
export async function getUserIdFromRequest(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(JWT_CONFIG.COOKIE_NAME)?.value

    if (!token) {
      return null
    }

    const decoded = verifyJWTToken(token)
    return decoded?.userId || null

  } catch {
    return null
  }
}

// GET USER ROLE FROM JWT
export async function getUserRoleFromRequest(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(JWT_CONFIG.COOKIE_NAME)?.value

    if (!token) {
      return null
    }

    const decoded = verifyJWTToken(token)
    return decoded?.role || null

  } catch {
    return null
  }
}
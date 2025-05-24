import { cookies } from "next/headers"
import { sign, verify } from "jsonwebtoken"
import { NextRequest } from "next/server"
import prisma from "./db"

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token") || cookieStore.get("userId")

    if (!token) {
      return null
    }

    let userId: string

    if (token.value.includes('.')) {
      const decoded = verify(token.value, process.env.JWT_SECRET!) as { userId: string }
      userId = decoded.userId
    } else {
      userId = token.value
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        hostelBlock: true,
        roomNumber: true,
        department: true,
        studentId: true
      }
    })

    return user
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

/**
 * Require authentication middleware
 */
export async function requireAuth(req: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return user
}

/**
 * Require specific role middleware
 */
export async function requireRole(req: NextRequest, roles: string[]) {
  const user = await requireAuth(req)

  if (user instanceof Response) {
    return user
  }

  if (!roles.includes(user.role)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return user
}

/**
 * Hash a password using Argon2
 */
export async function hashPassword(password: string): Promise<string> {
  const argon2 = require('argon2');
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2**16,
      timeCost: 3,
      parallelism: 1,
    });
  } catch (error) {
    console.error("Password hashing error:", error);
    throw new Error("Failed to hash password");
  }
}

/**
 * Verify a password against a hash using Argon2
 */
export async function verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
  const argon2 = require('argon2');
  try {
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

/**
 * Login a user and set cookies
 */
export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { 
        email,
        status: "ACTIVE",
      },
    });

    if (!user) {
      return null;
    }

    const passwordValid = await verifyPassword(user.passwordHash, password);
    if (!passwordValid) {
      return null;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Set the auth cookie after successful login
    await setAuthCookies(user.id);

    const { passwordHash, ...userData } = user;
    return userData;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

/**
 * Set authentication cookies - using JWT token approach
 */
export async function setAuthCookies(userId: string) {
  const cookieStore = await cookies();
  
  // Create a JWT token
  const token = sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  
  cookieStore.set(
    "auth-token", // Match what getCurrentUser() is looking for
    token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    }
  );
}

/**
 * Clear authentication cookies
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set(
    "auth-token",
    "",
    {
      path: "/",
      expires: new Date(0),
    }
  );
}

/**
 * Generate a JWT token
 */
export function generateToken(payload: any): string {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
}
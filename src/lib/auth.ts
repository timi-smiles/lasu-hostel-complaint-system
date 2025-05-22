
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { prisma } from "./prisma" // Use relative import since we're in the same directory
import * as argon2 from 'argon2'

// Define UserRole and UserStatus enums directly if imports are causing issues
export enum UserRole {
  STUDENT = "STUDENT",
  STAFF = "STAFF",
  ADMIN = "ADMIN"
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED"
}

/**
 * Get the current authenticated user from cookies
 */
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { 
        id: userId,
        status: "ACTIVE", // Use string literal instead of enum
      },
    })
    
    return user
  } catch (error) {
    console.error("Error fetching current user:", error)
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
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id, // Use argon2id variant (recommended)
      memoryCost: 2**16, // 64MB
      timeCost: 3, // Number of iterations
      parallelism: 1, // Degree of parallelism
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
    // Find the user
    const user = await prisma.user.findUnique({
      where: { 
        email,
        status: "ACTIVE", // Use string literal instead of enum
      },
    });

    if (!user) {
      return null;
    }

    // Verify password
    const passwordValid = await verifyPassword(user.passwordHash, password);
    if (!passwordValid) {
      return null;
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Return user without passwordHash
    const { passwordHash, ...userData } = user;
    return userData;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

/**
 * Set authentication cookies for the user
 */
import { cookies as nextCookies } from "next/headers";

/**
 * Set authentication cookies for the user
 * Note: This function should be used inside a Server Action or Route Handler where cookies().set is available.
 */
export async function setAuthCookies(userId: string) {
  const cookieStore = await nextCookies();
  cookieStore.set(
    "userId",
    userId,
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
 * Note: This function should be used inside a Server Action or Route Handler where cookies().set is available.
 */
export async function clearAuthCookies() {
  const cookieStore = await nextCookies();
  cookieStore.set(
    "userId",
    "",
    {
      path: "/",
      expires: new Date(0),
    }
  );
}

/**
 * Generate a JWT token (if you want to use JWT instead of cookies)
 */
export function generateToken(payload: any): string {
  // This is a placeholder - you would need to install jsonwebtoken
  // and implement this function if you want to use JWT
  throw new Error("JWT implementation not available");
}
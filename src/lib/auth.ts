import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { prisma } from "./prisma"
import type { UserRole } from "@prisma/client"
import { verify } from "argon2"

export async function getCurrentUser() {
  const cookieStore = cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  return user
}

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

export async function requireRole(req: NextRequest, roles: UserRole[]) {
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

export async function verifyPassword(hashedPassword: string, password: string) {
  return verify(hashedPassword, password)
}
